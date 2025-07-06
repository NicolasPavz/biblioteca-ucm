import { useState } from "react";
import "../styles/BookCard.css";

const BookCard = ({ book }) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="book-card">
      <div className="book-image-container">
        {book.image64 && !imageError ? (
          <img
            src={`data:image/png;base64,${book.image64}`}
            alt={book.title}
            className="book-image"
            onError={handleImageError}
          />
        ) : (
          <div className="book-image-placeholder">
            <span className="book-icon">📚</span>
          </div>
        )}
      </div>
      
      <div className="book-content">
        <h4 className="book-title">{book.title}</h4>
        <p className="book-author">{book.author}</p>
        <div className="book-type">
          <span className="type-label">Tipo:</span>
          <span className="type-value">{book.type}</span>
        </div>
      </div>
    </div>
  );
};

export default BookCard;