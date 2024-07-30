import React, { useState } from 'react';
import axios from 'axios';

const Profile = () => {
  const token = localStorage.getItem('token');
  if (!token) return <h1>Please login</h1>;

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editProfile, setEditProfile] = useState(null);
  const [profileData, setProfileData] = useState({
    name: '',
    address: '',
    contact: '',
    bio: '',
    image: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    setProfileData((prevData) => ({ ...prevData, image: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('name', profileData.name);
      formData.append('address', profileData.address);
      formData.append('contact', profileData.contact);
      formData.append('bio', profileData.bio);
      if (profileData.image) {
        formData.append('image', profileData.image);
      }

      if (editProfile) {
        // Update existing profile
        await axios.put(`http://localhost:5555/updateprofile`, formData, {
          withCredentials: true,
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
      } else {
        // Create new profile
        await axios.post('http://localhost:5555/createProfile', formData, {
          withCredentials: true,
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
      }

      // Reset form and close it
      setProfileData({ name: '', address: '', contact: '', bio: '', image: null });
      setIsFormOpen(false);
      setEditProfile(null);
    } catch (error) {
      console.error('Error creating/updating profile:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto my-8 p-4">
      <button
        onClick={() => {
          setIsFormOpen(true);
          setEditProfile(null);
        }}
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
                {editProfile ? 'Edit' : 'Save'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Display profile information */}
      <div className="max-w-3xl mx-auto p-8 bg-white rounded-lg shadow-lg mt-10">
        {/* Assuming profileData contains the existing profile data */}
        <div className="flex flex-col items-center md:flex-row md:items-start md:space-x-8">
          <div className="flex-shrink-0 mb-6 md:mb-0">
            <img
              className="h-32 w-32 rounded-full object-cover"
              src={profileData.image || ""}
              alt="Profile"
            />
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-bold text-gray-900">{profileData.name || 'Name'}</h1>
            <p className="mt-2 text-gray-600">{profileData.address || 'Address'}</p>
            <p className="mt-1 text-gray-600">{profileData.contact || 'Contact'}</p>
            <p className="mt-4 text-gray-700">{profileData.bio || 'Bio'}</p>
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <button
            onClick={() => {
              setIsFormOpen(true);
              setEditProfile(profileData);
            }}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
