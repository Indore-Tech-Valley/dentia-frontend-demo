import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FiEdit2, FiSave, FiClock, FiMapPin, FiPhone, FiMail, FiInstagram, FiYoutube, FiFacebook } from 'react-icons/fi';
import { fetchWebsiteDetails, updateWebsiteDetails } from '../../../redux/features/websiteSlice/websiteSlice';

const WebsiteDetails = () => {
  const dispatch = useDispatch();
  const { details, loading } = useSelector((state) => state.website);

  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({});
  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);

  useEffect(() => {
    dispatch(fetchWebsiteDetails());
  }, [dispatch]);

  useEffect(() => {
    if (details) {
      setEditForm(details);
    }
  }, [details]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewURL = URL.createObjectURL(file);
      setLogoFile(file);
      setLogoPreview(previewURL);
    }
  };

  const saveChanges = async () => {
    if (!details?._id) return;
    const formData = new FormData();
    Object.keys(editForm).forEach((key) => {
      if (key !== 'logo') formData.append(key, editForm[key]);
    });
    if (logoFile) formData.append('logo', logoFile);
    // console.log(formData)
    await dispatch(updateWebsiteDetails({ id: details._id, formData }));
    setIsEditing(false);
    setLogoPreview(null);
    setLogoFile(null);
    dispatch(fetchWebsiteDetails())
  };

  const cancelEdit = () => {
    setEditForm(details);
    setIsEditing(false);
    setLogoPreview(null);
    setLogoFile(null);
  };

  return (
    <div className="p-4 mx-auto">
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
              disabled={loading}
            >
              {loading ? 'Saving...' : (<><FiSave /> Save Changes</>)}
            </button>
          </div>
        )}
      </div>

      <div className="bg-white border rounded-lg p-6">
        {isEditing ? (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Website Name *</label>
                <input
                  type="text"
                  name="websiteName"
                  value={editForm?.websiteName || ''}
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
                      src={logoPreview || editForm?.logo}
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
                value={editForm?.location || ''}
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
                  value={editForm?.phone || ''}
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
                  value={editForm?.email || ''}
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
                value={editForm?.openingHours || ''}
                onChange={handleInputChange}
                rows="3"
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {['instagram', 'youtube', 'facebook'].map((platform) => (
                <div key={platform}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{platform.charAt(0).toUpperCase() + platform.slice(1)}</label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                      @
                    </span>
                    <input
                      type="text"
                      name={platform}
                      value={editForm?.[platform] || ''}
                      onChange={handleInputChange}
                      className="flex-1 p-2 border rounded-r"
                      placeholder="username"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-24 h-24 rounded-full bg-gray-100 overflow-hidden">
                <img
                  src={details?.logo}
                  alt="Website logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <h2 className="text-2xl font-bold text-center md:text-left">
                {details?.websiteName}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                {[{ icon: FiMapPin, label: 'Location', value: details?.location },
                  { icon: FiPhone, label: 'Phone', value: details?.phone },
                  { icon: FiMail, label: 'Email', value: details?.email }].map(({ icon: Icon, label, value }) => (
                    <div key={label} className="flex items-start gap-3">
                      <Icon className="text-gray-500 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-medium text-gray-700">{label}</h3>
                        <p className="text-gray-600">{value}</p>
                      </div>
                    </div>
                ))}
              </div>

              <div>
                <div className="flex items-start gap-3 mb-4">
                  <FiClock className="text-gray-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-gray-700">Opening Hours</h3>
                    <div className="text-gray-600 whitespace-pre-line">
                      {details?.openingHours}
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 mt-6">
                  {details?.instagram && (
                    <a
                      href={`https://instagram.com/${details.instagram}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-pink-600 hover:text-pink-700"
                    >
                      <FiInstagram size={20} />
                    </a>
                  )}
                  {details?.youtube && (
                    <a
                      href={`https://youtube.com/${details.youtube}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-red-600 hover:text-red-700"
                    >
                      <FiYoutube size={20} />
                    </a>
                  )}
                  {details?.facebook && (
                    <a
                      href={`https://facebook.com/${details.facebook}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700"
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
