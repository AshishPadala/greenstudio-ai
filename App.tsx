import React, { useState, useRef, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { AnalyticsDashboard } from './components/AnalyticsDashboard';
import { GreenGeminiService } from './services/geminiService';
import { useChatStore } from './hooks/useChatStore';
import './App.css';

const geminiService = new GreenGeminiService();

function App() {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true);
  
  // State to switch between Chat and Analytics views
  const [view, setView] = useState<'chat' | 'analytics'>('chat');

  const scrollRef = useRef<HTMLDivElement>(null);
  
  const { 
    sessions, currentSessionId, setCurrentSessionId, 
    createNewSession, addMessageToSession, deleteSession, globalStats 
  } = useChatStore();

  const currentSession = sessions.find(s => s.id === currentSessionId);

  // Auto-scroll to bottom of chat when new messages arrive
  useEffect(() => {
    if (view === 'chat' && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [currentSession?.messages, loading, view]);

  // Handlers for switching views
  const handleNewChat = () => {
    setView('chat');
    createNewSession();
  };

  const handleSelectSession = (id: string) => {
    setView('chat');
    setCurrentSessionId(id);
  };

  const handleViewAnalytics = () => {
    setView('analytics');
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || !currentSessionId) return;

    const userMsg = {
      id: Date.now().toString(),
      role: 'user' as const,
      text: input,
      timestamp: Date.now()
    };
    addMessageToSession(currentSessionId, userMsg);
    setInput('');
    setLoading(true);

    try {
      const response = await geminiService.orchestrate(userMsg.text);
      addMessageToSession(currentSessionId, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        text: response.text,
        timestamp: Date.now(),
        metrics: response.metrics
      });
    } catch (error) {
      addMessageToSession(currentSessionId, {
        id: Date.now().toString(),
        role: 'system',
        text: "Error connecting to GreenGemini. Please check if backend is running.",
        timestamp: Date.now()
      });
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="app-container">
      <Sidebar 
        isOpen={sidebarOpen}
        sessions={sessions}
        currentSessionId={currentSessionId}
        onSelectSession={handleSelectSession}
        onNewChat={handleNewChat}
        onDeleteSession={deleteSession}
        onViewAnalytics={handleViewAnalytics}
        stats={globalStats}
      />

      <main className={`main-content ${isDarkMode ? 'theme-dark' : 'theme-light'}`}>
        
        {/* Top Navigation Bar */}
        <header className="top-nav">
          <div className="nav-left">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)} 
              className="nav-btn"
              title="Toggle Sidebar"
            >
              {sidebarOpen ? '«' : '☰'}
            </button>
            <h2>
              {view === 'analytics' 
                ? 'Analytics Dashboard' 
                : (currentSession?.title || 'New Eco-Optimization')}
            </h2>
          </div>
          
          <button 
            className="theme-toggle" 
            onClick={() => setIsDarkMode(!isDarkMode)}
            title="Toggle Light/Dark Mode"
          >
            {isDarkMode ? '☀️ Light' : '🌙 Dark'}
          </button>
        </header>

        {/* View Switcher: Chat OR Analytics */}
        {view === 'analytics' ? (
          <AnalyticsDashboard 
            stats={globalStats} 
            sessions={sessions} 
            onBack={() => setView('chat')} 
          />
        ) : (
          <>
            <div className="chat-scroll-area" ref={scrollRef}>
              {(!currentSession || currentSession.messages.length === 0) ? (
                <div className="empty-state">
                  <div className="empty-icon">🌿</div>
                  <h1>GreenStudio AI</h1>
                  <p>Optimize your software's carbon footprint.</p>
                </div>
              ) : (
                currentSession.messages.map(msg => (
                  <div key={msg.id} className={`message-row ${msg.role}`}>
                    <div className="message-center-wrapper">
                      <div className={`role-icon ${msg.role}`}>
                        {msg.role === 'assistant' ? '🌿' : 'U'}
                      </div>
                      <div className="message-content">
                        <div className="role-name">
                          {msg.role === 'assistant' ? 'GreenGemini' : 'You'}
                        </div>
                        <div className="text-body">{msg.text}</div>
                        
                        {/* Metrics Badge */}
                        {msg.metrics && (
                          <div className="eco-panel">
                            <div className="eco-badge tokens" style={{ color: '#a78bfa', borderColor: 'rgba(167, 139, 250, 0.3)' }}>
                              🪙 {msg.metrics.tokensSaved} Tokens Saved
                            </div>
                            <div className="eco-badge energy">
                               ⚡ {(msg.metrics.energySavedKWh * 1000).toFixed(2)} Wh
                            </div>
                            <div className="eco-badge water">
                               💧 {msg.metrics.waterSavedLitres.toFixed(1)} L
                            </div>
                            <div className="eco-badge carbon">
                               📉 {msg.metrics.carbonSavedGrams.toFixed(2)}g CO₂
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
              {loading && (
                 <div className="message-row assistant">
                   <div className="message-center-wrapper">
                     <div className="role-icon assistant">🌿</div>
                     <div className="message-content">
                        <div className="role-name">GreenGemini</div>
                        <div className="text-body loading-text">Calculating eco-impact...</div>
                     </div>
                   </div>
                 </div>
              )}
            </div>

            <div className="input-area">
              <div className="input-container">
                <textarea 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask for eco-friendly code or paste a snippet..."
                  rows={1}
                />
                <button className="send-btn" onClick={() => handleSubmit()} disabled={loading}>
                  ➤
                </button>
              </div>
              <div className="disclaimer">
                GreenStudio AI can make mistakes. Consider the environment before deploying code.
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default App;