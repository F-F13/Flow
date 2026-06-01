import Navbar from "../components/Navbar";
import ProdutoCard from "../components/ProdutoCard.jsx";
import produtosOriginais from "../data/produtos";
import "../styles/Home.css";
import camisaAmarela from "../assets/camisa-amarela.jpeg";
import camisaAzul from "../assets/camisa-azul.jpeg";
import Carrinho from "../components/Carrinho";

function Home() {
  const produtos =
    JSON.parse(localStorage.getItem("produtos")) || produtosOriginais;
  return (
    <div>
      <Navbar />

      <main
        style={{
          padding: "120px 40px 80px",
          textAlign: "center",
          marginBottom: "100px",
        }}
      >
        <div className="home-banner">
          <div
            style={{
              textAlign: "left",
              maxWidth: "500px",
            }}
          >
            <h2 className="banner-titulo">
              CHEGOU A NOVA
              <br />
              COLEÇÃO 2026
            </h2>

            <p
              style={{
                fontSize: "20px",
                marginBottom: "30px",
              }}
            >
              As novas camisas da seleção chegaram para você ir além dentro e
              fora de campo.
            </p>

            <button
              style={{
                backgroundColor: "black",
                color: "white",
                padding: "15px 30px",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "18px",
              }}
            >
              VER PRODUTOS
            </button>
          </div>

          <div className="banner-imagens">
            <img
              src={camisaAzul}
              alt="Camisa Azul"
              className="banner-camisa"
              style={{
                boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
                borderRadius: "12px",
              }}
            />

            <img
              src={camisaAmarela}
              alt="Camisa Amarela"
              className="banner-camisa"
              style={{
                boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
                borderRadius: "12px",
              }}
            />
          </div>
        </div>
      </main>

      <section
        style={{
          padding: "40px",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "30px",
            fontSize: "36px",
          }}
        >
          PRODUTOS EM DESTAQUE
        </h2>

        <div className="produtos-grid">
          {produtos.map((produto) => (
            <ProdutoCard
              key={produto.id}
              nome={produto.nome}
              preco={produto.preco}
              imagem={produto.imagem}
              estoque={produto.estoque}
              categoria={produto.categoria}
            />
          ))}
        </div>
      </section>
      <Carrinho />
    </div>
  );
}

export default Home;
