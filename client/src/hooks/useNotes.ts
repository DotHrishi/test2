import { useState, useEffect } from 'react';
import axios from 'axios';

export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: number;
}

const API_BASE = 'http://localhost:5001/api/notes';

export const useNotes = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch notes from Express API
  const fetchNotes = async () => {
    try {
      const response = await axios.get<Note[]>(API_BASE);
      setNotes(response.data);
    } catch (e) {
      console.error('Failed to fetch notes:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const addNote = async (title: string, content: string) => {
    try {
      const response = await axios.post<Note>(API_BASE, { title, content });
      setNotes((prev) => [response.data, ...prev]);
    } catch (e) {
      console.error('Failed to add note:', e);
    }
  };

  const deleteNote = async (id: string) => {
    try {
      await axios.delete(`${API_BASE}/${id}`);
      setNotes((prev) => prev.filter((note) => note.id !== id));
    } catch (e) {
      console.error('Failed to delete note:', e);
    }
  };

  return {
    notes,
    loading,
    addNote,
    deleteNote,
  };
};
