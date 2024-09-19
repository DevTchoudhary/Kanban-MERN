import React, { useState } from 'react';

function Profile() {
  const initialProfileData = {
    name: '',
    bio: '',
    profilePicture: '', // Placeholder image
    location: '',
    occupation: '',
    skills: ['JavaScript', 'React', 'Node.js', 'MongoDB', 'Tailwind CSS'],
    interests: ['Coding', 'Reading', 'Travelling', 'Music'],
  };

  const [profileData, setProfileData] = useState(initialProfileData);
  const [editMode, setEditMode] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const validateFields = () => {
    const fieldErrors = {};
    if (!profileData.name) fieldErrors.name = 'Name is required';
    if (!profileData.bio) fieldErrors.bio = 'Bio is required';
    if (!profileData.location) fieldErrors.location = 'Location is required';
    if (!profileData.occupation) fieldErrors.occupation = 'Occupation is required';
    
    setErrors(fieldErrors);
    return Object.keys(fieldErrors).length === 0;
  };

  const handleSave = () => {
    if (!validateFields()) return; // If validation fails, stop saving

    setEditMode(false);
    alert('Data saved successfully!');
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      {/* Profile Picture */}
      <div className="flex justify-center mb-6">
        <img
          className="w-32 h-32 rounded-full border-2 border-gray-300"
          src={profileData.profilePicture}
          alt="Profile"
        />
      </div>

      {/* Name and Bio */}
      <div className="mb-6">
        {editMode ? (
          <div>
            <input
              type="text"
              name="name"
              value={profileData.name}
              onChange={handleChange}
              className="block w-full p-2 border rounded-md"
              placeholder="Enter name"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>
        ) : (
          <h1 className="text-center text-2xl font-bold">{profileData.name || 'Your Name'}</h1>
        )}

        {editMode ? (
          <div>
            <textarea
              name="bio"
              value={profileData.bio}
              onChange={handleChange}
              className="block w-full p-2 mt-4 border rounded-md"
              placeholder="Enter bio"
            />
            {errors.bio && <p className="text-red-500 text-sm">{errors.bio}</p>}
          </div>
        ) : (
          <p className="text-center mt-2 text-gray-600">{profileData.bio || 'Your Bio'}</p>
        )}
      </div>

      {/* Location, Occupation, and Interests */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <h2 className="font-semibold text-gray-700">Location:</h2>
          {editMode ? (
            <div>
              <input
                type="text"
                name="location"
                value={profileData.location}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                placeholder="Enter location"
              />
              {errors.location && <p className="text-red-500 text-sm">{errors.location}</p>}
            </div>
          ) : (
            <p>{profileData.location || 'Your Location'}</p>
          )}
        </div>

        <div>
          <h2 className="font-semibold text-gray-700">Occupation:</h2>
          {editMode ? (
            <div>
              <input
                type="text"
                name="occupation"
                value={profileData.occupation}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                placeholder="Enter occupation"
              />
              {errors.occupation && <p className="text-red-500 text-sm">{errors.occupation}</p>}
            </div>
          ) : (
            <p>{profileData.occupation || 'Your Occupation'}</p>
          )}
        </div>

        <div>
          <h2 className="font-semibold text-gray-700">Skills:</h2>
          <p>{profileData.skills.join(', ')}</p>
        </div>

        <div>
          <h2 className="font-semibold text-gray-700">Interests:</h2>
          <p>{profileData.interests.join(', ')}</p>
        </div>
      </div>

      {/* Save Button */}
      <div className="mt-6 flex justify-center">
        {editMode ? (
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
          >
            Save
          </button>
        ) : (
          <button
            onClick={() => setEditMode(true)}
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition duration-200"
          >
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
}

export default Profile;
