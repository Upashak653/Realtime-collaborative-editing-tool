const express = require('express');
const multer = require('multer');
const Document = require('../models/Document'); 
const router = express.Router();
const fs = require('fs');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Directory where files will be saved
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });


router.post('/upload', async (req, res) => {
  const { title, content } = req.body;
  try {
    const existingDocument = await Document.findOne({ title });
     if (existingDocument) {
       return res.status(400).json({ message: 'Document with this title already exists' });
     }
      const newDocument = new Document({
      title,
      content,
      }); 
    await newDocument.save();
    res.status(200).json({
      message: 'Document uploaded successfully',
      document: newDocument,
    });
  } catch (error) {
    console.error('Error uploading document:', error);
    res.status(500).json({ error: 'Failed to upload document' });
  }
});

module.exports = router;
