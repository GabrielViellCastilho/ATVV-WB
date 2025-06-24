import { ChangeEvent, useState } from "react";
import 'materialize-css/dist/css/materialize.min.css';
import Servico from "../../../modelo/Servico";

interface Props {
    tema: string;
};

const servicosFicticios: Servico[] = [
    new Servico("Corte Masculino", 25),
    new Servico("Corte Feminino", 35),
    new Servico("Barba", 20),
    new Servico("Sobrancelha", 15),
    new Servico("Hidratação", 40),
];

export default function BuscarServicoPorNome({ tema }: Props) {
    const [nomeBusca, setNomeBusca] = useState("");
    const [resultado, setResultado] = useState<Servico | null>(null)


    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setNomeBusca(event.target.value);
    };

    const buscarServico = () => {
        const servicoEncontrado = servicosFicticios.find(
            s => s.nome === nomeBusca
        );
        setResultado(servicoEncontrado || null);
    };

    return (
        <div className="container" style={{ marginTop: "40px" }}>
            <div
                className="z-depth-2"
                style={{
                    backgroundColor: "#f5f5f5",
                    borderRadius: "10px",
                    padding: "30px",
                    boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
                }}
            >
                <h5 className={`${tema} white-text center-align`}>Buscar Serviço por Nome</h5>

                <div className="input-field">
                    <input
                        type="text"
                        value={nomeBusca}
                        onChange={handleChange}
                        placeholder="Digite o nome do serviço"
                        className="validate"
                    />
                </div>

                <div className="center-align">
                    <button className={`btn ${tema}`} onClick={buscarServico}>
                        Buscar
                    </button>
                </div>

                {resultado ? (
                    <div className="card" style={{ marginTop: '1.5rem' }}>
                        <div className={`card-content ${tema} white-text`}>
                            <span className="card-title">{resultado.nome}</span>
                            <p><strong>Preço:</strong> R$ {resultado.preco.toFixed(2)}</p>
                        </div>
                    </div>
                ) : nomeBusca ? (
                    <p className="center-align red-text" style={{ marginTop: '1.5rem' }}>
                        Serviço não encontrado.
                    </p>
                ) : null}
            </div>
        </div>
    );
}