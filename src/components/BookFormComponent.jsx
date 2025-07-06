import "../styles/BookForm.css";

const BookForm = ({ form, loading, onSubmit, onChange, onImageChange }) => {
    return (
        <div className="new-book-form-container">
            <form onSubmit={onSubmit} className="new-book-form">
                <div className="form-group">
                    <input
                        type="text"
                        name="title"
                        placeholder="Título"
                        value={form.title}
                        onChange={onChange}
                        required
                        className="form-input"
                        disabled={loading}
                    />
                </div>

                <div className="form-group">
                    <input
                        type="text"
                        name="author"
                        placeholder="Autor"
                        value={form.author}
                        onChange={onChange}
                        required
                        className="form-input"
                        disabled={loading}
                    />
                </div>

                <div className="form-group">
                    <select
                        name="type"
                        value={form.type}
                        onChange={onChange}
                        required
                        className="form-select"
                        disabled={loading}
                    >
                        <option value="">Seleccionar tipo</option>
                        <option value="NOVELA">NOVELA</option>
                        <option value="TEXTO">TEXTO</option>
                        <option value="REVISTA">REVISTA</option>
                    </select>
                </div>

                <div className="form-group">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={onImageChange}
                        className="form-file"
                        disabled={loading}
                    />
                </div>

                <button
                    type="submit"
                    className="create-button"
                    disabled={loading}
                >
                    {loading ? "Creando libro..." : "Crear libro"}
                </button>
            </form>
        </div>
    );
};

export default BookForm;