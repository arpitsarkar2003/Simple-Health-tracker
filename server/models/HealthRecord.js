const mongoose = require('mongoose')

const healthRecordSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  temperature: {
    type: Number,
    required: true,
  },
  bloodPressure: {
    type: String,
    required: true,
  },
  heartRate: {
    type: Number,
    required: true,
  },
}, {
  timestamps: true,
})

module.exports = mongoose.model('HealthRecord', healthRecordSchema)