const HealthRecord = require('../models/HealthRecord')

exports.createHealthRecord = async (req, res) => {
  try {
    const healthRecord = new HealthRecord({
      ...req.body,
      user: req.user._id,
    })
    await healthRecord.save()
    res.status(201).json(healthRecord)
  } catch (error) {
    res.status(400).json({ message: 'Failed to create health record', error: error.message })
  }
}

exports.getHealthRecords = async (req, res) => {
  try {
    const healthRecords = await HealthRecord.find({ user: req.user._id }).sort({ date: -1 })
    res.json(healthRecords)
  } catch (error) {
    res.status(400).json({ message: 'Failed to fetch health records', error: error.message })
  }
}

exports.updateHealthRecord = async (req, res) => {
  try {
    const healthRecord = await HealthRecord.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true, runValidators: true }
    )
    if (!healthRecord) {
      return res.status(404).json({ message: 'Health record not found' })
    }
    res.json(healthRecord)
  } catch (error) {
    res.status(400).json({ message: 'Failed to update health record', error: error.message })
  }
}

exports.deleteHealthRecord = async (req, res) => {
  try {
    const healthRecord = await HealthRecord.findOneAndDelete({ _id: req.params.id, user: req.user._id })
    if (!healthRecord) {
      return res.status(404).json({ message: 'Health record not found' })
    }
    res.json({ message: 'Health record deleted successfully' })
  } catch (error) {
    res.status(400).json({ message: 'Failed to delete health record', error: error.message })
  }
}