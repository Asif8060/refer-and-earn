const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());

app.use(bodyParser.json());

// API endpoint to save referral data
app.post("/api/referral", async (req, res) => {
  const { friend_name, friend_email, message } = req.body;

  // Check if the required fields are provided
  if (!friend_name || !friend_email) {
    return res.status(400).json({ message: "Friend's name and email are required" });
  }

  try {
    // Save referral to the database
    const referral = await prisma.referral.create({
      data: {
        friend_name,
        friend_email,
        message: message || "", // Save the message if provided, else save an empty string
      },
    });

    // Send email notification to the referred friend
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SENDER_EMAIL, // Set the sender email in environment variable
        pass: process.env.SENDER_PASSWORD, // Set the sender email password in environment variable
      },
    });

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: friend_email,
      subject: "You've been referred!",
      text: `
        Hello ${friend_name},

        You have been referred by someone to join our Refer & Earn program.

        ${message ? `Message: ${message}` : "No message provided."}

        Best regards,
        The Team
      `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error sending email:", error);
        return res.status(500).json({ message: "Error sending email" });
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    res.status(201).json({ message: "Referral submitted successfully", referral });
  } catch (error) {
    console.error("Error saving referral:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
