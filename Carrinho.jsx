import { useContext, useState } from "react";
import { CarrinhoContext } from "../context/CarrinhoContext";

function Carrinho() {
  const {
    carrinho,
    removerProduto,
    limparCarrinho,
  } = useContext(CarrinhoContext);

  const [aberto, setAberto] = useState(false);

  const total = carrinho.reduce(
    (soma, item) => soma + item.preco,
    0
  );

  const produtosAgrupados = Object.values(
    carrinho.reduce((acc, item) => {
      const chave = `${item.nome}-${item.tamanho || ""}`;

      if (!acc[chave]) {
        acc[chave] = {
          ...item,
          quantidade: 1,
        };
      } else {
        acc[chave].quantidade += 1;
      }

      return acc;
    }, {})
  );

  const finalizarPedido = () => {
    if (carrinho.length === 0) {
      alert("Seu carrinho está vazio.");
      return;
    }

    const nomeCliente = prompt("Digite seu nome:");

    if (!nomeCliente) return;

    let mensagem = `Olá!\n\n`;
    mensagem += `Meu nome é ${nomeCliente}.\n\n`;
    mensagem += `Gostaria de fazer o seguinte pedido:\n\n`;

    produtosAgrupados.forEach((item) => {
      mensagem += `• ${item.nome}`;

      if (item.tamanho) {
        mensagem += ` (${item.tamanho.toUpperCase()})`;
      }

      mensagem += ` x${item.quantidade}`;
      mensagem += ` - R$ ${(item.preco * item.quantidade).toFixed(2)}\n`;
    });

    mensagem += `\nTotal: R$ ${total.toFixed(2)}\n\n`;
    mensagem += `Aguardo retorno.`;

    const link = `https://wa.me/5586995454880?text=${encodeURIComponent(
      mensagem
    )}`;

    window.open(link, "_blank");

    limparCarrinho();
    setAberto(false);
  };

  return (
    <>
      {!aberto && (
        <button
          onClick={() => setAberto(true)}
          style={{
            position: "fixed",
            right: "20px",
            bottom: "20px",
            width: "70px",
            height: "70px",
            borderRadius: "50%",
            border: "none",
            backgroundColor: "#25D366",
            color: "white",
            fontSize: "24px",
            cursor: "pointer",
            boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
            zIndex: 9999,
            fontWeight: "bold",
          }}
        >
          🛒
          <br />
          {carrinho.length}
        </button>
      )}

      {aberto && (
        <div
          style={{
            position: "fixed",
            right: "20px",
            bottom: "20px",
            width: "420px",
            maxHeight: "80vh",
            overflowY: "auto",
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "20px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
            zIndex: 9999,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "15px",
            }}
          >
            <h3>🛒 Carrinho ({carrinho.length})</h3>

            <button
              onClick={() => setAberto(false)}
              style={{
                border: "none",
                background: "none",
                cursor: "pointer",
                fontSize: "22px",
                fontWeight: "bold",
              }}
            >
              ✖
            </button>
          </div>

          {carrinho.length === 0 ? (
            <p>Carrinho vazio.</p>
          ) : (
            produtosAgrupados.map((item, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "12px",
                  paddingBottom: "10px",
                  borderBottom: "1px solid #eee",
                }}
              >
                <span
                  style={{
                    flex: 1,
                    marginRight: "10px",
                    fontSize: "14px",
                  }}
                >
                  {item.nome}

                  {item.tamanho && (
                    <> ({item.tamanho.toUpperCase()})</>
                  )}

                  {" x"}
                  {item.quantidade}

                  <br />

                  <strong>
                    R$ {(item.preco * item.quantidade).toFixed(2)}
                  </strong>
                </span>

                <button
                  onClick={() => removerProduto(index)}
                  style={{
                    border: "none",
                    background: "none",
                    cursor: "pointer",
                    color: "red",
                    fontWeight: "bold",
                    fontSize: "18px",
                  }}
                >
                  ❌
                </button>
              </div>
            ))
          )}

          <hr />

          <h4>
            Total: <strong>R$ {total.toFixed(2)}</strong>
          </h4>

          <button
            onClick={finalizarPedido}
            style={{
              width: "100%",
              marginTop: "15px",
              padding: "14px",
              backgroundColor: "#25D366",
              color: "white",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: "16px",
            }}
          >
            Finalizar Pedido
          </button>
        </div>
      )}
    </>
  );
}

export default Carrinho;