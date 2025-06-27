import prisma from './models/prisma/client'

async function main() {
  // Produtos
  const [shampoo, condicionador, pomada] = await prisma.produto.createMany({
    data: [
      { nome: "Shampoo", preco: 29.9 },
      { nome: "Condicionador", preco: 35.5 },
      { nome: "Pomada", preco: 22.0 }
    ],
    skipDuplicates: true
  }).then(() => prisma.produto.findMany());

  // Serviços
  const [corte, barba, escova] = await prisma.servico.createMany({
    data: [
      { nome: "Corte de cabelo", preco: 45 },
      { nome: "Barba", preco: 25 },
      { nome: "Escova", preco: 60 }
    ],
    skipDuplicates: true
  }).then(() => prisma.servico.findMany());

  const criarCliente = async (
    nome: string,
    nomeSocial: string,
    genero: string,
    cpfValor: string,
    cpfData: string,
    rgValor: string,
    rgData: string,
    ddd: string,
    numero: string,
    produtos: any[] = [],
    servicos: any[] = []
  ) => {
    return await prisma.cliente.create({
      data: {
        nome,
        nomeSocial,
        genero,
        dataCadastro: new Date(),
        cpf: {
          create: {
            valor: cpfValor,
            dataEmissao: new Date(cpfData)
          }
        },
        rg: {
          create: {
            valor: rgValor,
            dataEmissao: new Date(rgData)
          }
        },
        telefone: {
          create: {
            ddd,
            numero
          }
        },
        produto: {
          connect: produtos.map(p => ({ id: p.id }))
        },
        servico: {
          connect: servicos.map(s => ({ id: s.id }))
        }
      }
    });
  };

  await criarCliente("João da Silva", "Joãozinho", "Masculino", "12345678901", "2000-01-01", "RG123456", "2001-01-01", "12", "988888888", [shampoo], [corte]);
  await criarCliente("Maria Oliveira", "Mari", "Feminino", "98765432100", "2001-02-02", "RG654321", "2002-02-02", "13", "977777777", [pomada, condicionador], [barba]);
  await criarCliente("Carlos Souza", "Carlão", "Masculino", "11122233344", "1999-03-03", "RG111222", "2000-03-03", "14", "966666666", [], [escova]);
  await criarCliente("Ana Paula", "Aninha", "Feminino", "22233344455", "1998-04-04", "RG333444", "2001-04-04", "15", "955555555", [shampoo], []);
  await criarCliente("Lucas Pereira", "Luquinhas", "Masculino", "33344455566", "1997-05-05", "RG444555", "2002-05-05", "16", "944444444", [], []);

  console.log("🌱 Banco populado com sucesso!");
}

main()
  .catch((e) => {
    console.error("Erro ao popular:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
