const { GoogleGenAI } = require('@google/genai');

let geminiClient = null;
function getGemini() {
  if (!geminiClient && process.env.GEMINI_API_KEY) {
    geminiClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }
  return geminiClient;
}

const GEMINI_MODELS = ['gemini-2.5-flash'];

// Parses raw Gemini/API error into { message, retryAfter }
// retryAfter is an ISO timestamp string if the API specified a retry delay
function parseError(e) {
  let raw = e.message || 'Unknown AI error';

  // Unwrap inner Google API error message if JSON-encoded
  try {
    const parsed = JSON.parse(raw);
    if (parsed?.error?.message) raw = parsed.error.message;
  } catch {}

  // Extract "Please retry in Xs" → compute absolute retry timestamp
  const retryMatch = raw.match(/[Pp]lease retry in ([\d.]+)s/);
  let retryAfter = null;
  let retrySeconds = null;
  if (retryMatch) {
    retrySeconds = Math.ceil(parseFloat(retryMatch[1]));
    retryAfter = new Date(Date.now() + retrySeconds * 1000).toISOString();
  }

  // Build clean human-readable message
  let message;
  if (raw.includes('RESOURCE_EXHAUSTED') || raw.includes('quota')) {
    message = retrySeconds
      ? `Gemini free tier limit reached. You can retry in ${retrySeconds} seconds.`
      : 'Gemini free tier limit reached. Check your quota at ai.google.dev/rate-limit.';
  } else if (raw.includes('UNAVAILABLE') || raw.includes('high demand') || raw.includes('overloaded')) {
    message = 'Gemini is experiencing high demand. Please try again in a moment.';
  } else if (raw.includes('API_KEY') || raw.includes('INVALID_ARGUMENT') || e.status === 400) {
    message = 'Invalid Gemini API key. Please check GEMINI_API_KEY in server/.env.';
  } else if (e.status === 403) {
    message = 'Gemini API access denied. Verify your API key has the correct permissions.';
  } else {
    message = raw;
  }

  return { message, retryAfter };
}

async function callGemini(prompt) {
  const ai = getGemini();
  if (!ai) return { text: null, error: 'GEMINI_API_KEY not set in server/.env', retryAfter: null };

  let lastParsed = null;

  for (const model of GEMINI_MODELS) {
    for (let attempt = 0; attempt < 2; attempt++) {
      try {
        const response = await ai.models.generateContent({
          model,
          contents: [{ role: 'user', parts: [{ text: prompt }] }],
          config: { response_mime_type: 'application/json' },
        });
        return { text: response.text || null, error: null, retryAfter: null };
      } catch (e) {
        lastParsed = parseError(e);
        const isOverloaded = e.status === 503 || e.message?.includes('UNAVAILABLE') || e.message?.includes('overloaded');
        if (isOverloaded && attempt < 1) {
          await new Promise((r) => setTimeout(r, 300));
          continue;
        }
        if (isOverloaded) break; // try next model
        // Quota / auth / other permanent error — stop immediately
        return { text: null, error: lastParsed.message, retryAfter: lastParsed.retryAfter };
      }
    }
  }

  return {
    text: null,
    error: lastParsed?.message || 'All Gemini models overloaded. Please try again shortly.',
    retryAfter: lastParsed?.retryAfter || null,
  };
}

async function callOllama(prompt) {
  const axios = require('axios');
  const base = process.env.OLLAMA_BASE_URL || 'http://localhost:11434';
  try {
    const { data } = await axios.post(
      `${base}/api/generate`,
      { model: 'llama3', prompt, stream: false },
      { timeout: 30000 }
    );
    return { text: data?.response || null, error: null, retryAfter: null };
  } catch (e) {
    const { message, retryAfter } = parseError(e);
    return { text: null, error: message, retryAfter };
  }
}

async function generateAIResponse(prompt) {
  const provider = process.env.AI_PROVIDER || 'gemini';
  const result = provider === 'ollama' ? await callOllama(prompt) : await callGemini(prompt);
  if (result.error) {
    const retryInfo = result.retryAfter
      ? ` [Retry at: ${new Date(result.retryAfter).toUTCString()}]`
      : '';
    console.error(`[AI] ${result.error}${retryInfo}`);
  }
  return result; // { text, error, retryAfter }
}

function safeParseJSON(text) {
  if (!text) return null;
  const match = text.match(/\{[\s\S]*\}|\[[\s\S]*\]/);
  if (!match) return null;
  try {
    return JSON.parse(match[0]);
  } catch {
    return null;
  }
}

function isAIConfigured() {
  const provider = process.env.AI_PROVIDER || 'gemini';
  if (provider === 'ollama') return true;
  if (provider === 'gemini') return !!process.env.GEMINI_API_KEY;
  return false;
}

module.exports = { generateAIResponse, safeParseJSON, isAIConfigured };
