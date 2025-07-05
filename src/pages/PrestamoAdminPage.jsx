import { useState } from "react";
import { getCopyByTitle } from "../services/bookService";
import { createBooking } from "../services/bookingService";
import HeaderAdmin from "../components/HeaderAdmin";
import "../styles/PrestamoAdminPage.css";


const PrestamoAdminPage = () => {
  const [title, setTitle] = useState("");
  const [copies, setCopies] = useState([]);
  const [selectedCopy, setSelectedCopy] = useState(null);
  const [email, setEmail] = useState("");

  const handleSearchCopies = async () => {
    try {
      const data = await getCopyByTitle(title.trim());
      setCopies(data);
    } catch (err) {
      console.error("Error al buscar copias:", err);
      alert("Error al buscar copias disponibles");
    }
  };
  const handleCreateBooking = async () => {
    if (!selectedCopy || !email.trim()) {
      alert("Debes seleccionar una copia y escribir el correo del lector.");
      return;
    }

    try {
      await createBooking({
        userFk: email.trim(),
        copyBookFk: selectedCopy.id,
      });
      alert("Prestamo Realizado exitosamente");
      setEmail("");
      setSelectedCopy(null);
      setCopies([]);
      setTitle("");
    } catch (error) {
      console.error("Error al crear préstamo:", error);
      alert("No se pudo crear el préstamo.");
    }
  };

  return (
    <div className="home-page">
      <HeaderAdmin />
      <main className="home-content">
        <h2>Reservar Libro</h2>

        <div className="form-libro">
          <input
            type="text"
            placeholder="Título del libro"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button onClick={handleSearchCopies}>Buscar copias disponibles</button>
        </div>

        {copies.length > 0 && (
          <div className="search-results">
            <h3>Copias disponibles:</h3>
            <ul>
              {copies.map((copy) => (
                <li
                  key={copy.id}
                  onClick={() => setSelectedCopy(copy)}
                  className={selectedCopy?.id === copy.id ? "selected" : ""}
                >
                  <strong>{copy.book.title}</strong> — {copy.book.author} ({copy.book.type})
                  <br />
                  <small>ID Copia: {copy.id}</small>
                </li>
              ))}
            </ul>
          </div>
        )}

        {selectedCopy && (
          <div className="form-libro" style={{ marginTop: "2rem" }}>
            <h3>Seleccionaste:</h3>
            <p>
              <strong>{selectedCopy.book.title}</strong> — {selectedCopy.book.author} ({selectedCopy.book.type})<br />
              ID Copia: {selectedCopy.id}
            </p>

            <input
              type="email"
              placeholder="Correo del lector"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button onClick={handleCreateBooking}>Confirmar Préstamo</button>
          </div>
        )}
      </main>
    </div>
  );
};

export default PrestamoAdminPage;