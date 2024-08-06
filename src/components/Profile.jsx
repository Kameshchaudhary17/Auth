import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from './Modal';

const Profile = () => {
  const authToken = localStorage.getItem('token');
  const [profile, setProfile] = useState(null);
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [address, setAddress] = useState('');
  const [bio, setBio] = useState('');
  const [image, setImage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get('http://localhost:5555/getprofile', {
        withCredentials: true,
        headers: { Authorization: `Bearer ${authToken}` }
      });
      if (response.data.length > 0) {
        const userProfile = response.data[0];
        setProfile(userProfile);
        setName(userProfile.name);
        setContact(userProfile.contact);
        setAddress(userProfile.address);
        setBio(userProfile.bio);
        setImage(userProfile.image);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('contact', contact);
    formData.append('address', address);
    formData.append('bio', bio);
    if (image) formData.append('image', image);

    try {
      if (editing) {
        formData.append('id', profile.id);
        await axios.put('http://localhost:5555/updateprofile', formData, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'multipart/form-data'
          }
        });
      } else {
        await axios.post('http://localhost:5555/createprofile', formData, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'multipart/form-data'
          }
        });
      }
      fetchUserProfile();
      resetForm();
      setShowModal(false);
    } catch (error) {
      console.error('Error submitting profile:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5555/deleteprofile/${profile.id}`, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${authToken}` }
      });
      setProfile(null);
      resetForm();
    } catch (error) {
      console.error('Error deleting profile:', error);
    }
  };

  const resetForm = () => {
    setName('');
    setContact('');
    setAddress('');
    setBio('');
    setImage(null);
    setEditing(false);
  };

  return (
    <div className="max-w-4xl mx-auto my-8 p-4">
      <h1 className="text-3xl font-bold mb-4">Profile</h1>

      <button
        onClick={() => {
          setEditing(false);
          setShowModal(true);
        }}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-8"
      >
        Create Profile
      </button>

      {profile && (
        <div className="p-4 border border-gray-300 rounded-lg">
          <h3 className="text-xl font-bold">{profile.name}</h3>
          <p>Contact: {profile.contact}</p>
          <p>Address: {profile.address}</p>
          <p>Bio: {profile.bio}</p>
          {profile.image && (
            <img
              src={`http://localhost:5555${profile.image}`}
              alt={profile.name}
              className="w-full h-auto mt-4"
            />
          )}
          <div className="flex space-x-4 mt-4">
            <button
              onClick={() => {
                setEditing(true);
                setShowModal(true);
              }}
              className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      )}

      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <h2 className="text-2xl font-bold mb-4">{editing ? 'Edit Profile' : 'Create Profile'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            required
            className="w-full border border-gray-300 rounded-lg p-2"
          />
          <input
            type="text"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            placeholder="Contact"
            required
            className="w-full border border-gray-300 rounded-lg p-2"
          />
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Address"
            required
            className="w-full border border-gray-300 rounded-lg p-2"
          />
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Bio"
            required
            className="w-full border border-gray-300 rounded-lg p-2"
            rows="4"
          />
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className="border border-gray-300 rounded-lg p-2"
          />
          <div className="flex space-x-4">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              {editing ? 'Update Profile' : 'Create Profile'}
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Profile;
