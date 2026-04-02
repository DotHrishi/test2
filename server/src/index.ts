import express from 'express';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';

const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());

interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: number;
}

let notes: Note[] = [
  {
    id: uuidv4(),
    title: 'HelixDB: Replicated in Express',
    content: 'This note was served by a real Express server running on port 5001!',
    createdAt: Date.now(),
  },
  {
    id: uuidv4(),
    title: 'Benchmarking Ready',
    content: 'Try adding and deleting notes to ensure everything is working smoothly.',
    createdAt: Date.now() - 3600000,
  }
];

// Routes
// @ts-ignore
app.get('/api/notes', (req, res) => {
  res.json(notes);
});

// @ts-ignore
app.post('/api/notes', (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content are required' });
  }
  const newNote: Note = {
    id: uuidv4(),
    title,
    content,
    createdAt: Date.now(),
  };
  notes = [newNote, ...notes];
  res.status(201).json(newNote);
});

// @ts-ignore
app.delete('/api/notes/:id', (req, res) => {
  const { id } = req.params;
  notes = notes.filter(n => n.id !== id);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
