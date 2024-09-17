const mongoose = require('mongoose');

const healthRecordSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true,
  },
  temperature: {
    type: Number,
    required: true,
  },
  bloodPressure: {
    systolic: {
      type: Number,
      required: true,
    },
    diastolic: {
      type: Number,
      required: true,
    },
  },
  heartRate: {
    type: Number,
    required: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('HealthRecord', healthRecordSchema);