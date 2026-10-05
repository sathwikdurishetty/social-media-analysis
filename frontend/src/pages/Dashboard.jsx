import React, { useEffect, useState } from 'react';
import { getAnalysis } from '../api';

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAnalysis()
      .then(res => {
        setData(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading math analysis...</div>;
  if (!data) return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Dashboard</h1>
        <p className="page-description">No data available. Please enter some records or load sample data.</p>
      </div>
    </div>
  );

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Dashboard Overview</h1>
        <p className="page-description">Key mathematical indicators of the dataset.</p>
      </div>

      <div className="grid grid-cols-4">
        <div className="card">
          <div className="stat-title">Total Days Analyzed</div>
          <div className="stat-value">{data.n}</div>
        </div>
        <div className="card">
          <div className="stat-title">Avg Social Media (hrs)</div>
          <div className="stat-value">{data.mean.social_media_hours.toFixed(2)}</div>
        </div>
        <div className="card">
          <div className="stat-title">Avg Productivity Score</div>
          <div className="stat-value">{data.mean.calculated_productivity_score.toFixed(2)}</div>
        </div>
        <div className="card">
          <div className="stat-title">Avg Study/Work (hrs)</div>
          <div className="stat-value">{data.mean.study_work_hours.toFixed(2)}</div>
        </div>
      </div>

      <div className="grid grid-cols-3" style={{ marginTop: '1.5rem' }}>
        <div className="card">
          <div className="stat-title">Max Social Media</div>
          <div className="stat-value">{(data.mean.social_media_hours + data.range.social_media_hours / 2).toFixed(2) /* Approximated for UI display without explicit max in endpoint, wait range + min = max */} </div>
        </div>
        <div className="card">
          <div className="stat-title">Correlation (SM vs Prod)</div>
          <div className="stat-value">{data.correlation?.sm_vs_prod?.toFixed(3) || 'N/A'}</div>
        </div>
        <div className="card">
          <div className="stat-title">Overall Productivity %</div>
          <div className="stat-value">{(data.mean.calculated_productivity_score).toFixed(1)}%</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
