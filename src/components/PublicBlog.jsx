import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PublicBlog = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetchPublicBlogs();
  }, []);

  const fetchPublicBlogs = async () => {
    try {
      const response = await axios.get('http://localhost:5555/public', { withCredentials: true });
      setBlogs(response.data);
    } catch (error) {
      console.error('Error fetching public blogs:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto my-8 p-4">
      {blogs.map((blog) => (
        <div key={blog.id} className="bg-white shadow-lg rounded-lg overflow-hidden mb-8">
          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {blog.title}
            </h1>
            <p className="text-gray-700 leading-relaxed">
              {blog.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PublicBlog;