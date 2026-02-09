// hooks/useChatStore.ts
import { useState, useEffect } from 'react';
import { ChatSession, Message, GlobalStats } from '../types';

const STORAGE_KEY = 'greenstudio_history_v1';

export function useChatStore() {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);

  // Load from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setSessions(JSON.parse(saved));
    } else {
      createNewSession();
    }
  }, []);

  // Auto-save whenever sessions change
  useEffect(() => {
    if (sessions.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
    }
  }, [sessions]);

  const createNewSession = () => {
    const newSession: ChatSession = {
      id: Date.now().toString(),
      title: 'New Eco-Optimization',
      createdAt: Date.now(),
      messages: [],
      sessionTotals: { 
        tokensUsed: 0, 
        tokensSaved: 0, 
        energySavedKWh: 0, 
        waterSavedLitres: 0, 
        carbonSavedGrams: 0 
      }
    };
    setSessions(prev => [newSession, ...prev]);
    setCurrentSessionId(newSession.id);
  };

  const addMessageToSession = (sessionId: string, message: Message) => {
    setSessions(prev => prev.map(session => {
      if (session.id !== sessionId) return session;

      // Update title if it's the first user message
      let newTitle = session.title;
      if (session.messages.length === 0 && message.role === 'user') {
        newTitle = message.text.slice(0, 30) + (message.text.length > 30 ? '...' : '');
      }

      // Update metrics if the message has them
      const newTotals = { ...session.sessionTotals };
      if (message.metrics) {
        newTotals.tokensUsed += (message.metrics.tokensUsed || 0);
        newTotals.tokensSaved += (message.metrics.tokensSaved || 0);
        newTotals.carbonSavedGrams += (message.metrics.carbonSavedGrams || 0);
        newTotals.energySavedKWh += (message.metrics.energySavedKWh || 0);
        newTotals.waterSavedLitres += (message.metrics.waterSavedLitres || 0);
      }

      return {
        ...session,
        title: newTitle,
        messages: [...session.messages, message],
        sessionTotals: newTotals
      };
    }));
  };

  const deleteSession = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setSessions(prev => prev.filter(s => s.id !== id));
    if (currentSessionId === id) createNewSession();
  };

  // Calculate Global Stats for the Sidebar Dashboard
  const globalStats: GlobalStats = sessions.reduce((acc, session) => ({
    totalCarbonSaved: acc.totalCarbonSaved + (session.sessionTotals.carbonSavedGrams || 0),
    totalEnergySaved: acc.totalEnergySaved + (session.sessionTotals.energySavedKWh || 0),
    totalWaterSaved: acc.totalWaterSaved + (session.sessionTotals.waterSavedLitres || 0),
    totalTokensSaved: acc.totalTokensSaved + (session.sessionTotals.tokensSaved || 0), // <--- NOW CORRECTLY SUMMED
  }), { 
    totalCarbonSaved: 0, 
    totalEnergySaved: 0, 
    totalWaterSaved: 0, 
    totalTokensSaved: 0 
  });

  return {
    sessions,
    currentSessionId,
    setCurrentSessionId,
    createNewSession,
    addMessageToSession,
    deleteSession,
    globalStats
  };
}