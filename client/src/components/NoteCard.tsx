import styles from './NoteCard.module.css';

interface NoteCardProps {
  title: string;
  content: string;
  createdAt: number;
  onDelete: () => void;
}

export const NoteCard = ({ title, content, createdAt, onDelete }: NoteCardProps) => {
  const dateStr = new Date(createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className={`${styles.card} glass animate-fade-in`}>
      <div className={styles.header}>
        <h3>{title}</h3>
        <button onClick={onDelete} className={styles.deleteBtn} aria-label="Delete note">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 6h18m-2 0v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6m3 0V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
          </svg>
        </button>
      </div>
      <p className={styles.content}>{content}</p>
      <div className={styles.footer}>
        <span className={styles.date}>{dateStr}</span>
      </div>
    </div>
  );
};
