export default function DeleteConfirm({ movie, onDelete, onClose }) {
  return (
    <div className="modal-bg">
      <div className="modal">
        <h3>Usunąć "{movie.title}"?</h3>

        <div className="modal-btns">
          <button onClick={() => { onDelete(movie.id); onClose(); }}>
            Usuń
          </button>
          <button onClick={onClose}>Anuluj</button>
        </div>
      </div>
    </div>
  );
}