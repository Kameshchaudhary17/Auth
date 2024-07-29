import React, { useState } from 'react';

const Profile = () => {
  const token = localStorage.getItem('token');
  if (!token) return <h1>Please login</h1>;

  const [openForm, setOpenForm] = useState(false);
  const [editProfile, setEditProfile] = useState(null);


  return (
    
    <div className="max-w-4xl mx-auto my-8 p-4">
      <button
       onClick={()=>{setOpenForm(true)
        setEditProfile(null)
       }
      }
        className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Add Profile
      </button>

    <div className="max-w-3xl mx-auto p-8 bg-white rounded-lg shadow-lg mt-10">
      {openForm &&
      
        <form  className="space-y-4">
          <div className="flex flex-col items-center md:flex-row md:items-start md:space-x-8">
            <div className="flex-shrink-0 mb-6 md:mb-0">
              <input
                type="file"
                name="image"
                
                className="border border-gray-300 rounded-lg"
              />
            </div>
            <div className="w-full">
              <input
                type="text"
                name="name"
                
                placeholder="Name"
                className="w-full border border-gray-300 rounded-lg p-2 mb-4"
                required
              />
              <input
                type="text"
                name="address"
                placeholder="Address"
                className="w-full border border-gray-300 rounded-lg p-2 mb-4"
                required
              />
              <input
                type="text"
                name="contact"
                placeholder="Contact"
                className="w-full border border-gray-300 rounded-lg p-2 mb-4"
                required
              />
              <textarea
                name="bio"
               
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
              onClick={()=>(setOpenForm(false))}
              className="mr-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
             {editProfile==='Edit' ? 'Edit' : 'Save'}
            </button>
          </div>
        </form>
}
      
        <div className="flex flex-col items-center md:flex-row md:items-start md:space-x-8">
          <div className="flex-shrink-0 mb-6 md:mb-0">
            <img
              className="h-32 w-32 rounded-full object-cover"
              src= ""
              alt="Profile"
            />
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-bold text-gray-900">Name</h1>
            <p className="mt-2 text-gray-600">Address</p>
            <p className="mt-1 text-gray-600">Contact</p>
            <p className="mt-4 text-gray-700">Bio</p>
          </div>
        </div>
     

      <div className="flex justify-end mt-4">
        
          <button
            onClick={()=>{

              setOpenForm(true)
            setEditProfile('Edit')
            }
            }
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Edit
          </button>
        
      </div>
    </div>
    </div>
    
  );
};

export default Profile;
