const express = require('express')
const { createHealthRecord, getHealthRecords, updateHealthRecord, deleteHealthRecord } = require('../controllers/healthRecordController')
const authMiddleware = require('../middleware/authMiddleware')

const router = express.Router()

router.use(authMiddleware)

router.post('/', createHealthRecord)
router.get('/', getHealthRecords)
router.put('/:id', updateHealthRecord)
router.delete('/:id', deleteHealthRecord)

module.exports = router