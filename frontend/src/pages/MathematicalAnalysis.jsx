import React, { useEffect, useState } from 'react';
import { getAnalysis } from '../api';

const MathematicalAnalysis = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAnalysis().then(res => {
      setData(res.data);
      setLoading(false);
    }).catch(err => {
      console.error(err);
      setLoading(false);
    });
  }, []);

  if (loading) return <div>Loading math analysis...</div>;
  if (!data) return <div>No data available. Please enter records or load sample data.</div>;

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Mathematical & Statistical Analysis</h1>
        <p className="page-description">Descriptive statistics calculated from the daily dataset.</p>
      </div>

      <div className="grid grid-cols-2">
        <div className="card">
          <h2>1. Mean (Average)</h2>
          <div className="math-block">
            <strong>Formula:</strong>
            <div className="math-formula">x̄ = Σx / n</div>
            <strong>Calculation:</strong>
            <div className="math-interpretation">
              x̄ = Total Social Media Hours / {data.n} days<br/>
              <strong>Result: {data.mean.social_media_hours.toFixed(2)} hours/day</strong>
            </div>
          </div>
          <p className="math-interpretation">
            <strong>Interpretation:</strong> The average social media usage across the entire dataset is {data.mean.social_media_hours.toFixed(2)} hours per day.
          </p>
        </div>

        <div className="card">
          <h2>2. Median</h2>
          <div className="math-block">
            <strong>Formula:</strong>
            <div className="math-formula">Median = Middle value of ordered dataset</div>
            <strong>Calculation:</strong>
            <div className="math-interpretation">
              Ordered SM hours, picking middle index.<br/>
              <strong>Result: {data.median.social_media_hours.toFixed(2)} hours/day</strong>
            </div>
          </div>
          <p className="math-interpretation">
            <strong>Interpretation:</strong> The median represents the middle value. 50% of the days had social media usage below {data.median.social_media_hours.toFixed(2)} hours, and 50% had usage above it. It is less affected by outliers than the mean.
          </p>
        </div>

        <div className="card">
          <h2>3. Mode</h2>
          <div className="math-block">
            <strong>Formula:</strong>
            <div className="math-formula">Mode = Most frequent value</div>
            <strong>Calculation:</strong>
            <div className="math-interpretation">
              <strong>Result: {data.mode.social_media_hours.toFixed(2)} hours/day</strong>
            </div>
          </div>
          <p className="math-interpretation">
            <strong>Interpretation:</strong> The mode is the most commonly occurring social media usage duration in the dataset.
          </p>
        </div>

        <div className="card">
          <h2>4. Range</h2>
          <div className="math-block">
            <strong>Formula:</strong>
            <div className="math-formula">Range = Maximum - Minimum</div>
            <strong>Calculation:</strong>
            <div className="math-interpretation">
              <strong>Result: {data.range.social_media_hours.toFixed(2)} hours</strong>
            </div>
          </div>
          <p className="math-interpretation">
            <strong>Interpretation:</strong> The difference between the highest and lowest social media usage in the dataset is {data.range.social_media_hours.toFixed(2)} hours, indicating the spread of extremes.
          </p>
        </div>

        <div className="card">
          <h2>5. Population Variance</h2>
          <div className="math-block">
            <strong>Formula:</strong>
            <div className="math-formula">σ² = Σ(x - x̄)² / n</div>
            <strong>Calculation:</strong>
            <div className="math-interpretation">
              Using Population Variance (dividing by n, not n-1).<br/>
              <strong>Result: {data.variance.social_media_hours.toFixed(3)}</strong>
            </div>
          </div>
          <p className="math-interpretation">
            <strong>Interpretation:</strong> The variance measures the average degree to which each day's usage differs from the mean. A higher variance indicates wider data spread.
          </p>
        </div>

        <div className="card">
          <h2>6. Standard Deviation</h2>
          <div className="math-block">
            <strong>Formula:</strong>
            <div className="math-formula">σ = √Variance</div>
            <strong>Calculation:</strong>
            <div className="math-interpretation">
              σ = √{data.variance.social_media_hours.toFixed(3)}<br/>
              <strong>Result: {data.standard_deviation.social_media_hours.toFixed(3)} hours</strong>
            </div>
          </div>
          <p className="math-interpretation">
            <strong>Interpretation:</strong> Standard deviation is the square root of variance. It shows that on a typical day, social media usage deviates from the mean by about {data.standard_deviation.social_media_hours.toFixed(2)} hours.
          </p>
        </div>

      </div>

      <div className="card" style={{ marginTop: '1.5rem' }}>
        <h2>7. Productivity Score Calculation</h2>
        <div className="math-block">
          <strong>Formula:</strong>
          <div className="math-formula">
            Score = (0.40 × Task %) + (0.30 × Study Score) + (0.20 × Sleep Score) + (0.10 × Exercise Score)
          </div>
          <strong>Calculation (Average Values):</strong>
          <div className="math-interpretation">
            Task % (Avg) = {(data.mean.calculated_productivity_score * 0.4).toFixed(1)} (weighted approx)<br/>
            <strong>Average Productivity Score: {data.mean.calculated_productivity_score.toFixed(2)}%</strong>
          </div>
        </div>
        <p className="math-interpretation">
          <strong>Interpretation:</strong> The productivity score mathematically combines different lifestyle factors, normalizing them to a 100-point scale and applying respective weights to represent overall daily effectiveness.
        </p>
      </div>

    </div>
  );
};

export default MathematicalAnalysis;
