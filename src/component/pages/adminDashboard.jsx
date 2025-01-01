import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AddCandidateModal from "../modal/addCandidatesModal";

const AdminDashboard = () => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);  // State to handle modal visibility
  const navigate = useNavigate();
  const limit = 5;

  const fetchCandidates = async (page) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Unauthorized: No token found.");
      const response = await axios.get(
        `http://localhost:3000/api/admin/candidate?page=${page}&limit=${limit}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setCandidates(response.data.data || []);
      setTotalPages(Math.ceil(response.data.pagination.totalCandidates / limit));
    } catch (error) {
      console.error("Error fetching candidates:", error);
      setError("Failed to load candidates. Redirecting to login...");
      setTimeout(() => navigate("/admin/login"), 2000);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCandidates(currentPage);
  }, [currentPage]);

  const deleteCandidate = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Unauthorized: No token found.");
      await axios.delete(`http://localhost:3000/api/admin/candidate/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCandidates((prevCandidates) =>
        prevCandidates.filter((candidate) => candidate._id !== id)
      );
    } catch (error) {
      console.error("Error deleting candidate:", error);
      setError("Failed to delete candidate. Please try again.");
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);  // Open the modal
  };

  const closeModal = () => {
    setIsModalOpen(false);  // Close the modal
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold text-gray-700 mb-4">Admin Dashboard</h1>
      <button
        onClick={openModal}  // Open the modal when the button is clicked
        className="mb-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Add New Candidate
      </button>

      {/* Modal component */}
      {isModalOpen && (
        <AddCandidateModal 
          isOpen={isModalOpen} 
          onClose={closeModal} 
        />
      )}

      {loading ? (
        <p>Loading candidates...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : candidates.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border rounded">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">Profile Photo</th>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Address</th>
                <th className="px-4 py-2 text-left">Phone</th>
                <th className="px-4 py-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {candidates.map((candidate) => (
                <tr key={candidate._id} className="border-t">
                  <td className="px-4 py-2">
                    <img
                      src={candidate.profileUrl || "default-profile.jpg"}
                      alt={candidate.name}
                      className="w-12 h-12 rounded-full"
                    />
                  </td>
                  <td className="px-4 py-2">{candidate.name}</td>
                  <td className="px-4 py-2">{candidate.email}</td>
                  <td className="px-4 py-2">{candidate.address}</td>
                  <td className="px-4 py-2">{candidate.phone}</td>
                  <td className="px-4 py-2 text-center space-x-2">
                    <button
                      onClick={() => navigate(`/admin/edit-candidate/${candidate._id}`)}
                      className="bg-green-500 text-white py-1 px-3 rounded hover:bg-green-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteCandidate(candidate._id)}
                      className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-4 flex justify-center items-center space-x-2">
            <button
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
              className="bg-gray-300 text-gray-700 py-1 px-3 rounded disabled:opacity-50"
            >
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
              className="bg-gray-300 text-gray-700 py-1 px-3 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      ) : (
        <p>No candidates found.</p>
      )}
    </div>
  );
};

export default AdminDashboard;
