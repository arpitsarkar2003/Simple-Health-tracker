import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const DashBoard = () => {
    const [records, setRecords] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchRecords();
    }, []);

    const fetchRecords = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/health-records`);
            setRecords(response.data);
        } catch (error) {
            console.error('Error fetching health records:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}/api/health-records/${id}`);
            fetchRecords();
        } catch (error) {
            console.error('Error deleting health record:', error);
        }
    };

    const filteredRecords = records.filter(record =>
        record.date.includes(searchTerm) ||
        record.temperature.toString().includes(searchTerm) ||
        record.bloodPressure.systolic.toString().includes(searchTerm) ||
        record.bloodPressure.diastolic.toString().includes(searchTerm) ||
        record.heartRate.toString().includes(searchTerm)
    );

    // if (loading) {
    //     return <div>Loading...</div>;
    // }

    return (
        <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-4">
                <input
                    type="text"
                    placeholder="Search for records..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <Link to="/add" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Add New Record
                </Link>
            </div>
            {filteredRecords.length === 0 ? ( 
                <div className="text-center text-gray-500">No records found</div>
            ) : (
                <table className="min-w-full bg-white">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b">Date</th>
                            <th className="py-2 px-4 border-b">Temperature (°C)</th>
                            <th className="py-2 px-4 border-b">Blood Pressure</th>
                            <th className="py-2 px-4 border-b">Heart Rate (bpm)</th>
                            <th className="py-2 px-4 border-b">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredRecords.map((record) => (
                            <tr key={record._id}>
                                <td className="py-2 px-4 border-b">{record.date}</td>
                                <td className="py-2 px-4 border-b">{record.temperature}</td>
                                <td className="py-2 px-4 border-b">{`${record.bloodPressure.systolic}/${record.bloodPressure.diastolic}`}</td>
                                <td className="py-2 px-4 border-b">{record.heartRate}</td>
                                <td className="py-2 px-4 border-b">
                                    <Link to={`/edit/${record._id}`} className="text-blue-500 hover:text-blue-700 mr-2">
                                        Edit
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(record._id)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default DashBoard;
