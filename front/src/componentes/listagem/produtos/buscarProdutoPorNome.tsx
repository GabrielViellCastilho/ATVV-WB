import { ChangeEvent, useState } from "react";
import 'materialize-css/dist/css/materialize.min.css';
import Produto from "../../../modelo/Produto";

interface Props {
    tema: string;
};


const produtosFicticios: Produto[] = [
    new Produto("Pomada Modeladora", 45),
    new Produto("Shampoo Masculino", 30),
    new Produto("Condicionador", 28),
    new Produto("Cera Capilar", 35),
];

export default function BuscarProdutoPorNome({ tema }: Props) {
    const [nomeBusca, setNomeBusca] = useState("");
    const [resultado, setResultado] = useState<Produto | null>(null)


    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setNomeBusca(event.target.value);
    };

    const buscarProduto = () => {
        const produtoEncontrado = produtosFicticios.find(
            p => p.nome === nomeBusca
        );
        setResultado(produtoEncontrado || null);
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
                <h5 className={`${tema} white-text center-align`}>Buscar Produto por Nome</h5>

                <div className="input-field">
                    <input
                        type="text"
                        value={nomeBusca}
                        onChange={handleChange}
                        placeholder="Digite o nome do produto"
                        className="validate"
                    />
                </div>

                <div className="center-align">
                    <button className={`btn ${tema}`} onClick={buscarProduto}>
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
                        Produto não encontrado.
                    </p>
                ) : null}
            </div>
        </div>
    );
}
