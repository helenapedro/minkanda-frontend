import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { fetchNoteById } from '../../services/api';
import getRandomColor from '../../components/notes/NoteColor';
import { useNoteActions } from '../../actions/useNoteActions';
import Loading from '../../components/common/Loading';
import Error from '../../components/common/Error';
import styles from '../../styles/NoteDetails.module.css';

const NoteDetails = () => {
  const { id } = useParams();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cardColor, setCardColor] = useState(getRandomColor());
  const { handleDelete } = useNoteActions();
  const navigate = useNavigate(); 

  useEffect(() => {
    const getNoteDetails = async () => {
      try {
        const fetchedNote = await fetchNoteById(id);
        setNote(fetchedNote);
      } catch (err) {
        setError('Failed to fetch note details.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getNoteDetails();
  }, [id]);

  useEffect(() => {
    setCardColor(getRandomColor());
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error/>; 
  }

  return (
    <section className="vh-100">
      <div className={`${styles.card} container`} style={{ backgroundColor: cardColor}}>
        {note ? (
          <div >
            <div className={styles.header}>
              <h2 className={styles.title}>{note.title}</h2>
              <button className="btn btn-secondary" onClick={() => navigate('/notes')}>
                Return
              </button>
            </div>
            <div className={styles.body}>
              <p className='card-text'>{note.body}</p>
            </div>
            <div className={styles.footer}>
              <button className="btn btn-primary" onClick={() => navigate(`/notes/edit/${id}`)}>
                Edit Note
              </button>
              <button className="btn btn-danger" onClick={() => handleDelete(id, setError)}>
                Delete Note
              </button>
            </div>
          </div>
        ) : (
          <div>Note not found.</div>
        )}
      </div>
    </section>
  );
};

export default NoteDetails;
