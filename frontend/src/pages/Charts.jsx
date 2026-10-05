import React, { useEffect, useState } from 'react';
import { getAnalysis, getRecords } from '../api';
import {
  ScatterChart, Scatter, LineChart, Line, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';

const Charts = () => {
  const [data, setData] = useState(null);
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getAnalysis(), getRecords()])
      .then(([analysisRes, recordsRes]) => {
        setData(analysisRes.data);
        const sorted = recordsRes.data.sort((a,b) => new Date(a.date) - new Date(b.date));
        setRecords(sorted);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading charts...</div>;
  if (!data || records.length === 0) return <div>No data available. Please enter records or load sample data.</div>;

  const platformData = [
    { name: 'Instagram', hours: data.platforms.Instagram },
    { name: 'YouTube', hours: data.platforms.YouTube },
    { name: 'WhatsApp', hours: data.platforms.WhatsApp },
    { name: 'Other', hours: data.platforms.Other }
  ];

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Data Visualizations</h1>
        <p className="page-description">Graphical representations of the dataset.</p>
      </div>

      <div className="grid grid-cols-2">
        <div className="card">
          <h2>1. Social Media Usage Over Time</h2>
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <LineChart data={records}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="date" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none' }} />
                <Line type="monotone" dataKey="social_media_hours" stroke="#3b82f6" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card">
          <h2>2. Productivity Score Over Time</h2>
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <LineChart data={records}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="date" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none' }} />
                <Line type="monotone" dataKey="calculated_productivity_score" stroke="#10b981" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card">
          <h2>3. SM Usage vs Productivity (Scatter)</h2>
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <ScatterChart>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis type="number" dataKey="social_media_hours" name="Social Media (hrs)" stroke="#94a3b8" />
                <YAxis type="number" dataKey="calculated_productivity_score" name="Productivity" stroke="#94a3b8" />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} contentStyle={{ backgroundColor: '#1e293b', border: 'none' }} />
                <Scatter data={records} fill="#8b5cf6" />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card">
          <h2>4. Study Hours vs Productivity (Scatter)</h2>
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <ScatterChart>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis type="number" dataKey="study_work_hours" name="Study (hrs)" stroke="#94a3b8" />
                <YAxis type="number" dataKey="calculated_productivity_score" name="Productivity" stroke="#94a3b8" />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} contentStyle={{ backgroundColor: '#1e293b', border: 'none' }} />
                <Scatter data={records} fill="#3b82f6" />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card">
          <h2>5. Platform Usage Breakdown</h2>
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <BarChart data={platformData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="name" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none' }} />
                <Bar dataKey="hours" fill="#f59e0b" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card">
          <h2>6. Weekly Average Productivity</h2>
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <BarChart data={data.weekly}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="week" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none' }} />
                <Bar dataKey="avg_prod" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Charts;
