import { useEffect, useState } from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css';

interface ProdutoMaisVendido {
  id: number;
  nome: string;
  preco: number;
  totalClientes: number;
}

interface Props {
  tema: string;
}

export default function ListagemProdutosMaisVendidosFeminino({ tema }: Props) {
  const [produtos, setProdutos] = useState<ProdutoMaisVendido[]>([]);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://localhost:3069/produtos/maisVendidosPorGenero/Feminino")
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao buscar produtos mais vendidos para o gênero Feminino");
        return res.json();
      })
      .then((data) => setProdutos(data))
      .catch(() => setErro("Não foi possível carregar os produtos mais vendidos por gênero."));
  }, []);

  useEffect(() => {
    const elems = document.querySelectorAll('.collapsible');
    M.Collapsible.init(elems);
  }, [produtos]);

  return (
    <div className="row">
      <div className="col s10 offset-s1">
        <h4 className="center-align pink-text text-darken-2">
          Produtos Mais Vendidos para o Gênero Feminino
        </h4>

        {erro && (
          <p className="red-text center-align" style={{ marginTop: '1rem' }}>
            {erro}
          </p>
        )}

        <ul className="collapsible">
          {produtos.map((produto, index) => (
            <li key={index}>
              <div className={`collapsible-header ${tema} white-text`}>
                <i className="material-icons">shopping_bag</i>
                {produto.nome}
              </div>
              <div className="collapsible-body">
                <p><strong>Nome:</strong> {produto.nome}</p>
                <p><strong>Preço:</strong> R$ {produto.preco.toFixed(2)}</p>
                <p><strong>Quantidade Vendida:</strong> {produto.totalClientes}</p>
              </div>
            </li>
          ))}
        </ul>

        <div className="center-align" style={{ marginTop: '1rem' }}>
          <a className={`btn-floating btn-large waves-effect waves-light left-align ${tema}`}>
            <i className="material-icons">arrow_back</i>
          </a>
          <a className={`btn-floating btn-large waves-effect waves-light left-align ${tema}`} style={{ marginLeft: '10px' }}>
            <i className="material-icons">arrow_forward</i>
          </a>
        </div>
      </div>
    </div>
  );
}
