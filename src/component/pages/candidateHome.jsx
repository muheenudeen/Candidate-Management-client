import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function CandidateHome() {
  const [candidateData, setCandidateData] = useState({});
  const [resume, setResume] = useState(null);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCandidateData = async () => {
      try {
        const id = localStorage.getItem('id');
        const token = localStorage.getItem('token');
        if (!id || !token) {
          navigate('/candidate/login');
          return;
        }

        const response = await axios.get(`http://localhost:3000/api/candidate/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCandidateData(response.data.data);
      } catch (error) {
        console.error('Error fetching candidate data:', error);
        navigate('/candidate/login');
      }
    };

    fetchCandidateData();
  }, [navigate]);

  const handleUpload = async (e, type) => {
    e.preventDefault();
    setIsUploading(true);
    try {
      const formData = new FormData();
      if (type === 'resume') {
        if (!resume) {
          alert('Please select a resume file.');
          setIsUploading(false);
          return;
        }
        formData.append('file', resume);
      } else if (type === 'profilePhoto') {
        if (!profilePhoto) {
          alert('Please select a profile photo.');
          setIsUploading(false);
          return;
        }
        formData.append('image', profilePhoto);
      }

      const id = localStorage.getItem('id');
      const token = localStorage.getItem('token');
      const uploadEndpoint =
        type === 'resume'
          ? `http://localhost:3000/api/candidate/upload/resume/${id}`
          : `http://localhost:3000/api/candidate/upload/profile/${id}`;

      const response = await axios.post(uploadEndpoint, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      alert(response.data.message);
      setCandidateData(response.data.data); 
    } catch (error) {
      console.error(`Error uploading ${type}:`, error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-6">
      <h1 className="text-2xl font-bold mb-6">Welcome, {candidateData.name}</h1>

      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <img
          src={candidateData.profileUrl || '/placeholder-profile.png'}
          alt="Profile"
          className="w-24 h-24 rounded-full mx-auto mb-4"
        />
        <p className="mb-2">
          <strong>Email:</strong> {candidateData.email}
        </p>
        <p className="mb-4">
          <strong>Phone:</strong> {candidateData.phone}
        </p>

        <form onSubmit={(e) => handleUpload(e, 'profilePhoto')} className="mb-4">
          <label className="block mb-2 font-medium">Upload Profile Photo:</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setProfilePhoto(e.target.files[0])}
            className="border p-2 rounded w-full"
          />
          <button
            type="submit"
            className="mt-2 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
            disabled={isUploading}
          >
            {isUploading ? 'Uploading...' : 'Upload Photo'}
          </button>
        </form>

        <form onSubmit={(e) => handleUpload(e, 'resume')} className="mb-4">
          <label className="block mb-2 font-medium">Upload Resume:</label>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={(e) => setResume(e.target.files[0])}
            className="border p-2 rounded w-full"
          />
          <button
            type="submit"
            className="mt-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
            disabled={isUploading}
          >
            {isUploading ? 'Uploading...' : 'Upload Resume'}
          </button>
        </form>
      </div>
    </div>
  );
}
