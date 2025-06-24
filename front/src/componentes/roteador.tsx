import { useState } from "react";
import BarraNavegacao from "./barraNavegacao";
import FormularioCadastroCliente from "./formularioCadastroCliente";
import Consulta from "./consulta";
import FormularioCadastroServico from "./formularioCadastroServico";
import FormularioCadastroProduto from "./formularioCadastroProduto";

export default function Roteador() {
    const [tela, setTela] = useState("Consulta")


    function selecionarView(novaTela: string, evento: Event) {
        evento.preventDefault()
        console.log(novaTela);
        setTela(novaTela)
    }

    let barraNavegacao = <BarraNavegacao seletorView={selecionarView} tema="purple darken-4" botoes={['Consulta', 'Cadastro Cliente', 'Cadastro Serviço', 'Cadastro Produto']} />
    if (tela === 'Consulta') {
        return (
            <>
                {barraNavegacao}
                <Consulta tema="purple darken-4" />
            </>
        )
    } else if (tela === 'Cadastro Cliente') {
        return (
            <>
                {barraNavegacao}
                <FormularioCadastroCliente tema="purple darken-4" />
            </>
        )
    } else if (tela === 'Cadastro Serviço') {
        return (
            <>
                {barraNavegacao}
                <FormularioCadastroServico tema="purple darken-4" />
            </>
        )
    } else if (tela === 'Cadastro Produto') {
        return (
            <>
                {barraNavegacao}
                <FormularioCadastroProduto tema="purple darken-4" />
            </>
        )
    }
    return <></>

}