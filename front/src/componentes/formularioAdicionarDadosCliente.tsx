import { useState } from "react";

const FormSelector = () => {
    const [selectedOption, setSelectedOption] = useState<string>("");

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedOption(event.target.value);
    };

    return (
        <div>
            <select value={selectedOption} onChange={handleChange} defaultValue="">
                <option value="" disabled>Escolha uma opção</option>
                <option value="Telefone">Telefone</option>
                <option value="RG">RG</option>
                <option value="Serviço Consumido">Serviço Consumido</option>
                <option value="Produto Consumido">Produto Consumido</option>
            </select>
            <label className="deep-purple-text text-lighten-2">Tipo de Dado*</label>

            {selectedOption === "Telefone" && (
                <form>
                    <div className="input-field col s2">
                        <input id="addDDD" type="number" className="validate" />
                        <label htmlFor="adddDDD" className="deep-purple-text text-lighten-2">DDD</label>
                    </div>
                    <div className="input-field col s10">
                        <input id="addTelefone" type="number" className="validate" />
                        <label htmlFor="addTelefone" className="deep-purple-text text-lighten-2">Telefone</label>
                    </div>
                </form>
            )}

            {selectedOption === "RG" && (
                <form>
                    <div className="input-field col s12">
                        <input id="addCpf" type="text" className="validate" />
                        <label htmlFor="cpf" className="deep-purple-text text-lighten-2">RG*</label>
                    </div>
                    <div className="input-field col s12">
                        <input id="addData_emissao_cpf" type="date" className="validate" />
                        <label htmlFor="data_emissao_cpf" className="deep-purple-text text-lighten-2">Data de Emissão do RG*</label>
                    </div>
                </form>
            )}

            {selectedOption === "Serviço Consumido" && (
                <form>
                    <label className="deep-purple-text text-lighten-2">Nome do Serviço:</label>
                    <input type="text" placeholder="Descrição do serviço" />
                </form>
            )}

            {selectedOption === "Produto Consumido" && (
                <form>
                    <label className="deep-purple-text text-lighten-2">Nome do Produto:</label>
                    <input type="text" placeholder="Nome do produto" />
                </form>
            )}
        </div>
    );
};

export default FormSelector;
