import React, { useEffect, useState } from 'react';
import { getAnalysis } from '../api';

const Report = () => {
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

  if (loading) return <div>Loading report...</div>;
  if (!data) return <div>No data available. Please enter records or load sample data.</div>;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div style={{ background: '#fff', color: '#000', padding: '3rem', borderRadius: '8px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ color: '#000' }}>Mathematical Analysis Report</h1>
        <button onClick={handlePrint} className="btn btn-primary" style={{ display: 'none' /* Will manage print via CSS media query typically, but inline for now */ }}>Print Report</button>
      </div>

      <div className="report-section">
        <h2>1. Introduction</h2>
        <p className="report-text">
          This report presents a mathematical and statistical analysis of the relationship between daily social media usage and productivity. The objective is to apply descriptive statistics, correlation, and regression techniques to a dataset of {data.n} days to identify patterns and mathematical associations.
        </p>
      </div>

      <div className="report-section">
        <h2>2. Dataset Summary & Descriptive Statistics</h2>
        <table style={{ width: '100%', marginBottom: '1rem', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ background: '#f0f0f0', color: '#000', border: '1px solid #ccc' }}>Metric</th>
              <th style={{ background: '#f0f0f0', color: '#000', border: '1px solid #ccc' }}>Mean (x̄)</th>
              <th style={{ background: '#f0f0f0', color: '#000', border: '1px solid #ccc' }}>Median</th>
              <th style={{ background: '#f0f0f0', color: '#000', border: '1px solid #ccc' }}>Mode</th>
              <th style={{ background: '#f0f0f0', color: '#000', border: '1px solid #ccc' }}>Range</th>
              <th style={{ background: '#f0f0f0', color: '#000', border: '1px solid #ccc' }}>Variance (σ²)</th>
              <th style={{ background: '#f0f0f0', color: '#000', border: '1px solid #ccc' }}>Std Dev (σ)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>Social Media (hrs)</td>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>{data.mean.social_media_hours.toFixed(2)}</td>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>{data.median.social_media_hours.toFixed(2)}</td>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>{data.mode.social_media_hours.toFixed(2)}</td>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>{data.range.social_media_hours.toFixed(2)}</td>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>{data.variance.social_media_hours.toFixed(3)}</td>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>{data.standard_deviation.social_media_hours.toFixed(3)}</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>Productivity Score</td>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>{data.mean.calculated_productivity_score.toFixed(2)}</td>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>{data.median.calculated_productivity_score.toFixed(2)}</td>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>{data.mode.calculated_productivity_score.toFixed(2)}</td>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>{data.range.calculated_productivity_score.toFixed(2)}</td>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>{data.variance.calculated_productivity_score.toFixed(3)}</td>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>{data.standard_deviation.calculated_productivity_score.toFixed(3)}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="report-section">
        <h2>3. Correlation Analysis</h2>
        <p className="report-text">
          The Pearson correlation coefficient (r) was calculated to determine the strength and direction of the linear relationship between social media usage and productivity score.
          <br/><br/>
          <strong>Formula:</strong> r = Σ[(x - x̄)(y - ȳ)] / √[Σ(x - x̄)² × Σ(y - ȳ)²]
          <br/><br/>
          <strong>Result:</strong> r = {data.correlation.sm_vs_prod?.toFixed(4) || 'N/A'}
          <br/><br/>
          <strong>Interpretation:</strong> This mathematical correlation suggests an association between the variables. 
          {data.correlation.sm_vs_prod < 0 ? " The negative value indicates an inverse relationship (as one increases, the other tends to decrease)." : ""}
        </p>
      </div>

      <div className="report-section">
        <h2>4. Linear Regression Analysis</h2>
        <p className="report-text">
          A simple linear regression model (y = a + bx) was fitted to the data, where X is Social Media Usage and Y is Productivity Score.
          <br/><br/>
          <strong>Slope (b):</strong> {data.regression.slope.toFixed(4)} <br/>
          <strong>Intercept (a):</strong> {data.regression.intercept.toFixed(4)} <br/>
          <strong>Equation:</strong> y = {data.regression.intercept.toFixed(2)} + ({data.regression.slope.toFixed(2)})x <br/>
          <strong>R² Value:</strong> {data.regression.r_squared.toFixed(4)}
          <br/><br/>
          <strong>Interpretation:</strong> The slope indicates that a 1-hour increase in social media usage is mathematically associated with a {data.regression.slope.toFixed(2)} point change in productivity. The R² value shows that {(data.regression.r_squared * 100).toFixed(1)}% of the variance in productivity can be explained by this linear model.
        </p>
      </div>

      <div className="report-section">
        <h2>5. Usage-Category Comparison</h2>
        <table style={{ width: '100%', marginBottom: '1rem', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ background: '#f0f0f0', color: '#000', border: '1px solid #ccc' }}>Category</th>
              <th style={{ background: '#f0f0f0', color: '#000', border: '1px solid #ccc' }}>Count (days)</th>
              <th style={{ background: '#f0f0f0', color: '#000', border: '1px solid #ccc' }}>Avg SM (hrs)</th>
              <th style={{ background: '#f0f0f0', color: '#000', border: '1px solid #ccc' }}>Avg Productivity</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>Low (&lt; 2 hrs)</td>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>{data.categories.low.count}</td>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>{data.categories.low.avg_sm.toFixed(2)}</td>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>{data.categories.low.avg_prod.toFixed(2)}</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>Moderate (2-4 hrs)</td>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>{data.categories.moderate.count}</td>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>{data.categories.moderate.avg_sm.toFixed(2)}</td>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>{data.categories.moderate.avg_prod.toFixed(2)}</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>High (&gt; 4 hrs)</td>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>{data.categories.high.count}</td>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>{data.categories.high.avg_sm.toFixed(2)}</td>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>{data.categories.high.avg_prod.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="report-section">
        <h2>6. Findings & Conclusion</h2>
        <p className="report-text">
          Based on the mathematical and statistical techniques applied to the dataset:
        </p>
        <ul style={{ paddingLeft: '20px', marginBottom: '1rem', lineHeight: '1.7' }}>
          <li>The mean productivity score was {data.mean.calculated_productivity_score.toFixed(2)}, with a standard deviation of {data.standard_deviation.calculated_productivity_score.toFixed(2)}.</li>
          <li>The correlation coefficient of {data.correlation.sm_vs_prod?.toFixed(4)} indicates the strength and direction of the linear association between social media usage and productivity.</li>
          <li>The linear regression model (y = {data.regression.intercept.toFixed(2)} + {data.regression.slope.toFixed(2)}x) provides a predictive equation where the slope (b) represents the estimated rate of change.</li>
          <li>Comparative categorical analysis confirms mathematical differences in average productivity among low, moderate, and high usage segments.</li>
        </ul>
        <p className="report-text">
          <strong>Conclusion:</strong> The statistical evidence suggests an association between the variables studied. While this mathematical relationship is quantifiable and modelable via linear regression, it does not strictly prove causation.
        </p>
      </div>
    </div>
  );
};

export default Report;
