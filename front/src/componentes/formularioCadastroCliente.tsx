import { useEffect, useState, FormEvent } from "react";
import M from "materialize-css";
import FormSelector from "./formularioAdicionarDadosCliente";

interface Props {
    tema: string
}

interface ClienteInput {
    nome: string
    nomeSocial: string
    genero: string
    cpf: {
        valor: string
        dataEmissao: string
    }
    rg?: {
        valor: string
        dataEmissao: string
    }[]
    telefone?: {
        ddd: string
        numero: string
    }[]
}

export default function FormularioCadastroCliente(data: Props) {
    const [rgTemp, setRgTemp] = useState<{ valor: string, dataEmissao: string }>({ valor: "", dataEmissao: "" });
    const [telTemp, setTelTemp] = useState<{ ddd: string, numero: string }>({ ddd: "", numero: "" });
    const [cpfBuscar, setCpfBuscar] = useState("");
    const [cpfRemover, setCpfRemover] = useState("");
    const [cpfAdicionarDados, setCpfAdicionarDados] = useState("");
    const [modalCliente, setModalCliente] = useState<ClienteInput | null>(null);

    const [cliente, setCliente] = useState<ClienteInput>({
        nome: "",
        nomeSocial: "",
        genero: "",
        cpf: {
            valor: "",
            dataEmissao: ""
        },
        rg: [],
        telefone: []
    });

    useEffect(() => {
        const elems = document.querySelectorAll('.modal');
        M.Modal.init(elems);

        const selects = document.querySelectorAll('select');
        M.FormSelect.init(selects);
    }, [])

    const estiloBotao = `btn waves-effect waves-light ${data.tema}`;

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const clienteCompleto = {
            ...cliente,
            rg: rgTemp.valor && rgTemp.dataEmissao ? [{ valor: rgTemp.valor, dataEmissao: rgTemp.dataEmissao }] : [],
            telefone: telTemp.ddd && telTemp.numero ? [{ ddd: telTemp.ddd, numero: telTemp.numero }] : []
        };

        try {
            const response = await fetch("http://localhost:3069/clientes", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(clienteCompleto)
            });
            if (!response.ok) throw new Error("Erro ao cadastrar cliente");
            M.toast({ html: "Cliente cadastrado com sucesso!", classes: "green" });
        } catch {
            M.toast({ html: "Erro ao cadastrar cliente", classes: "red" });
        }
    };

    const handleRemoverCliente = async () => {
        try {
            const response = await fetch(`http://localhost:3069/clientes/cpf/${cpfRemover}`, {
                method: "DELETE"
            });
            if (!response.ok) throw new Error("Erro ao remover cliente");
            M.toast({ html: "Cliente removido com sucesso!", classes: "green" });
        } catch {
            M.toast({ html: "Erro ao remover cliente", classes: "red" });
        }
    }

    const buscarClienteParaAtualizar = async () => {
        try {
            const response = await fetch(`http://localhost:3069/clientes/cpf/${cpfBuscar}`);
            if (!response.ok) throw new Error("Cliente não encontrado");
            const clienteData = await response.json();
            setModalCliente({
                nome: clienteData.nome,
                nomeSocial: clienteData.nomeSocial,
                genero: clienteData.genero,
                cpf: {
                    valor: clienteData.cpf.valor,
                    dataEmissao: clienteData.cpf.dataEmissao.substring(0, 10)
                }
            });
            const modal = document.getElementById("modal1");
            if (modal) M.Modal.getInstance(modal).open();
        } catch {
            M.toast({ html: "Erro ao buscar cliente", classes: "red" });
        }
    };

    const atualizarCliente = async () => {
        if (!modalCliente) return;
        try {
            const response = await fetch(`http://localhost:3069/clientes/cpf/${modalCliente.cpf.valor}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(modalCliente)
            });
            if (!response.ok) throw new Error("Erro ao atualizar cliente");
            M.toast({ html: "Cliente atualizado com sucesso!", classes: "green" });
            const modal = document.getElementById("modal1");
            if (modal) M.Modal.getInstance(modal).close();
        } catch {
            M.toast({ html: "Erro ao atualizar cliente", classes: "red" });
        }
    };

    return (
        <div className="row">
            <form className="col s10 offset-s1" onSubmit={handleSubmit}>
                <h4 className="deep-purple-text text-lighten-2">Criar Cliente</h4>
                <div className="row">
                    <div className="input-field col s6">
                        <input type="text" required onChange={e => setCliente({ ...cliente, nome: e.target.value })} />
                        <label className="deep-purple-text text-lighten-2">Nome Completo*</label>
                    </div>
                    <div className="input-field col s6">
                        <input type="text" onChange={e => setCliente({ ...cliente, nomeSocial: e.target.value })} />
                        <label className="deep-purple-text text-lighten-2">Nome Social*</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s6">
                        <input type="text" onChange={e => setCliente({ ...cliente, cpf: { ...cliente.cpf, valor: e.target.value } })} />
                        <label className="deep-purple-text text-lighten-2">CPF*</label>
                    </div>
                    <div className="input-field col s4">
                        <input type="date" onChange={e => setCliente({ ...cliente, cpf: { ...cliente.cpf, dataEmissao: e.target.value } })} />
                        <label className="deep-purple-text text-lighten-2">Data de Emissão do CPF*</label>
                    </div>
                    <div className="input-field col s2">
                        <select defaultValue="" onChange={e => setCliente({ ...cliente, genero: e.target.value })}>
                            <option value="" disabled>Escolha uma opção</option>
                            <option value="Masculino">Masculino</option>
                            <option value="Feminino">Feminino</option>
                        </select>
                        <label className="deep-purple-text text-lighten-2">Gênero*</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s6">
                        <input type="text" onChange={e => setRgTemp({ ...rgTemp, valor: e.target.value })} />
                        <label className="deep-purple-text text-lighten-2">RG</label>
                    </div>
                    <div className="input-field col s6">
                        <input type="date" onChange={e => setRgTemp({ ...rgTemp, dataEmissao: e.target.value })} />
                        <label className="deep-purple-text text-lighten-2">Data de Emissão do RG</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s2">
                        <input type="text" onChange={e => setTelTemp({ ...telTemp, ddd: e.target.value })} />
                        <label className="deep-purple-text text-lighten-2">DDD</label>
                    </div>
                    <div className="input-field col s10">
                        <input type="text" onChange={e => setTelTemp({ ...telTemp, numero: e.target.value })} />
                        <label className="deep-purple-text text-lighten-2">Telefone</label>
                    </div>
                </div>
                <div className="row">
                    <div className="col s12">
                        <button className={estiloBotao} type="submit">Enviar
                            <i className="material-icons right">send</i>
                        </button>
                    </div>
                </div>
            </form>

            {/* Atualizar Cliente */}
            <form className="col s10 offset-s1">
                <h4 className="deep-purple-text text-lighten-2">Atualizar Cliente</h4>
                <div className="row">
                    <div className="input-field col s6">
                        <input type="text" className="validate" onChange={e => setCpfBuscar(e.target.value)} />
                        <label className="deep-purple-text text-lighten-2">CPF*</label>
                    </div>
                </div>
                <button className={estiloBotao} type="button" onClick={buscarClienteParaAtualizar}>
                    Buscar
                    <i className="material-icons right">send</i>
                </button>
            </form>

            <div id="modal1" className="modal">
                <div className={`modal-content deep-purple-text text-lighten-2`}>
                    <h4 className="deep-purple-text text-lighten-2">Atualizar Cliente</h4>
                    <div className="input-field">
                        <input
                            type="text"
                            value={modalCliente?.nome || ""}
                            onChange={e => setModalCliente(modalCliente ? { ...modalCliente, nome: e.target.value } : null)}
                        />
                        <label className="active deep-purple-text text-lighten-2">Nome</label>
                    </div>
                    <div className="input-field">
                        <input
                            type="text"
                            value={modalCliente?.nomeSocial || ""}
                            onChange={e => setModalCliente(modalCliente ? { ...modalCliente, nomeSocial: e.target.value } : null)}
                        />
                        <label className="active deep-purple-text text-lighten-2">Nome Social</label>
                    </div>
                    <div className="input-field">
                        <select
                            className="browser-default"
                            value={modalCliente?.genero || ""}
                            onChange={e => setModalCliente(modalCliente ? { ...modalCliente, genero: e.target.value } : null)}
                        >
                            <option value="">Escolha o gênero</option>
                            <option value="Masculino">Masculino</option>
                            <option value="Feminino">Feminino</option>
                        </select>
                        <label className="active deep-purple-text text-lighten-2">Gênero</label>
                    </div>
                </div>
                <div className="modal-footer">
                    <button onClick={atualizarCliente} className={`modal-close waves-effect waves-light btn ${data.tema}`}>
                        Salvar
                    </button>
                </div>
            </div>



            {/* Adicionar Dados ao Cliente */}
            <form className="col s10 offset-s1">
                <h4 className="deep-purple-text text-lighten-2">Adicionar Dados ao Cliente</h4>
                <div className="row">
                    <div className="input-field col s6">
                        <input type="text" className="validate" onChange={e => setCpfAdicionarDados(e.target.value)} />
                        <label className="deep-purple-text text-lighten-2">CPF*</label>
                    </div>
                </div>
                <div className="input-field col s6">
                    <FormSelector cpf={cpfAdicionarDados} tema={data.tema} />

                </div>
            </form>

            {/* Remover Cliente */}
            <form className="col s10 offset-s1" onSubmit={(e) => { e.preventDefault(); handleRemoverCliente(); }}>
                <h4 className="deep-purple-text text-lighten-2">Remover Cliente</h4>
                <div className="row">
                    <div className="input-field col s6">
                        <input type="text" className="validate" onChange={e => setCpfRemover(e.target.value)} />
                        <label className="deep-purple-text text-lighten-2">CPF*</label>
                    </div>
                </div>
                <div className="row">
                    <div className="col s12">
                        <button className={estiloBotao} type="submit">Remover
                            <i className="material-icons right">highlight_off</i>
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
