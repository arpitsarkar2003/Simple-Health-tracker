import React, { useState } from 'react';

function AddHealthRecordForm({ onSubmit }) {
  const [date, setDate] = useState('');
  const [temperature, setTemperature] = useState('');
  const [bloodPressure, setBloodPressure] = useState('');
  const [heartRate, setHeartRate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      date,
      temperature: parseFloat(temperature),
      bloodPressure,
      heartRate: parseInt(heartRate, 10)
    });
    setDate('');
    setTemperature('');
    setBloodPressure('');
    setHeartRate('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-4">
      <div>
        <label htmlFor="date" className="block text-sm font-medium text-gray-700">
          Date
        </label>
        <input
          type="date"
          id="date"
          required
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="temperature" className="block text-sm font-medium text-gray-700">
          Temperature (°C)
        </label>
        <input
          type="number"
          id="temperature"
          step="0.1"
          required
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          value={temperature}
          onChange={(e) => setTemperature(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="bloodPressure" className="block text-sm font-medium text-gray-700">
          Blood Pressure
        </label>
        <input
          type="text"
          id="bloodPressure"
          required
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          value={bloodPressure}
          onChange={(e) => setBloodPressure(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="heartRate" className="block text-sm font-medium text-gray-700">
          Heart Rate (bpm)
        </label>
        <input
          type="number"
          id="heartRate"
          required
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          value={heartRate}
          onChange={(e) => setHeartRate(e.target.value)}
        />
      </div>
      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Add Record
      </button>
    </form>
  );
}

export default AddHealthRecordForm;