import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../modal/contentModal';
import PDFViewer from '../components/pdfViewer';
import api from '../../axios/axios';


export default function CandidateHome() {
  const [candidateData, setCandidateData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Tech Lane, Innovation City, IN 54321',
    profileUrl: '/placeholder.svg?height=200&width=200',
    totalApplications: 15,
    interviewsScheduled: 3,
    profileComplete: 75,
    resumeUrl: null
  });
  const [resume, setResume] = useState(null);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [showPdfModal, setShowPdfModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
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

        const response = await api.get(`/candidate/${id}`, {
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
      const uploadEndpoint = type === 'resume'
        ? `/candidate/upload/resume/${id}`
        : `/candidate/upload/profile/${id}`;

      const response = await api.post(uploadEndpoint, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      alert(response.data.message);
      setCandidateData(response.data.data);
      if (type === 'resume') {
        setShowPdfModal(true);
      }
    } catch (error) {
      console.error(`Error uploading ${type}:`, error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white bg-opacity-80 backdrop-filter backdrop-blur-lg shadow-2xl rounded-3xl overflow-hidden">
          <div className="p-8">
            {/* Header with AR Robotics logo */}
            <div className="flex justify-between items-center mb-8">
              <img
                src="https://images.jdmagicbox.com/v2/comp/bhubaneshwar/v6/0674px674.x674.220603004828.p2v6/catalogue/a-r-robotics-bhubaneswar-bhubaneshwar-research-centres-aj5j7yyhzm.jpg"
                alt="AR Robotics Logo"
                className="h-16 w-auto"
              />
              <h1 className="text-4xl font-bold text-gray-800">Welcome to AR Robotics</h1>
            </div>

            <div className="flex flex-col lg:flex-row gap-12">
              {/* Profile Section */}
              <div className="lg:w-1/3">
                <div className="relative">
                  <img
                    src={candidateData.profileUrl}
                    alt="Profile"
                    className="w-64 h-64 rounded-full object-cover border-4 border-purple-500 shadow-lg mx-auto"
                  />
                  <div className="absolute bottom-4 right-4 bg-white rounded-full p-2 shadow-md">
                    <form onSubmit={(e) => handleUpload(e, 'profilePhoto')}>
                      <label htmlFor="photo" className="cursor-pointer text-blue-600 hover:text-blue-800">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </label>
                      <input
                        id="photo"
                        type="file"
                        accept="image/*"
                        onChange={(e) => setProfilePhoto(e.target.files[0])}
                        className="hidden"
                      />
                    </form>
                  </div>
                </div>
                {profilePhoto && (
                  <button
                    onClick={(e) => handleUpload(e, 'profilePhoto')}
                    className="mt-4 w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-lg font-semibold rounded-lg hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition duration-150 ease-in-out"
                    disabled={isUploading}
                  >
                    {isUploading ? 'Uploading...' : 'Save Photo'}
                  </button>
                )}
              </div>

              {/* Info Section */}
              <div className="lg:w-2/3">
                <h2 className="text-3xl font-bold mb-6 text-gray-800">{candidateData.name}</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center space-x-4">
                    <div className="bg-gradient-to-br from-purple-400 to-pink-500 rounded-full p-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Email</p>
                      <p className="text-lg font-semibold text-gray-800">{candidateData.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="bg-gradient-to-br from-purple-400 to-pink-500 rounded-full p-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Phone</p>
                      <p className="text-lg font-semibold text-gray-800">{candidateData.phone}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="bg-gradient-to-br from-purple-400 to-pink-500 rounded-full p-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Address</p>
                      <p className="text-lg font-semibold text-gray-800">{candidateData.address}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="bg-gradient-to-br from-purple-400 to-pink-500 rounded-full p-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Resume</p>
                      <form onSubmit={(e) => handleUpload(e, 'resume')} className="mt-2">
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={(e) => setResume(e.target.files[0])}
                          className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        />
                        {resume && (
                          <button
                            type="submit"
                            className="mt-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-medium rounded-md hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition duration-150 ease-in-out"
                            disabled={isUploading}
                          >
                            {isUploading ? 'Uploading...' : 'Upload Resume'}
                          </button>
                        )}
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Section */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-pink-400 to-red-500 rounded-xl p-6 text-white shadow-lg transform hover:scale-105 transition duration-200">
                <div className="text-6xl font-bold mb-2">{candidateData.totalApplications}</div>
                <div className="text-2xl font-semibold mb-1">Applications</div>
                <div className="text-pink-200">Submitted</div>
              </div>
              <div className="bg-gradient-to-br from-purple-400 to-indigo-500 rounded-xl p-6 text-white shadow-lg transform hover:scale-105 transition duration-200">
                <div className="text-6xl font-bold mb-2">{candidateData.interviewsScheduled}</div>
                <div className="text-2xl font-semibold mb-1">Interviews</div>
                <div className="text-purple-200">Scheduled</div>
              </div>
              <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl p-6 text-white shadow-lg transform hover:scale-105 transition duration-200">
                <div className="text-6xl font-bold mb-2">{candidateData.profileComplete}%</div>
                <div className="text-2xl font-semibold mb-1">Profile</div>
                <div className="text-yellow-200">Complete</div>
              </div>
            </div>

            {/* New functionality: Profile Completion Tips */}
            <div className="mt-12">
              <button
                onClick={() => setShowProfileModal(true)}
                className="w-full px-6 py-3 bg-gradient-to-r from-teal-400 to-blue-500 text-white text-lg font-semibold rounded-lg hover:from-teal-500 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition duration-150 ease-in-out"
              >
                Get Profile Completion Tips
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* PDF Viewer Modal */}
      {showPdfModal && (
        <Modal onClose={() => setShowPdfModal(false)}>
          <PDFViewer pdfUrl={candidateData.resumeUrl} />
        </Modal>
      )}

      {/* Profile Completion Tips Modal */}
      {showProfileModal && (
        <Modal onClose={() => setShowProfileModal(false)}>
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Profile Completion Tips</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Add a professional profile picture</li>
              <li>Complete all sections of your profile</li>
              <li>Upload an up-to-date resume</li>
              <li>Add relevant skills and certifications</li>
              <li>Include a brief personal statement</li>
            </ul>
          </div>
        </Modal>
      )}
    </div>
  );
}


