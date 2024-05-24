import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminDashboard from '../AdminDashboard';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteMessage, setDeleteMessage] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/subscriptions');
        setUsers(response.data);
      } catch (error) {
        setError('Failed to fetch users');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`http://localhost:5000/api/subscriptions/${userId}`);
      setUsers(users.filter(user => user._id !== userId));
      setDeleteMessage('User deleted successfully');
      setTimeout(() => {
        setDeleteMessage('');
      }, 3000); // Clear the message after 3 seconds
    } catch (error) {
      console.error('Failed to delete user', error);
    }
  };

  return (
    <>
      <AdminDashboard />
      <div className="container mx-auto mt-8">
        <h3 className="text-2xl font-bold mb-8 text-center text-white">Users</h3>
        {loading ? (
          <p className="text-center text-white">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <div className="overflow-x-auto">
            {deleteMessage && (
              <p className="text-center text-green-500">{deleteMessage}</p>
            )}
            <table className="min-w-full bg-black text-white">
              <thead>
                <tr>
                  <th className="px-6 py-3 border-b border-gray-200 text-left leading-4 text-white tracking-wider">Sr.No</th>
                  <th className="px-6 py-3 border-b border-gray-200 text-left leading-4 text-white tracking-wider">Email</th>
                  <th className="px-6 py-3 border-b border-gray-200 text-left leading-4 text-white tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={user._id}>
                    <td className="px-6 py-4 border-b border-gray-200">{index + 1}</td>
                    <td className="px-6 py-4 border-b border-gray-200">{user.email}</td>
                    <td className="px-6 py-4 border-b border-gray-200">
                      <button
                        onClick={() => handleDelete(user._id)}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default Users;
