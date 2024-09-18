import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AddHealthRecordForm from '../components/AddHealthRecordForm';
import HealthRecordItem from '../components/HealthRecordItem';
import { getHealthRecords, addHealthRecord, updateHealthRecord, deleteHealthRecord } from '../api';

function Dashboard() {
  const [records, setRecords] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    setLoading(true);
    try {
      const data = await getHealthRecords();
      setRecords(data);
    } catch (error) {
      console.error('Failed to fetch records:', error);
      navigate('/login');
    } finally {
      setLoading(false);
    }
  };

  const handleAddRecord = async (record) => {
    setLoading(true);
    try {
      await addHealthRecord(record);
      fetchRecords();
      setShowAddForm(false);
    } catch (error) {
      console.error('Failed to add record:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateRecord = async (id, updatedRecord) => {
    setLoading(true);
    try {
      await updateHealthRecord(id, updatedRecord);
      fetchRecords();
    } catch (error) {
      console.error('Failed to update record:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteRecord = async (id) => {
    setLoading(true);
    try {
      await deleteHealthRecord(id);
      fetchRecords();
    } catch (error) {
      console.error('Failed to delete record:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredRecords = records.filter(record =>
    record.date.includes(searchTerm) ||
    record.temperature.toString().includes(searchTerm) ||
    record.bloodPressure.includes(searchTerm) ||
    record.heartRate.toString().includes(searchTerm)
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Health Metrics Dashboard</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search records..."
          className="w-full p-2 border rounded"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        onClick={() => setShowAddForm(!showAddForm)}
      >
        {showAddForm ? 'Cancel' : 'Add New Record'}
      </button>
      {showAddForm && <AddHealthRecordForm onSubmit={handleAddRecord} />}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <img src="spinner.gif" alt="Loading..." className="w-16 h-16" />
        </div>
      ) : filteredRecords.length === 0 ? (
        <p>No records found.</p>
      ) : (
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Temperature</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Blood Pressure</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Heart Rate</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredRecords.map((record) => (
              <HealthRecordItem
                key={record._id}
                record={record}
                onUpdate={handleUpdateRecord}
                onDelete={handleDeleteRecord}
              />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Dashboard;
