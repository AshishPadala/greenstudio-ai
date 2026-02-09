import React from 'react';
import { ChatSession, GlobalStats } from '../types';

interface SidebarProps {
  sessions: ChatSession[];
  currentSessionId: string | null;
  onSelectSession: (id: string) => void;
  onNewChat: () => void;
  onDeleteSession: (e: React.MouseEvent, id: string) => void;
  onViewAnalytics: () => void;
  stats: GlobalStats;
  isOpen: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  sessions, currentSessionId, onSelectSession, onNewChat, onDeleteSession, onViewAnalytics, stats, isOpen 
}) => {
  if (!isOpen) return null;

  return (
    <div className="sidebar">
      {/* --- Top: Header & Brand --- */}
      <div className="sidebar-header">
        <div className="brand">
          <span style={{ fontSize: '1.5rem' }}>🌿</span> GreenStudio
        </div>
        <button onClick={onNewChat} className="new-chat-btn">
          + New Optimization
        </button>
      </div>

      {/* --- Eco Impact Dashboard --- */}
      <div className="eco-dashboard-card">
        <h3>Lifetime Impact</h3>
        
        {/* Carbon */}
        <div className="metric-row">
          <span className="label">CO₂ Saved</span>
          <span className="value highlight">{stats.totalCarbonSaved.toFixed(2)}g</span>
        </div>

        {/* Energy */}
        <div className="metric-row">
          <span className="label">Energy</span>
          <span className="value">{stats.totalEnergySaved.toFixed(4)} kWh</span>
        </div>

        {/* Water */}
        <div className="metric-row">
          <span className="label">Water</span>
          <span className="value">{stats.totalWaterSaved.toFixed(2)} L</span>
        </div>

        {/* Tokens */}
        <div className="metric-row">
          <span className="label">Tokens Saved</span>
          <span className="value" style={{ color: '#a78bfa' }}>
            {Math.round(stats.totalTokensSaved).toLocaleString()}
          </span>
        </div>

        <button className="view-details-link" onClick={onViewAnalytics}>
          View Analytics →
        </button>
      </div>

      {/* --- Middle: Chat History (Restored) --- */}
      <div className="session-list">
        <div className="list-header" style={{ marginBottom: '8px', paddingLeft: '5px', fontSize: '0.8rem', color: '#888' }}>
          History
        </div>
        
        {sessions.map(session => (
          <div 
            key={session.id} 
            className={`session-item ${session.id === currentSessionId ? 'active' : ''}`}
            onClick={() => onSelectSession(session.id)}
          >
            <div className="session-title">
              {session.title}
            </div>
            <div className="session-meta">
              <span className="date">
                {new Date(session.createdAt).toLocaleDateString(undefined, {month:'short', day:'numeric'})}
              </span>
              
              {/* Only show badge if carbon was saved */}
              {session.sessionTotals.carbonSavedGrams > 0 && (
                <span className="badge" style={{color: '#4ade80', fontSize: '0.7rem'}}>
                  -{session.sessionTotals.carbonSavedGrams.toFixed(1)}g
                </span>
              )}
              
              <button 
                className="delete-btn" 
                onClick={(e) => onDeleteSession(e, session.id)} 
                title="Delete Chat"
                style={{
                   background:'none', 
                   border:'none', 
                   color:'#ef4444', 
                   cursor:'pointer',
                   marginLeft: '8px'
                }}
              >
                ×
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* --- Bottom: User Profile --- */}
      <div className="sidebar-footer" style={{ marginTop: 'auto', paddingTop: '15px', borderTop: '1px solid #333' }}>
        <div className="user-profile" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div className="avatar" style={{ 
             width: '32px', height: '32px', background: '#5436DA', borderRadius: '4px', 
             display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' 
          }}>
            U
          </div>
          <div className="user-info">
            <span className="name" style={{ display:'block', fontSize:'0.9rem' }}>User</span>
            <span className="plan" style={{ fontSize:'0.75rem', color:'#fbbf24' }}>Pro Plan</span>
          </div>
        </div>
      </div>
    </div>
  );
};