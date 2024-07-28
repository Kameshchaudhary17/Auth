import React from 'react'

const Profile = () => {

    const token = localStorage.getItem('token');
        if(!token) return <h1>please login</h1>;
    

    const user = {
        name: 'Lionel Messi',
        photo: 'https://th.bing.com/th/id/OIP.Mxl-OlbgXDjQ5LzRxR-TNgHaDt?w=329&h=175&c=7&r=0&o=5&dpr=1.3&pid=1.7', // Replace with the actual profile photo URL
        address: 'Rosario, Argentina',
        contact: '+54 123 456 789',
        bio: 'Lionel Messi is a professional footballer from Argentina, widely considered one of the greatest players of all time. He has won numerous awards and accolades throughout his career.',
        social: {
          twitter: 'https://twitter.com/messi',
          instagram: 'https://instagram.com/messi',
          facebook: 'https://facebook.com/messi',
        },
      };
  return (
    <div className="max-w-3xl mx-auto p-8 bg-white rounded-lg shadow-lg mt-10">
    <div className="flex flex-col items-center md:flex-row md:items-start md:space-x-8">
      <div className="flex-shrink-0 mb-6 md:mb-0">
        <img
          className="h-32 w-32 rounded-full object-cover"
          src={user.photo}
          alt={user.name}
        />
      </div>
      <div className="text-center md:text-left">
        <h1 className="text-4xl font-bold text-gray-900">{user.name}</h1>
        <p className="mt-2 text-gray-600">{user.address}</p>
        <p className="mt-1 text-gray-600">{user.contact}</p>
        <p className="mt-4 text-gray-700">{user.bio}</p>
      </div>
    </div>
    <div className="mt-6 flex justify-center md:justify-start space-x-4">
      {user.social.twitter && (
        <a href={user.social.twitter} className="text-blue-500 hover:text-blue-700" target="_blank" rel="noopener noreferrer">
          Twitter
        </a>
      )}
      {user.social.instagram && (
        <a href={user.social.instagram} className="text-pink-500 hover:text-pink-700" target="_blank" rel="noopener noreferrer">
          Instagram
        </a>
      )}
      {user.social.facebook && (
        <a href={user.social.facebook} className="text-blue-700 hover:text-blue-900" target="_blank" rel="noopener noreferrer">
          Facebook
        </a>
      )}
    </div>
  </div>
);
};

export default Profile
