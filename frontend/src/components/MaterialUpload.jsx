import React, { useState } from 'react';
import axios from 'axios';
import '../styles/materials.css';

const MaterialUpload = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        branch: '',
        semester: '',
        file: null
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        setFormData(prev => ({
            ...prev,
            file: e.target.files[0]
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const data = new FormData();
        data.append('title', formData.title);
        data.append('description', formData.description);
        data.append('branch', formData.branch);
        data.append('semester', formData.semester);
        data.append('file', formData.file);

        try {
            await axios.post('/api/materials/upload', data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setFormData({
                title: '',
                description: '',
                branch: '',
                semester: '',
                file: null
            });
            alert('Material uploaded successfully!');
        } catch (error) {
            setError(error.response?.data?.error || 'Failed to upload material');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-4 materials-container">
            <h2 style={{color:'white', fontWeight:'bold', textAlign:'center'}}>Upload Study Material</h2>
            {error && <div className="text-red-500 mb-4">{error}</div>}
            <form onSubmit={handleSubmit} className="space-y-4 upload-form">
                <div className="form-group">
                    <label className="form-label block mb-2">Title:</label>
                    <input
                        type="text"
                        name="title"
                        placeholder='Title of the Material'
                        value={formData.title}
                        onChange={handleInputChange}
                        required
                        className="form-input w-full p-2 border rounded"
                    />
                </div>
                <div className="form-group">
                    <label className="form-label block mb-2">Description:</label>
                    <textarea
                        name="description"
                        placeholder='Description of the Material'
                        value={formData.description}
                        onChange={handleInputChange}
                        required
                        className="form-input w-full p-2 border rounded"
                    />
                </div>
                <div className="form-group">
                    <label className="form-label block mb-2">Branch:</label>
                    <select
                        name="branch"
                        value={formData.branch}
                        onChange={handleInputChange}
                        required
                        className="form-input w-full p-2 border rounded"
                    >
                        <option value="">Select Branch</option>
                        <option value="CSE">CSE</option>
                        <option value="ECE">ECE</option>
                        <option value="EEE">EEE</option>
                        <option value="CIVIL">CIVIL</option>
                        <option value="MECH">MECH</option>
                    </select>
                </div>
                <div className="form-group">
                    <label className="form-label block mb-2">Semester:</label>
                    <select
                        name="semester"
                        value={formData.semester}
                        onChange={handleInputChange}
                        required
                        className="form-input w-full p-2 border rounded"
                    >
                        <option value="">Select Semester</option>
                        <option value="1-1">1-1</option>
                        <option value="1-2">1-2</option>
                        <option value="2-1">2-1</option>
                        <option value="2-2">2-2</option>
                        <option value="3-1">3-1</option>
                        <option value="3-2">3-2</option>
                        <option value="4-1">4-1</option>
                        <option value="4-2">4-2</option>
                    </select>
                </div>
                <div className="form-group">
                    <label className="form-label block mb-2">File:</label>
                    <input
                        type="file"
                        onChange={handleFileChange}
                        required
                        className="form-input w-full p-2 border rounded"
                        accept=".pdf,.doc,.docx,.ppt,.pptx"
                    />
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
                >
                    {loading ? 'Uploading...' : 'Upload Material'}
                </button>
            </form>
        </div>
    );
};

export default MaterialUpload;