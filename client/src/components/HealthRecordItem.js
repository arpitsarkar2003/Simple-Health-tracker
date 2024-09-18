import React, { useState } from 'react';
import { format } from 'date-fns';

function HealthRecordItem({ record, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedRecord, setEditedRecord] = useState(record);

  const formattedDate = format(new Date(record.date), 'yyyy-MM-dd hh:mm a');

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedRecord(record);
  };

  const handleSave = () => {
    onUpdate(record._id, editedRecord);
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedRecord(prev => ({ ...prev, [name]: value }));
  };

  return (
    <tr>
      {isEditing ? (
        <>
          <td>
            <input
              type="datetime-local"
              name="date"
              value={new Date(editedRecord.date).toISOString().slice(0, -1)}
              onChange={handleChange}
              className="p-1 border rounded"
            />
          </td>
          <td>
            <input
              type="number"
              name="temperature"
              value={editedRecord.temperature}
              onChange={handleChange}
              className="p-1 border rounded"
              step="0.1"
            />
          </td>
          <td>
            <input
              type="text"
              name="bloodPressure"
              value={editedRecord.bloodPressure}
              onChange={handleChange}
              className="p-1 border rounded"
            />
          </td>
          <td>
            <input
              type="number"
              name="heartRate"
              value={editedRecord.heartRate}
              onChange={handleChange}
              className="p-1 border rounded"
            />
          </td>
          <td>
            <button onClick={handleSave} className="bg-green-500 text-white px-2 py-1 rounded mr-2">Save</button>
            <button onClick={handleCancel} className="bg-gray-500 text-white px-2 py-1 rounded">Cancel</button>
          </td>
        </>
      ) : (
        <>
          <td>{formattedDate}</td>
          <td>{record.temperature}°C</td>
          <td>{record.bloodPressure}</td>
          <td>{record.heartRate} bpm</td>
          <td>
            <button onClick={handleEdit} className="bg-blue-500 text-white px-2 py-1 rounded mr-2">Edit</button>
            <button onClick={() => onDelete(record._id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
          </td>
        </>
      )}
    </tr>
  );
}

export default HealthRecordItem;
