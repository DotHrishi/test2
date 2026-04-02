import { useNotes } from './hooks/useNotes';
import { NoteForm, NoteCard } from './components';
import styles from './App.module.css';

function App() {
  const { notes, loading, addNote, deleteNote } = useNotes();

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <div className={styles.titleGroup}>
          <h1 className={styles.title}>Helix<span>DB</span> Notes</h1>
          <p className={styles.subtitle}>Modern perspective on note-taking • Express Edition</p>
        </div>
      </header>

      <section className={styles.inputSection}>
        <NoteForm onAdd={addNote} />
      </section>

      <section className={styles.notesSection}>
        {loading ? (
          <div className={styles.loading}>
            <div className={styles.spinner}></div>
            <p>Gathering your thoughts from the server...</p>
          </div>
        ) : notes.length === 0 ? (
          <div className={`${styles.empty} glass`}>
            <p>Your workspace is empty. Start by adding a note above!</p>
          </div>
        ) : (
          <div className={styles.grid}>
            {notes.map((note) => (
              <NoteCard
                key={note.id}
                title={note.title}
                content={note.content}
                createdAt={note.createdAt}
                onDelete={() => deleteNote(note.id)}
              />
            ))}
          </div>
        )}
      </section>

      <footer className={styles.footer}>
        <p>© 2026 HelixDB Studio • Full-Stack Performance</p>
      </footer>
    </main>
  );
}

export default App;
