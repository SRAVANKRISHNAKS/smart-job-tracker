import express from 'express';
import multer from 'multer';

import Resume from '../models/Resume.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  }, filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });
router.post('/', authMiddleware, upload.single('resume'), async (req, res) => {
    try {
      const resume = new Resume({
        filename: req.file.filename,
        user: req.user.id
      });
      await resume.save();
      res.json({
        message: 'Resume uploaded',
        file: req.file.filename
      });
    }
    catch (err) {
      res.status(500).json({
        message: err.message
      });
    }
  }
);
router.get('/', authMiddleware, async (req, res) => {
    try {
      const resume = await Resume.findOne({ user: req.user.id });
      res.json(resume);
    }
    catch (err) {
      res.status(500).json({
        message: err.message
      });
    }
  }
);
export default router;