import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css';
import Servico from "../../../modelo/Servico";
import { useEffect } from 'react';

interface Props {
    tema: string;
};

const servicos: Servico[] = [
    new Servico("Corte de Cabelo", 40),
    new Servico("Barba", 25),
    new Servico("Hidratação Capilar", 50),
    new Servico("Pintura", 60),
    new Servico("Progressiva", 120),
    new Servico("Escova", 35),
    new Servico("Luzes", 150),
    new Servico("Sobrancelha", 20),
    new Servico("Massagem Capilar", 45),
    new Servico("Alisamento", 110),
];

export default function ListagemTodosServicos({ tema }: Props) {
    useEffect(() => {
        const elems = document.querySelectorAll('.collapsible');
        M.Collapsible.init(elems, {});
    }, [])

    return (
        <div className="row">
            <div className="col s10 offset-s1">
                <ul className="collapsible">
                    {servicos.map((servico, index) => (
                        <li key={index}>
                            <div className={`collapsible-header ${tema} white-text`}>
                                <i className="material-icons">build</i>
                                {servico.nome}
                            </div>
                            <div className="collapsible-body">
                                <p><strong>Nome:</strong> {servico.nome}</p>
                                <p><strong>Preço:</strong> R$ {servico.preco.toFixed(2)}</p>
                            </div>
                        </li>
                    ))}
                </ul>

                <div className="center-align">
                    <a className={`btn-floating btn-large waves-effect waves-light left-align ${tema}`}>
                        <i className="material-icons">arrow_back</i>
                    </a>
                    <a className={`btn-floating btn-large waves-effect waves-light left-align ${tema}`}>
                        <i className="material-icons">arrow_forward</i>
                    </a>
                </div>
            </div>
        </div>
    );
}