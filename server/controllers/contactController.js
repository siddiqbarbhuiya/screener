/**
 * @controller contactController
 * @description Handles contact form submissions
 */

import nodemailer from 'nodemailer';

// Configure your email service here
// This is a basic example - adjust based on your email setup
const transporter = nodemailer.createTransport({
  // Configure with your email service (Gmail, SendGrid, etc.)
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: process.env.EMAIL_PORT || 587,
  secure: process.env.EMAIL_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

/**
 * Submit contact form
 * @route POST /api/contact
 * @param {string} name - Visitor name
 * @param {string} email - Visitor email
 * @param {string} subject - Message subject
 * @param {string} message - Message content
 */
export async function submitContact(req, res) {
  try {
    const { name, email, subject, message } = req.body;

    // Validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required',
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email address',
      });
    }

    // If email service is configured, send email
    if (process.env.EMAIL_USER && process.env.EMAIL_PASSWORD) {
      try {
        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: process.env.CONTACT_EMAIL || process.env.EMAIL_USER,
          replyTo: email,
          subject: `New Contact Form: ${subject}`,
          html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Message:</strong></p>
            <p>${message.replace(/\n/g, '<br>')}</p>
          `,
        });
      } catch (emailError) {
        console.error('Error sending email:', emailError);
        // Continue even if email fails - user gets success response
      }
    }

    // Log the contact (or save to database if needed)
    console.log('Contact form submission:', { name, email, subject, timestamp: new Date() });

    res.json({
      success: true,
      message: 'Thank you for your message. We will get back to you soon!',
    });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred. Please try again later.',
    });
  }
}
