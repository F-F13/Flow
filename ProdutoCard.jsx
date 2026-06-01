import { useContext } from "react";
import { CarrinhoContext } from "../context/CarrinhoContext";

function ProdutoCard({ nome, preco, imagem, estoque, categoria }) {
  const contexto = useContext(CarrinhoContext);

  if (!contexto) {
    return (
      <div
        style={{
          padding: "20px",
          color: "red",
          textAlign: "center",
        }}
      >
        Erro: CarrinhoContext não encontrado.
      </div>
    );
  }

  const { adicionarProduto } = contexto;

  return (
    <div
      style={{
        border: "1px solid #e5e5e5",
        borderRadius: "24px",
        overflow: "hidden",
        backgroundColor: "white",
        boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
        transition: "all 0.3s ease",
      }}
    >
      <div
        style={{
          padding: "15px",
        }}
      >
        {imagem ? (
          <img
            src={imagem}
            alt={nome}
            style={{
              width: "100%",
              height: "300px",
              objectFit: "contain",
              borderRadius: "20px",
              display: "block",
              backgroundColor: "#f8f8f8",
            }}
          />
        ) : (
          <div
            style={{
              width: "100%",
              height: "300px",
              borderRadius: "20px",
              backgroundColor: "#f8f8f8",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "#999",
              fontWeight: "bold",
            }}
          >
            SEM IMAGEM
          </div>
        )}
      </div>

      <div
        style={{
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          height: "250px",
        }}
      >
        <h3
          style={{
            fontSize: "22px",
            marginBottom: "10px",
            minHeight: "60px",
            lineHeight: "1.2",
          }}
        >
          {nome}
        </h3>

        <div
          style={{
            display: "inline-block",
            backgroundColor: "#e8f7ec",
            color: "#1f7a3d",
            padding: "6px 12px",
            borderRadius: "20px",
            fontSize: "14px",
            fontWeight: "bold",
            marginBottom: "15px",
            width: "fit-content",
          }}
        >
          📦 {estoque} unidades disponíveis
        </div>

        <p
          style={{
            fontWeight: "bold",
            fontSize: "32px",
            marginBottom: "20px",
          }}
        >
          R$ {preco.toFixed(2)}
        </p>

        <div
          style={{
            marginTop: "auto",
          }}
        >
          <button
            onClick={() => {
              let tamanho = "";

              if (categoria === "camisa") {
                tamanho = prompt("Escolha o tamanho:\n\nP\nM\nG\nGG");

                if (!tamanho) return;
              }

              adicionarProduto({
                nome,
                preco,
                imagem,
                estoque,
                categoria,
                tamanho,
              });
            }}
            style={{
              width: "100%",
              padding: "15px",
              backgroundColor: "black",
              color: "white",
              border: "none",
              borderRadius: "12px",
              cursor: "pointer",
              fontSize: "18px",
              fontWeight: "bold",
            }}
          >
            Adicionar ao Carrinho
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProdutoCard;
