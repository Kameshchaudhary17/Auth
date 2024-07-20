import React, { useState } from 'react';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    imageUrl: '',
    description: ''
  });
  const [file, setFile] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPost = { ...formData };
    
    if (file) {
      newPost.imageUrl = URL.createObjectURL(file);
    }
    
    setPosts([newPost, ...posts]);
    setFormData({ title: '', imageUrl: '', description: '' });
    setFile(null);
    setIsFormOpen(false);
  };

  return (
    <div className="max-w-4xl mx-auto my-8 p-4">
      <button
        onClick={() => setIsFormOpen(!isFormOpen)}
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
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="imageUpload">
              Upload Image
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="imageUpload"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="imageUrl">
              Or Image URL
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="imageUrl"
              type="url"
              placeholder="Enter image URL"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleInputChange}
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
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Post Blog
            </button>
          </div>
        </form>
      )}

      {posts.map((post, index) => (
        <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden mb-8">
          <img 
            className="w-full h-64 object-cover object-center"
            src={post.imageUrl} 
            alt={post.title}
          />
          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {post.title}
            </h1>
            <p className="text-gray-700 leading-relaxed">
              {post.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Blog;