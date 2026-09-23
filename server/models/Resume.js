import mongoose from 'mongoose';

const resumeSchema = new mongoose.Schema(
  {
    filename: {
      type: String,
      required: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  }, { timestamps: true } );

export default mongoose.model('Resume', resumeSchema);