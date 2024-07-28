import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PublicBlog = () => {

  const token = localStorage.getItem('token');
  if (!token) return <h1>Please login</h1>;

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
      </div>
    </div>
  ))}
</div>


  );
};

export default PublicBlog;