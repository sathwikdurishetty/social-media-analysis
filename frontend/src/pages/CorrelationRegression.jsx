import React, { useEffect, useState } from 'react';
import { getAnalysis } from '../api';
import {
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine
} from 'recharts';

const CorrelationRegression = () => {
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

  if (loading) return <div>Loading analysis...</div>;
  if (!data || !data.correlation) return <div>No data available. Please enter records or load sample data.</div>;

  const r = data.correlation.sm_vs_prod;
  let correlationInterpretation = "";
  if (r > 0.7) correlationInterpretation = "Strong positive relationship.";
  else if (r > 0.3) correlationInterpretation = "Moderate positive relationship.";
  else if (r > -0.3) correlationInterpretation = "Weak or no linear relationship.";
  else if (r > -0.7) correlationInterpretation = "Moderate negative relationship.";
  else correlationInterpretation = "Strong negative relationship.";

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Correlation & Regression Analysis</h1>
        <p className="page-description">Examining the mathematical relationship between variables.</p>
      </div>

      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <h2>1. Pearson Correlation Coefficient (r)</h2>
        <p style={{marginBottom: '1rem', color: 'var(--text-muted)'}}>
          Measures the linear correlation between two variables, X (Social Media Usage) and Y (Productivity Score).
        </p>
        
        <div className="math-block">
          <strong>Formula:</strong>
          <div className="math-formula">
            r = Σ[(x - x̄)(y - ȳ)] / √[Σ(x - x̄)² × Σ(y - ȳ)²]
          </div>
          <strong>Calculation:</strong>
          <div className="math-interpretation">
            <strong>r = {r.toFixed(4)}</strong>
          </div>
        </div>
        <p className="math-interpretation">
          <strong>Interpretation:</strong> {correlationInterpretation} <br/>
          <em>Note: The data suggests an association between the variables. This mathematical correlation does not prove causation.</em>
        </p>
      </div>

      <div className="card">
        <h2>2. Simple Linear Regression</h2>
        <p style={{marginBottom: '1rem', color: 'var(--text-muted)'}}>
          Models the relationship between a dependent variable Y and an independent variable X.
        </p>

        <div className="math-block">
          <strong>Formula:</strong>
          <div className="math-formula">
            ŷ = a + bx
          </div>
          <strong>Calculation:</strong>
          <div className="math-interpretation">
            Slope (b) = {data.regression.slope.toFixed(4)}<br/>
            Intercept (a) = {data.regression.intercept.toFixed(4)}<br/>
            R² (Coefficient of Determination) = {data.regression.r_squared.toFixed(4)}<br/><br/>
            <strong>Equation: y = {data.regression.intercept.toFixed(2)} + ({data.regression.slope.toFixed(2)})x</strong>
          </div>
        </div>
        <p className="math-interpretation">
          <strong>Interpretation:</strong> <br/>
          The slope (b = {data.regression.slope.toFixed(2)}) means that for every 1-hour increase in social media usage, the productivity score is estimated to change by {data.regression.slope.toFixed(2)} points. <br/>
          The R² value ({data.regression.r_squared.toFixed(4)}) indicates that {(data.regression.r_squared * 100).toFixed(1)}% of the variance in the productivity score can be explained by social media usage.
        </p>
      </div>
    </div>
  );
};

export default CorrelationRegression;
