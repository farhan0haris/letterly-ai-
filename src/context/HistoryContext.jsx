import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { getItem, setItem } from '../utils/storage';
import { STORAGE_KEYS } from '../utils/constants';

const HistoryContext = createContext();

export const useHistory = () => {
  const context = useContext(HistoryContext);
  if (!context) {
    throw new Error('useHistory must be used within a HistoryProvider');
  }
  return context;
};

export const HistoryProvider = ({ children }) => {
  const [history, setHistory] = useState(() => {
    return getItem(STORAGE_KEYS.HISTORY, []);
  });

  useEffect(() => {
    setItem(STORAGE_KEYS.HISTORY, history);
  }, [history]);

  const addToHistory = useCallback((item) => {
    const newItem = {
      ...item,
      id: Date.now().toString(),
      date: new Date().toISOString(),
    };
    setHistory((prevHistory) => [newItem, ...prevHistory]);
  }, []);

  const deleteFromHistory = useCallback((id) => {
    setHistory((prevHistory) => prevHistory.filter((item) => item.id !== id));
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
  }, []);

  const searchHistory = useCallback((query) => {
    if (!query || !query.trim()) return history;
    const lowerQuery = query.toLowerCase();
    return history.filter(
      (item) =>
        item.company.toLowerCase().includes(lowerQuery) ||
        item.position.toLowerCase().includes(lowerQuery) ||
        item.content.toLowerCase().includes(lowerQuery)
    );
  }, [history]);

  const contextValue = useMemo(
    () => ({
      history,
      addToHistory,
      deleteFromHistory,
      clearHistory,
      searchHistory,
    }),
    [history, addToHistory, deleteFromHistory, clearHistory, searchHistory]
  );

  return (
    <HistoryContext.Provider value={contextValue}>
      {children}
    </HistoryContext.Provider>
  );
};
