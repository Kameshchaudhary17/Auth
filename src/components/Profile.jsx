import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
  const token = localStorage.getItem('token');
  if (!token) return <h1>Please login</h1>;

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [profileData, setProfileData] = useState({
    name: '',
    address: '',
    contact: '',
    bio: '',
    imageFile: null,
    imageUrl: '',
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await axios.get('http://localhost:5555/getprofile', {
        withCredentials: true,
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const profile = response.data;
      setProfileData({
        ...profile,
        imageFile: null,
        imageUrl: profile.image ? `http://localhost:5555/${profile.image}` : '',
      });
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    setProfileData((prevData) => ({ ...prevData, imageFile: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('name', profileData.name);
      formData.append('address', profileData.address);
      formData.append('contact', profileData.contact);
      formData.append('bio', profileData.bio);
      if (profileData.imageFile) {
        formData.append('image', profileData.imageFile);
      }

      await axios.post('http://localhost:5555/createprofile', formData, {
        withCredentials: true,
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      setIsFormOpen(false);
      fetchProfile(); // Refresh profile data after creation
    } catch (error) {
      console.error('Error creating profile:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto my-8 p-4">
      <button
        onClick={() => setIsFormOpen(true)}
        className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Add Profile
      </button>

      {isFormOpen && (
        <div className="max-w-3xl mx-auto p-8 bg-white rounded-lg shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col items-center md:flex-row md:items-start md:space-x-8">
              <div className="flex-shrink-0 mb-6 md:mb-0">
                <input
                  type="file"
                  name="image"
                  onChange={handleFileChange}
                  className="border border-gray-300 rounded-lg"
                />
              </div>
              <div className="w-full">
                <input
                  type="text"
                  name="name"
                  value={profileData.name}
                  onChange={handleInputChange}
                  placeholder="Name"
                  className="w-full border border-gray-300 rounded-lg p-2 mb-4"
                  required
                />
                <input
                  type="text"
                  name="address"
                  value={profileData.address}
                  onChange={handleInputChange}
                  placeholder="Address"
                  className="w-full border border-gray-300 rounded-lg p-2 mb-4"
                  required
                />
                <input
                  type="text"
                  name="contact"
                  value={profileData.contact}
                  onChange={handleInputChange}
                  placeholder="Contact"
                  className="w-full border border-gray-300 rounded-lg p-2 mb-4"
                  required
                />
                <textarea
                  name="bio"
                  value={profileData.bio}
                  onChange={handleInputChange}
                  placeholder="Bio"
                  className="w-full border border-gray-300 rounded-lg p-2"
                  rows="4"
                  required
                ></textarea>
              </div>
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setIsFormOpen(false)}
                className="mr-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Display profile information */}
      {profileData.name && (
        <div className="max-w-3xl mx-auto p-8 bg-white rounded-lg shadow-lg mt-10">
          <div className="flex flex-col items-center md:flex-row md:items-start md:space-x-8">
            <div className="flex-shrink-0 mb-6 md:mb-0">
              {profileData.imageUrl && (
                <img
                  className="h-32 w-32 rounded-full object-cover"
                  src={profileData.imageUrl}
                  alt="Profile"
                />
              )}
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-4xl font-bold text-gray-900">{profileData.name}</h1>
              <p className="mt-2 text-gray-600">{profileData.address}</p>
              <p className="mt-1 text-gray-600">{profileData.contact}</p>
              <p className="mt-4 text-gray-700">{profileData.bio}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
