import React from 'react';

const About = () => {
  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">About Project</h1>
        <p className="page-description">Project Information and Objectives.</p>
      </div>

      <div className="card" style={{ maxWidth: '800px' }}>
        <h2 style={{ color: 'var(--primary)', marginBottom: '1rem' }}>Social Media Usage and Productivity Analysis</h2>
        
        <div style={{ marginBottom: '1.5rem' }}>
          <strong>Project Type:</strong><br/>
          <span style={{ color: 'var(--text-muted)' }}>Mathematics / Statistical Analysis</span>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <strong>Objective:</strong><br/>
          <span style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>
            To mathematically analyze the relationship between social media usage and productivity using descriptive statistics, correlation, regression, percentages, and data visualization. This project demonstrates practical applications of mathematical concepts on real-world datasets, calculating central tendencies, variations, correlation coefficients, and linear regressions to draw statistical conclusions.
          </span>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <strong>Core Mathematical Concepts Applied:</strong>
          <ul style={{ paddingLeft: '20px', marginTop: '0.5rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
            <li>Measures of Central Tendency (Mean, Median, Mode)</li>
            <li>Measures of Dispersion (Range, Variance, Standard Deviation)</li>
            <li>Linear Algebra & Statistics (Pearson Correlation Coefficient)</li>
            <li>Predictive Modeling (Simple Linear Regression)</li>
            <li>Weighted Score Calculation & Normalization</li>
            <li>Percentage Analysis</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;
