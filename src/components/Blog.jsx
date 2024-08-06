import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Blog = () => {
  const authToken = localStorage.getItem('token');
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [editingBlogId, setEditingBlogId] = useState(null);

  useEffect(() => {
    fetchUserBlogs();
  }, []);

  const fetchUserBlogs = async () => {
    try {
      const response = await axios.get('http://localhost:5555/get', {
        withCredentials: true,
        headers: { Authorization: `Bearer ${authToken}` }
      });
      setBlogs(response.data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    if (image) formData.append('image', image);

    try {
      if (editingBlogId) {
        formData.append('id', editingBlogId);
        await axios.put('http://localhost:5555/update', formData, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'multipart/form-data'
          }
        });
      } else {
        await axios.post('http://localhost:5555/create', formData, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'multipart/form-data'
          }
        });
      }
      fetchUserBlogs();
      resetForm();
    } catch (error) {
      console.error('Error submitting blog:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5555/delete/${id}`, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${authToken}` }
      });
      fetchUserBlogs();
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
  };

  const handleEdit = (blog) => {
    setEditingBlogId(blog.id);
    setTitle(blog.title);
    setDescription(blog.description);
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setImage(null);
    setEditingBlogId(null);
  };

  return (
    <div className="max-w-4xl mx-auto my-8 p-4">
      <h1 className="text-3xl font-bold mb-4">My Blog</h1>

      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required
          className="w-full border border-gray-300 rounded-lg p-2"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
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
            {editingBlogId ? 'Update Blog' : 'Create Blog'}
          </button>
          {editingBlogId && (
            <button
              type="button"
              onClick={resetForm}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      <h2 className="text-2xl font-bold mb-4">My Blogs</h2>
      <div className="space-y-4">
        {blogs.map(blog => (
          <div key={blog.id} className="p-4 border border-gray-300 rounded-lg">
            <h3 className="text-xl font-bold">{blog.title}</h3>
            <p>{blog.description}</p>
            {blog.image && (
              <img
                src={`http://localhost:5555${blog.image}`} // Ensure this is the correct path
                alt={blog.title}
                className="w-full h-auto mt-4"
              />
            )}
            <div className="flex space-x-4 mt-4">
              <button
                onClick={() => handleEdit(blog)}
                className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(blog.id)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
