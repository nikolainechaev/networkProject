const express = require("express");
const { FieldValue } = require("firebase-admin/firestore");
const app = express();
const port = 8383;
const { db } = require("./firebase.js");

app.use(express.json());

app.post("/createMentor", async (req, res) => {
  try {
    const { ID, firstName, hoursDedicated, lastName } = req.body;

    // Create a new document reference with an auto-generated ID
    const newMentorRef = db.collection("mentors").doc();

    // Set the data for the new mentor document
    await newMentorRef.set({
      ID,
      firstName,
      hoursDedicated,
      lastName,
    });

    // Send a success response
    res.status(200).json({
      message: "Mentor added successfully",
      mentorId: newMentorRef.id,
    });
  } catch (error) {
    // Handle errors
    console.error("Error adding mentor: ", error);
    res.status(500).json({ error: "Failed to add mentor" });
  }
});

app.post("/createMentee", async (req, res) => {
  try {
    const { ID, firstName, lastName, interests } = req.body;

    // Create a new document reference with an auto-generated ID
    const newMenteeRef = db.collection("mentee").doc();

    // Set the data for the new mentee document
    await newMenteeRef.set({
      ID,
      firstName,
      lastName,
      interests,
    });

    // Send a success response
    res.status(200).json({
      message: "Mentee added successfully",
      mentorId: newMenteeRef.id,
    });
  } catch (error) {
    // Handle errors
    console.error("Error adding mentee: ", error);
    res.status(500).json({ error: "Failed to add mentee" });
  }
});

app.post("/createTranslator", async (req, res) => {
  try {
    const { ID, firstName, lastName, hoursDedicated, language } = req.body;

    // Create a new document reference with an auto-generated ID
    const newTranslatorRef = db.collection("translator").doc();

    // Set the data for the new mentee document
    await newTranslatorRef.set({
      ID,
      firstName,
      lastName,
      language,
      hoursDedicated,
    });

    // Send a success response
    res.status(200).json({
      message: "Translator added successfully",
      mentorId: newTranslatorRef.id,
    });
  } catch (error) {
    // Handle errors
    console.error("Error adding mentee: ", error);
    res.status(500).json({ error: "Failed to add mentee" });
  }
});

app.listen(port, () => console.log(`Server has started on port: ${port}`));
