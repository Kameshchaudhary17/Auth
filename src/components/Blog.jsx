import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Blog = () => {
  const token = localStorage.getItem('token');
  if (!token) return <h1>Please login</h1>;

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    title: '',
    description: '',
    image: null
  });
  const [blogs, setBlogs] = useState([]);
  const [editingBlogId, setEditingBlogId] = useState(null);

  useEffect(() => {
    fetchUserBlogs();
  }, []);

  const fetchUserBlogs = async () => {
    try {
      const response = await axios.get('http://localhost:5555/get', { withCredentials: true });
      setBlogs(response.data);
    } catch (error) {
      console.error('Error fetching user blogs:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    setFormData(prevData => ({
      ...prevData,
      image: e.target.files[0]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataWithImage = new FormData();
      formDataWithImage.append('title', formData.title);
      formDataWithImage.append('description', formData.description);
      if (formData.image) {
        formDataWithImage.append('image', formData.image);
      }
      if (editingBlogId) {
        formDataWithImage.append('id', formData.id);
        await axios.put('http://localhost:5555/update', formDataWithImage, {
          withCredentials: true,
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      } else {
        await axios.post('http://localhost:5555/create', formDataWithImage, {
          withCredentials: true,
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      }
      fetchUserBlogs();
      setFormData({ id: null, title: '', description: '', image: null });
      setEditingBlogId(null);
      setIsFormOpen(false);
    } catch (error) {
      console.error('Error creating/updating blog post:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5555/delete/${id}`, { withCredentials: true });
      setBlogs(blogs.filter(blog => blog.id !== id));
    } catch (error) {
      console.error('Error deleting blog post:', error);
    }
  };

  const handleEdit = (blog) => {
    setFormData({
      id: blog.id,
      title: blog.title,
      description: blog.description,
      image: null
    });
    setEditingBlogId(blog.id);
    setIsFormOpen(true);
  };

  return (
    <div className="max-w-4xl mx-auto my-8 p-4">
      <button
        onClick={() => {
          setIsFormOpen(!isFormOpen);
          if (!isFormOpen) {
            setFormData({ id: null, title: '', description: '', image: null });
            setEditingBlogId(null);
          }
        }}
        className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        {isFormOpen ? 'Close Form' : 'Create New Blog Post'}
      </button>

      {isFormOpen && (
        <form onSubmit={handleSubmit} className="mb-8 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
              Title
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="title"
              type="text"
              placeholder="Enter title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
              Description
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="description"
              placeholder="Enter description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows="4"
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
              Image
            </label>
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleImageChange}
              className="w-full"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              {editingBlogId ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      )}

      <div>
      {blogs.map((blog) => (
    <div key={blog.id} className="bg-white shadow-lg rounded-lg overflow-hidden mb-8">
      <div className="p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          {blog.title}
        </h1>
        <p className="text-gray-700 leading-relaxed mb-4">
          {blog.description}
        </p>
        {blog.image && (
          <div className="mb-4 overflow-hidden" style={{ position: 'relative', paddingBottom: '56.25%' }}>
            <img
              src={`http://localhost:5555/${blog.image}`}
              alt={blog.title}
              style={{ 
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover' 
              }}
              className="mb-4"
            />
          </div>
        )}
              <div className="flex justify-end">
                <button
                  className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mr-2"
                  onClick={() => handleEdit(blog)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handleDelete(blog.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
