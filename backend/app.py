import sqlite3
import pandas as pd
import numpy as np
from scipy import stats
from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime, timedelta
import random

app = Flask(__name__)
CORS(app)

DB_NAME = 'social_media.db'

def get_db_connection():
    conn = sqlite3.connect(DB_NAME)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db_connection()
    conn.execute('''
        CREATE TABLE IF NOT EXISTS daily_records (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            date TEXT UNIQUE,
            social_media_hours REAL,
            instagram_hours REAL,
            youtube_hours REAL,
            whatsapp_hours REAL,
            other_social_media_hours REAL,
            study_work_hours REAL,
            sleep_hours REAL,
            exercise_hours REAL,
            tasks_planned INTEGER,
            tasks_completed INTEGER,
            productivity_rating REAL
        )
    ''')
    conn.commit()
    conn.close()

init_db()

@app.route('/api/records', methods=['GET'])
def get_records():
    conn = get_db_connection()
    records = conn.execute('SELECT * FROM daily_records ORDER BY date DESC').fetchall()
    conn.close()
    
    result = []
    for r in records:
        d = dict(r)
        
        # Calculate derived fields
        task_completion_pct = (d['tasks_completed'] / d['tasks_planned'] * 100) if d['tasks_planned'] > 0 else 0
        study_score = min((d['study_work_hours'] / 8.0) * 100, 100)
        sleep_score = min((d['sleep_hours'] / 8.0) * 100, 100)
        exercise_score = min((d['exercise_hours'] / 1.0) * 100, 100)
        
        productivity_score = (0.40 * task_completion_pct) + (0.30 * study_score) + (0.20 * sleep_score) + (0.10 * exercise_score)
        
        d['task_completion_pct'] = task_completion_pct
        d['calculated_productivity_score'] = productivity_score
        result.append(d)
        
    return jsonify(result)

@app.route('/api/records', methods=['POST'])
def add_record():
    data = request.json
    try:
        conn = get_db_connection()
        conn.execute('''
            INSERT OR REPLACE INTO daily_records (
                date, social_media_hours, instagram_hours, youtube_hours, 
                whatsapp_hours, other_social_media_hours, study_work_hours, 
                sleep_hours, exercise_hours, tasks_planned, tasks_completed, 
                productivity_rating
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', (
            data['date'], data['social_media_hours'], data['instagram_hours'], 
            data['youtube_hours'], data['whatsapp_hours'], data['other_social_media_hours'], 
            data['study_work_hours'], data['sleep_hours'], data['exercise_hours'], 
            data['tasks_planned'], data['tasks_completed'], data['productivity_rating']
        ))
        conn.commit()
        conn.close()
        return jsonify({'message': 'Record saved successfully'})
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/api/records/<int:id>', methods=['DELETE'])
def delete_record(id):
    conn = get_db_connection()
    conn.execute('DELETE FROM daily_records WHERE id = ?', (id,))
    conn.commit()
    conn.close()
    return jsonify({'message': 'Record deleted'})

def calc_mode(series):
    m = stats.mode(series, keepdims=True)
    return float(m.mode[0]) if len(m.mode) > 0 else 0.0

@app.route('/api/analysis', methods=['GET'])
def get_analysis():
    conn = get_db_connection()
    df = pd.read_sql_query("SELECT * FROM daily_records ORDER BY date ASC", conn)
    conn.close()
    
    if df.empty:
        return jsonify({"error": "No data available"}), 400

    # Calculate derived score
    df['task_completion_pct'] = np.where(df['tasks_planned'] > 0, (df['tasks_completed'] / df['tasks_planned']) * 100, 0)
    df['study_score'] = np.clip((df['study_work_hours'] / 8.0) * 100, 0, 100)
    df['sleep_score'] = np.clip((df['sleep_hours'] / 8.0) * 100, 0, 100)
    df['exercise_score'] = np.clip((df['exercise_hours'] / 1.0) * 100, 0, 100)
    df['calculated_productivity_score'] = (0.40 * df['task_completion_pct']) + (0.30 * df['study_score']) + (0.20 * df['sleep_score']) + (0.10 * df['exercise_score'])
    
    n = len(df)
    
    analysis = {
        "n": n,
        "mean": {
            "social_media_hours": float(df['social_media_hours'].mean()),
            "calculated_productivity_score": float(df['calculated_productivity_score'].mean()),
            "study_work_hours": float(df['study_work_hours'].mean()),
            "sleep_hours": float(df['sleep_hours'].mean())
        },
        "median": {
            "social_media_hours": float(df['social_media_hours'].median()),
            "calculated_productivity_score": float(df['calculated_productivity_score'].median()),
            "study_work_hours": float(df['study_work_hours'].median())
        },
        "mode": {
            "social_media_hours": calc_mode(df['social_media_hours']),
            "calculated_productivity_score": calc_mode(df['calculated_productivity_score']),
            "study_work_hours": calc_mode(df['study_work_hours'])
        },
        "range": {
            "social_media_hours": float(df['social_media_hours'].max() - df['social_media_hours'].min()),
            "calculated_productivity_score": float(df['calculated_productivity_score'].max() - df['calculated_productivity_score'].min()),
            "study_work_hours": float(df['study_work_hours'].max() - df['study_work_hours'].min())
        },
        "variance": {
            "social_media_hours": float(df['social_media_hours'].var(ddof=0)),
            "calculated_productivity_score": float(df['calculated_productivity_score'].var(ddof=0))
        },
        "standard_deviation": {
            "social_media_hours": float(df['social_media_hours'].std(ddof=0)) if n > 0 else 0.0,
            "calculated_productivity_score": float(df['calculated_productivity_score'].std(ddof=0)) if n > 0 else 0.0
        },
        "correlation": {
            "sm_vs_prod": 0.0,
            "sm_vs_study": 0.0,
            "sm_vs_sleep": 0.0,
            "sm_vs_tasks": 0.0
        },
        "regression": {
            "slope": 0.0,
            "intercept": 0.0,
            "r_squared": 0.0
        }
    }
    
    if n > 1:
        try:
            # Pearson correlations
            r_sm_prod, _ = stats.pearsonr(df['social_media_hours'], df['calculated_productivity_score'])
            r_sm_study, _ = stats.pearsonr(df['social_media_hours'], df['study_work_hours'])
            r_sm_sleep, _ = stats.pearsonr(df['social_media_hours'], df['sleep_hours'])
            r_sm_tasks, _ = stats.pearsonr(df['social_media_hours'], df['task_completion_pct'])
            
            analysis["correlation"] = {
                "sm_vs_prod": float(r_sm_prod) if not np.isnan(r_sm_prod) else 0.0,
                "sm_vs_study": float(r_sm_study) if not np.isnan(r_sm_study) else 0.0,
                "sm_vs_sleep": float(r_sm_sleep) if not np.isnan(r_sm_sleep) else 0.0,
                "sm_vs_tasks": float(r_sm_tasks) if not np.isnan(r_sm_tasks) else 0.0
            }
        except:
            pass
            
        try:
            # Linear Regression (Y = a + bX) -> Y = prod, X = sm
            slope, intercept, r_value, p_value, std_err = stats.linregress(df['social_media_hours'], df['calculated_productivity_score'])
            
            analysis["regression"] = {
                "slope": float(slope) if not np.isnan(slope) else 0.0,
                "intercept": float(intercept) if not np.isnan(intercept) else 0.0,
                "r_squared": float(r_value**2) if not np.isnan(r_value) else 0.0
            }
        except:
            pass
    
    # Platform breakdown
    analysis["platforms"] = {
        "Instagram": float(df['instagram_hours'].mean()),
        "YouTube": float(df['youtube_hours'].mean()),
        "WhatsApp": float(df['whatsapp_hours'].mean()),
        "Other": float(df['other_social_media_hours'].mean())
    }
    
    # Categories
    low = df[df['social_media_hours'] < 2]
    mod = df[(df['social_media_hours'] >= 2) & (df['social_media_hours'] <= 4)]
    high = df[df['social_media_hours'] > 4]
    
    analysis["categories"] = {
        "low": {
            "count": len(low),
            "avg_sm": float(low['social_media_hours'].mean()) if len(low) > 0 else 0,
            "avg_prod": float(low['calculated_productivity_score'].mean()) if len(low) > 0 else 0,
            "avg_study": float(low['study_work_hours'].mean()) if len(low) > 0 else 0
        },
        "moderate": {
            "count": len(mod),
            "avg_sm": float(mod['social_media_hours'].mean()) if len(mod) > 0 else 0,
            "avg_prod": float(mod['calculated_productivity_score'].mean()) if len(mod) > 0 else 0,
            "avg_study": float(mod['study_work_hours'].mean()) if len(mod) > 0 else 0
        },
        "high": {
            "count": len(high),
            "avg_sm": float(high['social_media_hours'].mean()) if len(high) > 0 else 0,
            "avg_prod": float(high['calculated_productivity_score'].mean()) if len(high) > 0 else 0,
            "avg_study": float(high['study_work_hours'].mean()) if len(high) > 0 else 0
        }
    }
    
    # Weekly Analysis
    df['date'] = pd.to_datetime(df['date'])
    df.set_index('date', inplace=True)
    weekly = df.resample('W').mean().reset_index()
    
    analysis['weekly'] = []
    for index, row in weekly.iterrows():
        if pd.notna(row['social_media_hours']):
            analysis['weekly'].append({
                "week": row['date'].strftime('%Y-%m-%d'),
                "avg_sm": float(row['social_media_hours']),
                "avg_prod": float(row['calculated_productivity_score']),
                "avg_study": float(row['study_work_hours']),
                "avg_sleep": float(row['sleep_hours']),
                "avg_task_pct": float(row['task_completion_pct'])
            })
            
    return jsonify(analysis)

@app.route('/api/generate_sample_data', methods=['POST'])
def generate_sample_data():
    conn = get_db_connection()
    # Clear existing
    conn.execute('DELETE FROM daily_records')
    
    base_date = datetime.now() - timedelta(days=30)
    
    records = []
    for i in range(30):
        d = (base_date + timedelta(days=i)).strftime('%Y-%m-%d')
        
        # Inverse relationship loosely: higher social media -> lower study -> lower prod
        sm = round(random.uniform(1.0, 6.0), 1)
        study = round(max(0, 8.0 - sm + random.uniform(-1, 2)), 1)
        sleep = round(random.uniform(6.0, 9.0), 1)
        exercise = round(random.uniform(0.0, 1.5), 1)
        
        tasks_planned = random.randint(3, 8)
        # fewer tasks completed if more social media
        completion_ratio = max(0.2, min(1.0, 1.0 - (sm * 0.1) + random.uniform(-0.1, 0.2)))
        tasks_completed = int(tasks_planned * completion_ratio)
        
        rating = max(1, min(10, int((study/8)*5 + (sleep/8)*3 + (exercise/1)*2)))
        
        insta = round(sm * random.uniform(0.3, 0.6), 1)
        yt = round(sm * random.uniform(0.2, 0.4), 1)
        wa = round(sm * random.uniform(0.1, 0.3), 1)
        other = round(sm - insta - yt - wa, 1)
        if other < 0: other = 0.0
        
        records.append((d, sm, insta, yt, wa, other, study, sleep, exercise, tasks_planned, tasks_completed, rating))
        
    conn.executemany('''
        INSERT INTO daily_records (
            date, social_media_hours, instagram_hours, youtube_hours, 
            whatsapp_hours, other_social_media_hours, study_work_hours, 
            sleep_hours, exercise_hours, tasks_planned, tasks_completed, 
            productivity_rating
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ''', records)
    
    conn.commit()
    conn.close()
    return jsonify({'message': 'Sample data generated'})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
