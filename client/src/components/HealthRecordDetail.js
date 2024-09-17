import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const HealthRecordDetail = () => {
  const [record, setRecord] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchRecord();
  }, [id]);

  const fetchRecord = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/health-records/${id}`);
      setRecord(response.data);
    } catch (error) {
      console.error('Error fetching health record:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecord(prevRecord => ({
      ...prevRecord,
      [name]: name === 'temperature' ? parseFloat(value) : parseInt(value),
      bloodPressure: name === 'systolic' || name === 'diastolic'
        ? { ...prevRecord.bloodPressure, [name]: parseInt(value) }
        : prevRecord.bloodPressure
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/api/health-records/${id}`, record);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating health record:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/health-records/${id}`);
      navigate('/');
    } catch (error) {
      console.error('Error deleting health record:', error);
    }
  };

  if (!record) return <div>Loading...</div>;

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Health Record Detail</h2>
      {isEditing ? (
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">
              Date
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="date"
              type="date"
              name="date"
              value={record.date}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="temperature">
              Temperature (°C)
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="temperature"
              type="number"
              step="0.1"
              name="temperature"
              value={record.temperature}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="systolic">
              Blood Pressure (Systolic)
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="systolic"
              type="number"
              name="systolic"
              value={record.bloodPressure.systolic}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="diastolic">
              Blood Pressure (Diastolic)
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="diastolic"
              type="number"
              name="diastolic"
              value={record.bloodPressure.diastolic}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="heartRate">
              Heart Rate (bpm)
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="heartRate"
              type="number"
              name="heartRate"
              value={record.heartRate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Save
            </button>
            <button
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <p><strong>Date:</strong> {record.date}</p>
          <p><strong>Temperature:</strong> {record.temperature}°C</p>
          <p><strong>Blood Pressure:</strong> {record.bloodPressure.systolic}/{record.bloodPressure.diastolic}</p>
          <p><strong>Heart Rate:</strong> {record.heartRate} bpm</p>
          <div className="flex items-center justify-between mt-4">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HealthRecordDetail;