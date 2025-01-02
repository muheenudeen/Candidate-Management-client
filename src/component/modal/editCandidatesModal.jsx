import React, { useState } from "react";
import api from "../../axios/axios";

const EditCandidateModal = ({ isOpen, onClose, candidate, onSuccess }) => {
  const [formData, setFormData] = useState({ ...candidate });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Unauthorized: No token found.");
      await api.put(`/admin/candidate/${candidate._id}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Candidate updated successfully");
      onSuccess();
    } catch (error) {
      console.error("Error updating candidate:", error);
      alert("Failed to update candidate");
    } finally {
      setLoading(false);
    }
  };

  return isOpen ? (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg w-1/3">
        <h2 className="text-xl font-bold mb-4">Edit Candidate</h2>
        {/* Form Inputs */}
        <button onClick={handleSubmit} disabled={loading}>
          Save Changes
        </button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  ) : null;
};

export default EditCandidateModal;
