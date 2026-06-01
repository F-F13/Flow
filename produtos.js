import camisaAzul from "../assets/camisa-azul.jpeg";
import camisaAmarela from "../assets/camisa-amarela.jpeg";
import canelito from "../assets/canelito.jpeg";
import meiaAntiderrapante from "../assets/meia-antiderrapante.jpeg";
import miniCaneleira from "../assets/mini-caneleira.jpeg";
import bolsaNecessaire from "../assets/bolsa-necessaire.jpeg";

const produtos = [
  {
    id: 1,
    nome: "Camisa Seleção Modelo Azul",
    imagem: camisaAzul,
    preco: 135.0,
    estoque: 12,
    categoria: "camisa",
  },
  {
    id: 2,
    nome: "Camisa Seleção Modelo Amarelo",
    imagem: camisaAmarela,
    preco: 135.0,
    estoque: 10,
    categoria: "camisa",
  },
  {
    id: 3,
    nome: "Canelito",
    imagem: canelito,
    preco: 22.0,
    estoque: 20,
    categoria: "acessorio",
  },
  {
    id: 4,
    nome: "Meia Antiderrapante",
    imagem: meiaAntiderrapante,
    preco: 18.0,
    estoque: 15,
    categoria: "acessorio",
  },
  {
    id: 5,
    nome: "Mini Caneleira",
    imagem: miniCaneleira,
    preco: 25.0,
    estoque: 8,
    categoria: "acessorio",
  },
  {
    id: 6,
    nome: "Bolsa Necessaire Esportiva",
    imagem: bolsaNecessaire,
    preco: 69.9,
    estoque: 5,
    categoria: "acessorio",
  },
];

export default produtos;