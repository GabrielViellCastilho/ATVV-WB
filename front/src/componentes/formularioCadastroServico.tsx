import { useEffect, useState } from "react";
import M from "materialize-css";

interface Props {
  tema: string;
}

export default function FormularioCadastroServico({ tema }: Props) {
  const [nomeCriar, setNomeCriar] = useState("");
  const [precoCriar, setPrecoCriar] = useState("");
  const [nomeRemover, setNomeRemover] = useState("");
  const [nomeAtualizar, setNomeAtualizar] = useState("");
  const [novoNome, setNovoNome] = useState("");
  const [novoPreco, setNovoPreco] = useState("");

  useEffect(() => {
    const elems = document.querySelectorAll(".modal");
    M.Modal.init(elems);
  }, []);

  const estiloBotao = `btn waves-effect waves-light ${tema}`;

  const criarServico = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3069/servicos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome: nomeCriar, preco: parseFloat(precoCriar) }),
      });
      if (!res.ok) throw new Error("Erro ao criar serviço");
      M.toast({ html: "Serviço criado com sucesso!", classes: "green darken-2" });
      setNomeCriar("");
      setPrecoCriar("");
    } catch (error) {
      M.toast({ html: "Erro ao criar serviço.", classes: "red darken-2" });
    }
  };

  const deletarServico = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:3069/servicosPorNome/${nomeRemover}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Erro ao deletar serviço");
      M.toast({ html: "Serviço deletado com sucesso!", classes: "green darken-2" });
      setNomeRemover("");
    } catch (error) {
      M.toast({ html: "Erro ao deletar serviço.", classes: "red darken-2" });
    }
  };

  const abrirModalAtualizar = async () => {
    if (!nomeAtualizar.trim()) {
      M.toast({ html: "Por favor, preencha o nome antigo para atualizar.", classes: "orange darken-2" });
      return;
    }
    try {
      const res = await fetch(`http://localhost:3069/servicos/${nomeAtualizar}`);
      if (!res.ok) throw new Error("Serviço não encontrado");
      const servico = await res.json();

      setNovoNome(servico.nome);
      setNovoPreco(servico.preco.toString());

      const modal = document.getElementById("modalServico");
      if (modal) {
        const instance = M.Modal.getInstance(modal);
        instance.open();
      }
    } catch (error) {
      M.toast({ html: "Serviço não encontrado.", classes: "red darken-2" });
    }
  };

  const atualizarServico = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:3069/servicosPorNome/${nomeAtualizar}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome: novoNome, preco: parseFloat(novoPreco) }),
      });
      if (!res.ok) throw new Error("Erro ao atualizar serviço");
      M.toast({ html: "Serviço atualizado com sucesso!", classes: "green darken-2" });

      setNomeAtualizar("");
      setNovoNome("");
      setNovoPreco("");

      const modal = document.getElementById("modalServico");
      if (modal) {
        const instance = M.Modal.getInstance(modal);
        instance.close();
      }
    } catch (error) {
      M.toast({ html: "Erro ao atualizar serviço.", classes: "red darken-2" });
    }
  };

  return (
    <div className="row">
      {/* Criar Serviço */}
      <form className="col s10 offset-s1" onSubmit={criarServico}>
        <h4 className="deep-purple-text text-lighten-2">Criar Serviço</h4>
        <div className="row">
          <div className="input-field col s6">
            <input
              id="nome_criar_servico"
              type="text"
              value={nomeCriar}
              onChange={(e) => setNomeCriar(e.target.value)}
              required
            />
            <label htmlFor="nome_criar_servico" className={nomeCriar ? "active" : ""}>
              Nome*
            </label>
          </div>
          <div className="input-field col s6">
            <input
              id="preco_criar_servico"
              type="number"
              min="0.01"
              step="0.01"
              value={precoCriar}
              onChange={(e) => setPrecoCriar(e.target.value)}
              required
            />
            <label htmlFor="preco_criar_servico" className={precoCriar ? "active" : ""}>
              Preço*
            </label>
          </div>
        </div>
        <button className={estiloBotao} type="submit">
          Enviar
          <i className="material-icons right">send</i>
        </button>
      </form>

      {/* Remover Serviço */}
      <form className="col s10 offset-s1" onSubmit={deletarServico}>
        <h4 className="deep-purple-text text-lighten-2">Remover Serviço</h4>
        <div className="row">
          <div className="input-field col s6">
            <input
              id="nome_remover_servico"
              type="text"
              value={nomeRemover}
              onChange={(e) => setNomeRemover(e.target.value)}
              required
            />
            <label htmlFor="nome_remover_servico" className={nomeRemover ? "active" : ""}>
              Nome*
            </label>
          </div>
        </div>
        <button className={estiloBotao} type="submit">
          Remover
          <i className="material-icons right">highlight_off</i>
        </button>
      </form>

      {/* Atualizar Serviço */}
      <form className="col s10 offset-s1">
        <h4 className="deep-purple-text text-lighten-2">Atualizar Serviço</h4>
        <div className="row">
          <div className="input-field col s6">
            <input
              id="nome_atualizar_servico"
              type="text"
              value={nomeAtualizar}
              onChange={(e) => setNomeAtualizar(e.target.value)}
              required
            />
            <label htmlFor="nome_atualizar_servico" className={nomeAtualizar ? "active" : ""}>
              Nome Antigo*
            </label>
          </div>
        </div>
        <button className={estiloBotao} type="button" onClick={abrirModalAtualizar}>
          Buscar
          <i className="material-icons right">search</i>
        </button>
      </form>

      {/* Modal de Atualização */}
      <div id="modalServico" className="modal">
        <div className="modal-content">
          <form className="col s12" onSubmit={atualizarServico}>
            <h4 className="deep-purple-text text-lighten-2">Atualizar Serviço</h4>
            <div className="row">
              <div className="input-field col s6">
                <input
                  id="novo_nome_servico"
                  type="text"
                  value={novoNome}
                  onChange={(e) => setNovoNome(e.target.value)}
                  required
                />
                <label htmlFor="novo_nome_servico" className={novoNome ? "active" : ""}>
                  Novo Nome*
                </label>
              </div>
              <div className="input-field col s6">
                <input
                  id="novo_preco_servico"
                  type="number"
                  min="0.01"
                  step="0.01"
                  value={novoPreco}
                  onChange={(e) => setNovoPreco(e.target.value)}
                  required
                />
                <label htmlFor="novo_preco_servico" className={novoPreco ? "active" : ""}>
                  Novo Preço*
                </label>
              </div>
            </div>
            <button className={estiloBotao} type="submit">
              Enviar
              <i className="material-icons right">send</i>
            </button>
          </form>
        </div>
        <div className="modal-footer">
          <a className="modal-close waves-effect waves-green btn-flat deep-purple-text text-lighten-2">
            Sair
          </a>
        </div>
      </div>
    </div>
  );
}
