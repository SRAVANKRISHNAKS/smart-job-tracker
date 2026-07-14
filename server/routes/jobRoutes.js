import express from 'express';

import Job from '../models/Job.js';

import authMiddleware
from '../middleware/authMiddleware.js';


const router = express.Router();




router.get(
  '/',
  authMiddleware,

  async (req, res) => {

    try {

      const jobs =
        await Job.find({

          user: req.user.id

        });


      res.json(jobs);

    }

    catch (err) {

      res.status(500).json({

        message: err.message

      });

    }

  }
);





router.post(
  '/',
  authMiddleware,

  async (req, res) => {

    try {

      const {

        company,

        role,

        status

      } = req.body;


      const job = new Job({

        company,

        role,

        status,

        user: req.user.id

      });


      await job.save();


      res.status(201).json(job);

    }

    catch (err) {

      res.status(500).json({

        message: err.message

      });

    }

  }
);





router.put(
  '/:id',

  authMiddleware,

  async (req, res) => {

    try {

      const updatedJob =

        await Job.findOneAndUpdate(
  {
    _id: req.params.id,
    user: req.user.id
  },

  req.body,

  {
    new: true
  }
);

      res.json(updatedJob);

    }

    catch (err) {

      res.status(500).json({

        message: err.message

      });

    }

  }
);





router.delete(
  '/:id',

  authMiddleware,

  async (req, res) => {

    try {

      await Job.findByIdAndDelete(

        req.params.id

      );


      res.json({

        message:

        'Job deleted'

      });

    }

    catch (err) {

      res.status(500).json({

        message: err.message

      });

    }

  }
);


export default router;