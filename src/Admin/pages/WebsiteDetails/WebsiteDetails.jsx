import React, { useState, useEffect } from 'react';
import { FiEdit2, FiSave, FiClock, FiMapPin, FiPhone, FiMail, FiGlobe, FiInstagram, FiYoutube, FiFacebook } from 'react-icons/fi';

const WebsiteDetails = () => {
  // Sample website details data
  const [websiteDetails, setWebsiteDetails] = useState({
    websiteName: "HealthPlus Clinic",
    logo: "https://res.cloudinary.com/dxrkd5stc/image/upload/v1750328933/clinic%20management/website%20logo/amjjm79ltfzwel1az1st.png",
    location: "123 Medical Drive, Health City, HC 12345",
    phone: "+1 (555) 123-4567",
    email: "info@healthplusclinic.com",
    openingHours: "Mon-Fri: 8:00 AM - 6:00 PM\nSat: 9:00 AM - 2:00 PM\nSun: Closed",
    instagram: "healthplusclinic",
    youtube: "healthplusclinic",
    facebook: "healthplusclinic",
    cloudinary_id: "clinic management/website logo/amjjm79ltfzwel1az1st"
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ ...websiteDetails });
  const [logoPreview, setLogoPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({ ...prev, [name]: value }));
  };

  // Handle logo upload
  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // In a real app, you would upload to Cloudinary here
      const previewURL = URL.createObjectURL(file);
      setLogoPreview(previewURL);
      setEditForm(prev => ({ ...prev, logo: previewURL }));
    }
  };

  // Save changes
  const saveChanges = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setWebsiteDetails(editForm);
      setIsEditing(false);
      setLogoPreview(null);
      setIsLoading(false);
      alert("Website details updated successfully!");
    }, 1500);
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditForm(websiteDetails);
    setLogoPreview(null);
    setIsEditing(false);
  };

  return (
    <div className="p-4  mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Website Details</h1>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2"
          >
            <FiEdit2 /> Edit Details
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={cancelEdit}
              className="px-4 py-2 border rounded text-gray-700"
            >
              Cancel
            </button>
            <button
              onClick={saveChanges}
              className="px-4 py-2 bg-blue-600 text-white rounded flex items-center gap-2"
              disabled={isLoading}
            >
              {isLoading ? 'Saving...' : (
                <>
                  <FiSave /> Save Changes
                </>
              )}
            </button>
          </div>
        )}
      </div>

      <div className="bg-white border rounded-lg p-6">
        {isEditing ? (
          // Edit Mode
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Website Name *</label>
                <input
                  type="text"
                  name="websiteName"
                  value={editForm.websiteName}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Logo</label>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-gray-100 overflow-hidden">
                    <img 
                      src={logoPreview || editForm.logo} 
                      alt="Logo preview" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    className="text-sm text-gray-500"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location *</label>
              <input
                type="text"
                name="location"
                value={editForm.location}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone *</label>
                <input
                  type="text"
                  name="phone"
                  value={editForm.phone}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={editForm.email}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Opening Hours *</label>
              <textarea
                name="openingHours"
                value={editForm.openingHours}
                onChange={handleInputChange}
                rows="3"
                className="w-full p-2 border rounded"
                placeholder="Enter opening hours, one per line"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Instagram</label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                    @
                  </span>
                  <input
                    type="text"
                    name="instagram"
                    value={editForm.instagram}
                    onChange={handleInputChange}
                    className="flex-1 p-2 border rounded-r"
                    placeholder="username"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">YouTube</label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                    @
                  </span>
                  <input
                    type="text"
                    name="youtube"
                    value={editForm.youtube}
                    onChange={handleInputChange}
                    className="flex-1 p-2 border rounded-r"
                    placeholder="username"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Facebook</label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                    @
                  </span>
                  <input
                    type="text"
                    name="facebook"
                    value={editForm.facebook}
                    onChange={handleInputChange}
                    className="flex-1 p-2 border rounded-r"
                    placeholder="username"
                  />
                </div>
              </div>
            </div>
          </div>
        ) : (
          // View Mode
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-24 h-24 rounded-full bg-gray-100 overflow-hidden">
                <img 
                  src={websiteDetails.logo} 
                  alt="Website logo" 
                  className="w-full h-full object-contain"
                />
              </div>
              <h2 className="text-2xl font-bold text-center md:text-left">
                {websiteDetails.websiteName}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <FiMapPin className="text-gray-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-gray-700">Location</h3>
                    <p className="text-gray-600">{websiteDetails.location}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <FiPhone className="text-gray-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-gray-700">Phone</h3>
                    <p className="text-gray-600">{websiteDetails.phone}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <FiMail className="text-gray-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-gray-700">Email</h3>
                    <p className="text-gray-600">{websiteDetails.email}</p>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-start gap-3 mb-4">
                  <FiClock className="text-gray-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-gray-700">Opening Hours</h3>
                    <div className="text-gray-600 whitespace-pre-line">
                      {websiteDetails.openingHours}
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 mt-6">
                  {websiteDetails.instagram && (
                    <a 
                      href={`https://instagram.com/${websiteDetails.instagram}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-pink-600 hover:text-pink-700"
                      title="Instagram"
                    >
                      <FiInstagram size={20} />
                    </a>
                  )}
                  {websiteDetails.youtube && (
                    <a 
                      href={`https://youtube.com/${websiteDetails.youtube}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-red-600 hover:text-red-700"
                      title="YouTube"
                    >
                      <FiYoutube size={20} />
                    </a>
                  )}
                  {websiteDetails.facebook && (
                    <a 
                      href={`https://facebook.com/${websiteDetails.facebook}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700"
                      title="Facebook"
                    >
                      <FiFacebook size={20} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WebsiteDetails;