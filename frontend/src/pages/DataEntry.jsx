import React, { useState } from 'react';
import { addRecord } from '../api';
import { useNavigate } from 'react-router-dom';

const DataEntry = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    social_media_hours: '',
    instagram_hours: '',
    youtube_hours: '',
    whatsapp_hours: '',
    other_social_media_hours: '',
    study_work_hours: '',
    sleep_hours: '',
    exercise_hours: '',
    tasks_planned: '',
    tasks_completed: '',
    productivity_rating: ''
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      social_media_hours: Number(formData.social_media_hours),
      instagram_hours: Number(formData.instagram_hours),
      youtube_hours: Number(formData.youtube_hours),
      whatsapp_hours: Number(formData.whatsapp_hours),
      other_social_media_hours: Number(formData.other_social_media_hours),
      study_work_hours: Number(formData.study_work_hours),
      sleep_hours: Number(formData.sleep_hours),
      exercise_hours: Number(formData.exercise_hours),
      tasks_planned: Number(formData.tasks_planned),
      tasks_completed: Number(formData.tasks_completed),
      productivity_rating: Number(formData.productivity_rating),
    };
    
    try {
      await addRecord(payload);
      alert('Record saved successfully!');
      navigate('/dataset');
    } catch (err) {
      console.error(err);
      alert('Failed to save record.');
    }
  };

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Data Entry</h1>
        <p className="page-description">Enter daily data for mathematical analysis.</p>
      </div>

      <div className="card" style={{ maxWidth: '800px' }}>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2">
            <div className="form-group">
              <label className="form-label">Date</label>
              <input type="date" name="date" className="form-input" value={formData.date} onChange={handleChange} required />
            </div>
            
            <div className="form-group">
              <label className="form-label">Total Social Media (hrs)</label>
              <input type="number" step="0.1" min="0" name="social_media_hours" className="form-input" value={formData.social_media_hours} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label className="form-label">Instagram (hrs)</label>
              <input type="number" step="0.1" min="0" name="instagram_hours" className="form-input" value={formData.instagram_hours} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label className="form-label">YouTube (hrs)</label>
              <input type="number" step="0.1" min="0" name="youtube_hours" className="form-input" value={formData.youtube_hours} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label className="form-label">WhatsApp (hrs)</label>
              <input type="number" step="0.1" min="0" name="whatsapp_hours" className="form-input" value={formData.whatsapp_hours} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label className="form-label">Other Social Media (hrs)</label>
              <input type="number" step="0.1" min="0" name="other_social_media_hours" className="form-input" value={formData.other_social_media_hours} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label className="form-label">Study/Work (hrs)</label>
              <input type="number" step="0.1" min="0" name="study_work_hours" className="form-input" value={formData.study_work_hours} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label className="form-label">Sleep (hrs)</label>
              <input type="number" step="0.1" min="0" name="sleep_hours" className="form-input" value={formData.sleep_hours} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label className="form-label">Exercise (hrs)</label>
              <input type="number" step="0.1" min="0" name="exercise_hours" className="form-input" value={formData.exercise_hours} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label className="form-label">Tasks Planned (count)</label>
              <input type="number" min="0" name="tasks_planned" className="form-input" value={formData.tasks_planned} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label className="form-label">Tasks Completed (count)</label>
              <input type="number" min="0" name="tasks_completed" className="form-input" value={formData.tasks_completed} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label className="form-label">Productivity Rating (1-10)</label>
              <input type="number" min="1" max="10" name="productivity_rating" className="form-input" value={formData.productivity_rating} onChange={handleChange} required />
            </div>
          </div>
          
          <div style={{ marginTop: '1rem', textAlign: 'right' }}>
            <button type="submit" className="btn btn-primary">Save Data Point</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DataEntry;
