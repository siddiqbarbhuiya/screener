const axios = require('axios');

const client = axios.create({
  baseURL: process.env.API_BASE_URL,
  timeout: 8000,
});

module.exports = client;
