import React, { useEffect, useState } from 'react';
import { getRecords, deleteRecord } from '../api';

const Dataset = () => {
  const [records, setRecords] = useState([]);

  const fetchRecords = () => {
    getRecords().then(res => setRecords(res.data)).catch(console.error);
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  const handleDelete = async (id) => {
    if(window.confirm('Delete this record?')) {
      await deleteRecord(id);
      fetchRecords();
    }
  };

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Dataset View</h1>
        <p className="page-description">Raw mathematical dataset for daily records.</p>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>SM Hrs</th>
              <th>Study Hrs</th>
              <th>Sleep Hrs</th>
              <th>Tasks Pl/Co</th>
              <th>Task %</th>
              <th>Rating</th>
              <th>Calc Score</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {records.map(r => (
              <tr key={r.id}>
                <td>{r.date}</td>
                <td>{r.social_media_hours.toFixed(1)}</td>
                <td>{r.study_work_hours.toFixed(1)}</td>
                <td>{r.sleep_hours.toFixed(1)}</td>
                <td>{r.tasks_planned} / {r.tasks_completed}</td>
                <td>{r.task_completion_pct.toFixed(1)}%</td>
                <td>{r.productivity_rating}</td>
                <td style={{ fontWeight: 'bold', color: 'var(--primary)' }}>{r.calculated_productivity_score.toFixed(1)}</td>
                <td>
                  <button className="btn btn-danger" style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }} onClick={() => handleDelete(r.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dataset;
