import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { getFinesByEmail } from "../services/fineService";
import HeaderLector from "../components/HeaderLector";

const MultasPage = () => {
    const [fines, setFines] = useState([]);


    useEffect(() => {
        const fetchFines = async () => {
            try {
                const token = localStorage.getItem("token");
                const decoded = jwtDecode(token);
                const email = decoded.sub.split("#")[0];

                const res = await getFinesByEmail(email);
                setFines(res);
            } catch (error) {
                console.error("Error al obtener las multas:", error);
            }
        };

        fetchFines();
    }, []);

    return (
        <div className="home-page">
            <HeaderLector />
            <main className="home-content">
                <h2>Mis Multas</h2>
                {fines.length > 0 ? (
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Monto</th>
                                <th>Descripción</th>
                                <th>Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            {fines.map((f) => (
                                <tr key={f.id}>
                                    <td>${f.amount}</td>
                                    <td>{f.description}</td>
                                    <td>{f.state ? "Pagada" : "Pendiente"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No tienes multas pendientes.</p>
                )}
            </main>
        </div>
    );
};

export default MultasPage;
