# Social Media Usage & Productivity Analysis

This is a full-stack mathematical and statistical analysis web application built to analyze whether increased social media usage is associated with lower productivity.

## Project Type
Mathematics / Statistical Analysis

## Tech Stack
- **Frontend**: React, Vite, Recharts, modern responsive CSS
- **Backend**: Python, Flask, Pandas, SciPy, NumPy
- **Database**: SQLite

## Folder Structure
- `/frontend`: React application containing the UI, charts, and API client.
- `/backend`: Python Flask application providing REST APIs and mathematical calculations (Mean, Median, Mode, Variance, Correlation, Regression).

## Setup Instructions

### Prerequisites
- Node.js & npm
- Python 3.8+

### 1. Setup Backend
1. Open a terminal and navigate to the `backend` folder:
   ```bash
   cd backend
   ```
2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   # On Windows:
   venv\Scripts\activate
   # On macOS/Linux:
   source venv/bin/activate
   ```
3. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Run the Flask server:
   ```bash
   python app.py
   ```
   *The server will start on http://localhost:5000*

### 2. Setup Frontend
1. Open a new terminal and navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```
2. Install npm dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
   *The application will open in your browser, typically at http://localhost:5173*

## Demo Workflow
1. Click **"Load Sample Data"** on the bottom left of the sidebar.
2. Go to **"Math Analysis"** to see mean, median, standard deviation, and productivity formulas.
3. Check **"Correlation & Reg."** to view the Pearson correlation coefficient and linear regression.
4. Explore the visual **"Charts"**.
5. Test the predictive model using **"What-If Analysis"**.
6. Generate and view the final mathematical **"Report"**.
