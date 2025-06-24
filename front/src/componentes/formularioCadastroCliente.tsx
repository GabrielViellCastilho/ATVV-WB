import { useEffect } from "react";
import M from "materialize-css";
import FormSelector from "./formularioAdicionarDadosCliente";

interface Props {
    tema: string
}

export default function FormularioCadastroCliente(data:Props){

    useEffect(() => {
        const elems = document.querySelectorAll('.modal');
        M.Modal.init(elems);

        const selects = document.querySelectorAll('select');
        M.FormSelect.init(selects);

    }, [])

        let estiloBotao = `btn waves-effect waves-light ${data.tema}`;
        return (

            <div className="row">
                <form className="col s10 offset-s1">
                    <h4 className="deep-purple-text text-lighten-2">Criar Cliente</h4>
                    <div className="row">
                        <div className="input-field col s6">
                            <input id="nome_completo" type="text" className="validate" required />
                            <label htmlFor="nome_completo" className="deep-purple-text text-lighten-2">Nome Completo*</label>
                        </div>
                        <div className="input-field col s6">
                            <input id="nome_social" type="text" className="validate" />
                            <label htmlFor="nome_social" className="deep-purple-text text-lighten-2">Nome Social*</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s6">
                            <input id="cpf" type="text" className="validate" />
                            <label htmlFor="cpf" className="deep-purple-text text-lighten-2">CPF*</label>
                        </div>
                        <div className="input-field col s4">
                            <input id="data_emissao_cpf" type="date" className="validate" />
                            <label htmlFor="data_emissao_cpf" className="deep-purple-text text-lighten-2">Data de Emissão do CPF*</label>
                        </div>
                        <div className="input-field col s2">
                            <select defaultValue="">
                                <option value="" disabled>Escolha uma opção</option>
                                <option value="M">Masculino</option>
                                <option value="F">Feminino</option>
                            </select>
                            <label className="deep-purple-text text-lighten-2">Genêro*</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s6">
                            <input id="cpf" type="text" className="validate" />
                            <label htmlFor="cpf" className="deep-purple-text text-lighten-2">RG</label>
                        </div>
                        <div className="input-field col s6">
                            <input id="data_emissao_cpf" type="date" className="validate" />
                            <label htmlFor="data_emissao_cpf" className="deep-purple-text text-lighten-2">Data de Emissão do RG</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s2">
                            <input id="DDD" type="number" className="validate" />
                            <label htmlFor="DDD" className="deep-purple-text text-lighten-2">DDD</label>
                        </div>
                        <div className="input-field col s10">
                            <input id="telefone" type="number" className="validate" />
                            <label htmlFor="telefone" className="deep-purple-text text-lighten-2">Telefone</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col s12">
                            <button className={estiloBotao} type="submit" name="action">Enviar
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
                            <input id="nome_completo" type="text" className="validate" required />
                            <label htmlFor="nome_completo" className="deep-purple-text text-lighten-2">CPF*</label>
                        </div>
                    </div>
                    <button className={estiloBotao} type="button" onClick={() => {
                        const modal = document.getElementById('modal1');
                        if (modal) {
                            const instance = M.Modal.getInstance(modal);
                            instance.open();
                        }
                    }}>
                        Buscar
                        <i className="material-icons right">send</i>
                    </button>

                </form>

                {/* Adicionar Dados ao Cliente */}
                <form className="col s10 offset-s1">
                    <h4 className="deep-purple-text text-lighten-2">Adicionar Dados ao Cliente</h4>
                    <div className="row">
                        <div className="input-field col s6">
                            <input id="cpf_adicionar_dados" type="text" className="validate" required />
                            <label htmlFor="cpf_adicionar_dados" className="deep-purple-text text-lighten-2">CPF*</label>
                        </div>
                    </div>
                    <div className="input-field col s6">

                        <FormSelector/>


                    </div>
                    <div className="col s12">
                    <button className={estiloBotao} type="button">
                        Enviar
                        <i className="material-icons right">send</i>
                    </button>
                    </div>

                </form>

                {/* Remover Cliente */}
                <form className="col s10 offset-s1">
                    <h4 className="deep-purple-text text-lighten-2">Remover Cliente</h4>
                    <div className="row">
                        <div className="input-field col s6">
                            <input id="cpf_remover" type="text" className="validate" required />
                            <label htmlFor="cpf_remover" className="deep-purple-text text-lighten-2">CPF*</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col s12">
                            <button className={estiloBotao} type="submit" name="action">Remover
                                <i className="material-icons right">highlight_off</i>
                            </button>
                        </div>
                    </div>
                </form>

                {/* <!-- Modal Structure --> */}
                <div id="modal1" className="modal">
                    <div className="modal-content">
                        <form className="col s12">
                            <h4 className="deep-purple-text text-lighten-2">Atualizar Cliente</h4>
                            <div className="row">
                                <div className="input-field col s6">
                                    <input id="nome_completo" type="text" className="validate" required />
                                    <label htmlFor="nome_completo" className="deep-purple-text text-lighten-2">Nome Completo*</label>
                                </div>
                                <div className="input-field col s6">
                                    <input id="nome_social" type="text" className="validate" />
                                    <label htmlFor="nome_social" className="deep-purple-text text-lighten-2">Nome Social*</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s6">
                                    <input id="cpf" type="text" className="validate" />
                                    <label htmlFor="cpf" className="deep-purple-text text-lighten-2">CPF*</label>
                                </div>
                                <div className="input-field col s4">
                                    <input id="data_emissao_cpf" type="date" className="validate" />
                                    <label htmlFor="data_emissao_cpf" className="deep-purple-text text-lighten-2">Data de Emissão do CPF*</label>
                                </div>
                                <div className="input-field col s2">
                                    <select defaultValue="">
                                        <option value="" disabled>Escolha uma opção</option>
                                        <option value="M">Masculino</option>
                                        <option value="F">Feminino</option>
                                    </select>
                                    <label className="deep-purple-text text-lighten-2">Genêro*</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s6">
                                    <input id="cpf" type="text" className="validate" />
                                    <label htmlFor="cpf" className="deep-purple-text text-lighten-2">RG</label>
                                </div>
                                <div className="input-field col s6">
                                    <input id="data_emissao_cpf" type="date" className="validate" />
                                    <label htmlFor="data_emissao_cpf" className="deep-purple-text text-lighten-2">Data de Emissão do RG</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s2">
                                    <input id="DDD" type="number" className="validate" />
                                    <label htmlFor="DDD" className="deep-purple-text text-lighten-2">DDD</label>
                                </div>
                                <div className="input-field col s10">
                                    <input id="telefone" type="number" className="validate" />
                                    <label htmlFor="telefone" className="deep-purple-text text-lighten-2">Telefone</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col s12">
                                    <button className={estiloBotao} type="submit" name="action">Atualizar
                                        <i className="material-icons right">send</i>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <a className="modal-close waves-effect waves-green btn-flat deep-purple-text text-lighten-2">Sair</a>
                    </div>
                </div>

            </div>


        )
    }