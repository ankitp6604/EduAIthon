import mongoose from 'mongoose';

const moduleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  path: {
    type: String,
    required: true
  }
});

const lessonSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  videoLink: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['banking', 'budgeting', 'investing', 'financing']
  },
  modules: [moduleSchema],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt timestamp before saving
lessonSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Lesson = mongoose.model('Lesson', lessonSchema);

export default Lesson; 