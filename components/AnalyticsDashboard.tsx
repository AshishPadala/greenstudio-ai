// components/AnalyticsDashboard.tsx
import React from 'react';
import { GlobalStats, ChatSession } from '../types';

interface Props {
  stats: GlobalStats;
  sessions: ChatSession[];
  onBack: () => void;
}

export const AnalyticsDashboard: React.FC<Props> = ({ stats, sessions, onBack }) => {
  // Safety check: If stats are missing for any reason, show loading or empty state
  if (!stats) {
    return <div className="analytics-page">Loading stats...</div>;
  }

  return (
    <div className="analytics-page">
      <header className="analytics-header">
        <button onClick={onBack} className="back-btn">
          ← Back to Chat
        </button>
        <h1 style={{ margin: 0, fontSize: '1.8rem' }}>Sustainability Impact Report</h1>
      </header>

      {/* Hero Stats */}
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Tokens Saved</h3>
          <div className="value" style={{ color: '#a78bfa' }}>
            {Math.round(stats.totalTokensSaved || 0).toLocaleString()}
          </div>
        </div>
        <div className="stat-card">
          <h3>Carbon Reduced</h3>
          <div className="value" style={{ color: '#4ade80' }}>
            {stats.totalCarbonSaved.toFixed(2)}g
          </div>
        </div>
        <div className="stat-card">
          <h3>Energy Saved</h3>
          <div className="value" style={{ color: '#fbbf24' }}>
            {stats.totalEnergySaved.toFixed(4)} kWh
          </div>
        </div>
        <div className="stat-card">
          <h3>Water Saved</h3>
          <div className="value" style={{ color: '#60a5fa' }}>
            {stats.totalWaterSaved.toFixed(2)} L
          </div>
        </div>
      </div>

      {/* Detailed Table */}
      <h2 style={{ marginBottom: '20px', fontSize: '1.2rem' }}>Session Breakdown</h2>
      <div className="analytics-table-container">
        <table className="analytics-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Session Title</th>
              <th>Tokens Saved</th>
              <th>CO₂ Impact</th>
            </tr>
          </thead>
          <tbody>
            {sessions.length === 0 ? (
              <tr>
                <td colSpan={4} style={{ textAlign: 'center', padding: '30px', opacity: 0.6 }}>
                  No optimization history found. Start a new chat!
                </td>
              </tr>
            ) : (
              sessions.map(s => (
                <tr key={s.id}>
                  <td>{new Date(s.createdAt).toLocaleDateString()}</td>
                  <td style={{ fontWeight: 500 }}>{s.title}</td>
                  <td>{(s.sessionTotals.tokensSaved || 0).toLocaleString()}</td>
                  <td style={{ color: '#4ade80', fontWeight: 'bold' }}>
                    -{s.sessionTotals.carbonSavedGrams.toFixed(2)}g
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};