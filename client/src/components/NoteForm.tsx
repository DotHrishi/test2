import { useState, FormEvent } from 'react';
import styles from './NoteForm.module.css';

interface NoteFormProps {
  onAdd: (title: string, content: string) => void;
}

export const NoteForm = ({ onAdd }: NoteFormProps) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    
    onAdd(title, content);
    setTitle('');
    setContent('');
    setIsOpen(false);
  };

  return (
    <div className={`${styles.container} glass ${isOpen ? styles.expanded : ''}`}>
      {!isOpen ? (
        <div className={styles.collapsed} onClick={() => setIsOpen(true)}>
          <span>Write a new note...</span>
          <button className={styles.plusBtn}>
             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14M5 12h14" />
            </svg>
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={styles.titleInput}
            autoFocus
          />
          <textarea
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className={styles.contentInput}
            rows={4}
          />
          <div className={styles.actions}>
            <button type="button" onClick={() => setIsOpen(false)} className={styles.cancelBtn}>
              Cancel
            </button>
            <button type="submit" className={styles.submitBtn}>
              Add Note
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
