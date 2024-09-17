const HealthRecord = require('../models/HealthRecord');

// Get all health records
exports.getHealthRecords = async (req, res) => {
  try {
    const healthRecords = await HealthRecord.find().sort({ date: -1 });
    res.json(healthRecords);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single health record
exports.getHealthRecord = async (req, res) => {
  try {
    const healthRecord = await HealthRecord.findById(req.params.id);
    if (!healthRecord) {
      return res.status(404).json({ message: 'Health record not found' });
    }
    res.json(healthRecord);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new health record
exports.createHealthRecord = async (req, res) => {
  const healthRecord = new HealthRecord({
    date: req.body.date,
    temperature: req.body.temperature,
    bloodPressure: req.body.bloodPressure,
    heartRate: req.body.heartRate,
  });

  try {
    const newHealthRecord = await healthRecord.save();
    res.status(201).json(newHealthRecord);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a health record
exports.updateHealthRecord = async (req, res) => {
  try {
    const healthRecord = await HealthRecord.findById(req.params.id);
    if (!healthRecord) {
      return res.status(404).json({ message: 'Health record not found' });
    }

    healthRecord.date = req.body.date;
    healthRecord.temperature = req.body.temperature;
    healthRecord.bloodPressure = req.body.bloodPressure;
    healthRecord.heartRate = req.body.heartRate;

    const updatedHealthRecord = await healthRecord.save();
    res.json(updatedHealthRecord);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a health record
exports.deleteHealthRecord = async (req, res) => {
  try {
    const healthRecord = await HealthRecord.findById(req.params.id);
    if (!healthRecord) {
      return res.status(404).json({ message: 'Health record not found' });
    }

    await healthRecord.remove();
    res.json({ message: 'Health record deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};