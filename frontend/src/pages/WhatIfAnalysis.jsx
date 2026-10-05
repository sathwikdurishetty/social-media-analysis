import React, { useEffect, useState } from 'react';
import { getAnalysis } from '../api';

const WhatIfAnalysis = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentUsage, setCurrentUsage] = useState(5);
  const [hypotheticalUsage, setHypotheticalUsage] = useState(3);

  useEffect(() => {
    getAnalysis().then(res => {
      setData(res.data);
      setLoading(false);
    }).catch(err => {
      console.error(err);
      setLoading(false);
    });
  }, []);

  if (loading) return <div>Loading analysis...</div>;
  if (!data || !data.regression) return <div>No data available. Please enter records or load sample data.</div>;

  const a = data.regression.intercept;
  const b = data.regression.slope;

  const currentEst = a + (b * currentUsage);
  const newEst = a + (b * hypotheticalUsage);
  const diff = newEst - currentEst;
  const percentChange = (diff / currentEst) * 100;

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">What-If Analysis (Predictive Modeling)</h1>
        <p className="page-description">Use the regression model to estimate productivity changes.</p>
      </div>

      <div className="card">
        <h2>Linear Regression Model</h2>
        <div className="math-formula">
          Estimated Productivity = {a.toFixed(2)} + ({b.toFixed(2)} × Social Media Hours)
        </div>

        <div className="grid grid-cols-2" style={{marginTop: '2rem'}}>
          <div className="form-group">
            <label className="form-label">Current Usage (hours)</label>
            <input 
              type="number" 
              className="form-input" 
              value={currentUsage}
              onChange={(e) => setCurrentUsage(Number(e.target.value))}
              min="0"
              step="0.5"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Hypothetical Usage (hours)</label>
            <input 
              type="number" 
              className="form-input" 
              value={hypotheticalUsage}
              onChange={(e) => setHypotheticalUsage(Number(e.target.value))}
              min="0"
              step="0.5"
            />
          </div>
        </div>

        <div className="grid grid-cols-4" style={{marginTop: '1.5rem'}}>
          <div className="card" style={{background: 'rgba(0,0,0,0.2)', border: 'none'}}>
            <div className="stat-title">Current Estimate</div>
            <div className="stat-value" style={{color: 'var(--text-muted)'}}>{currentEst.toFixed(1)}</div>
          </div>
          <div className="card" style={{background: 'rgba(0,0,0,0.2)', border: 'none'}}>
            <div className="stat-title">New Estimate</div>
            <div className="stat-value" style={{color: 'var(--primary)'}}>{newEst.toFixed(1)}</div>
          </div>
          <div className="card" style={{background: 'rgba(0,0,0,0.2)', border: 'none'}}>
            <div className="stat-title">Estimated Change</div>
            <div className="stat-value" style={{color: diff >= 0 ? 'var(--accent)' : 'var(--danger)'}}>
              {diff > 0 ? '+' : ''}{diff.toFixed(1)}
            </div>
          </div>
          <div className="card" style={{background: 'rgba(0,0,0,0.2)', border: 'none'}}>
            <div className="stat-title">Percentage Change</div>
            <div className="stat-value" style={{color: percentChange >= 0 ? 'var(--accent)' : 'var(--danger)'}}>
              {percentChange > 0 ? '+' : ''}{percentChange.toFixed(1)}%
            </div>
          </div>
        </div>

        <p className="math-interpretation" style={{marginTop: '1.5rem'}}>
          <strong>Important Note:</strong> This is an ESTIMATE based solely on the mathematical regression model derived from historical data. It does not guarantee future results and assumes a linear relationship holds true.
        </p>
      </div>
    </div>
  );
};

export default WhatIfAnalysis;
