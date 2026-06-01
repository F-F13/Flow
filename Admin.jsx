import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import produtosOriginais from "../data/produtos";

function Admin() {
  const navigate = useNavigate();

  const [produtos, setProdutos] = useState(() => {
    const produtosSalvos = localStorage.getItem("produtos");

    return produtosSalvos
      ? JSON.parse(produtosSalvos)
      : produtosOriginais;
  });

  const [editando, setEditando] = useState(null);

  useEffect(() => {
    localStorage.setItem(
      "produtos",
      JSON.stringify(produtos)
    );
  }, [produtos]);

  const [novoProduto, setNovoProduto] = useState({
    nome: "",
    preco: "",
    estoque: "",
    categoria: "acessorio",
    imagem: "",
  });

  const atualizarProduto = (id, campo, valor) => {
    setProdutos(
      produtos.map((produto) =>
        produto.id === id
          ? {
              ...produto,
              [campo]:
                campo === "preco" || campo === "estoque"
                  ? Number(valor)
                  : valor,
            }
          : produto
      )
    );
  };

  const adicionarProduto = () => {
    if (
      !novoProduto.nome ||
      !novoProduto.preco ||
      !novoProduto.estoque
    ) {
      alert("Preencha todos os campos.");
      return;
    }

    const produto = {
      id: Date.now(),
      nome: novoProduto.nome,
      preco: Number(novoProduto.preco),
      estoque: Number(novoProduto.estoque),
      categoria: novoProduto.categoria,
      imagem: novoProduto.imagem,
    };

    setProdutos([...produtos, produto]);

    setNovoProduto({
      nome: "",
      preco: "",
      estoque: "",
      categoria: "acessorio",
      imagem: "",
    });
  };

  const removerProduto = (id) => {
    if (
      window.confirm(
        "Tem certeza que deseja excluir este produto?"
      )
    ) {
      setProdutos(
        produtos.filter(
          (produto) => produto.id !== id
        )
      );
    }
  };

  const carregarImagem = (e) => {
    const arquivo = e.target.files[0];

    if (!arquivo) return;

    const leitor = new FileReader();

    leitor.onloadend = () => {
      setNovoProduto({
        ...novoProduto,
        imagem: leitor.result,
      });
    };

    leitor.readAsDataURL(arquivo);
  };

  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "40px",
      }}
    >
      <h1>Painel Administrativo</h1>

      <button
        onClick={() => {
          localStorage.removeItem("adminLogado");
          navigate("/login-admin");
        }}
        style={{
          backgroundColor: "#dc3545",
          color: "white",
          border: "none",
          padding: "10px 20px",
          borderRadius: "8px",
          cursor: "pointer",
          marginBottom: "20px",
        }}
      >
        Sair
      </button>

      <div
        style={{
          border: "1px solid #ddd",
          borderRadius: "12px",
          padding: "20px",
          marginBottom: "30px",
        }}
      >
        <h2>Adicionar Produto</h2>

        <input
          type="text"
          placeholder="Nome"
          value={novoProduto.nome}
          onChange={(e) =>
            setNovoProduto({
              ...novoProduto,
              nome: e.target.value,
            })
          }
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
          }}
        />

        <input
          type="number"
          placeholder="Preço"
          value={novoProduto.preco}
          onChange={(e) =>
            setNovoProduto({
              ...novoProduto,
              preco: e.target.value,
            })
          }
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
          }}
        />

        <input
          type="number"
          placeholder="Estoque"
          value={novoProduto.estoque}
          onChange={(e) =>
            setNovoProduto({
              ...novoProduto,
              estoque: e.target.value,
            })
          }
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
          }}
        />

        <select
          value={novoProduto.categoria}
          onChange={(e) =>
            setNovoProduto({
              ...novoProduto,
              categoria: e.target.value,
            })
          }
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <option value="camisa">Camisa</option>
          <option value="acessorio">Acessório</option>
        </select>

        <input
          type="file"
          accept="image/*"
          onChange={carregarImagem}
          style={{
            width: "100%",
            marginBottom: "10px",
          }}
        />

        {novoProduto.imagem && (
          <img
            src={novoProduto.imagem}
            alt="Prévia"
            style={{
              width: "150px",
              borderRadius: "10px",
              marginBottom: "10px",
              display: "block",
            }}
          />
        )}

        <button
          onClick={adicionarProduto}
          style={{
            backgroundColor: "#25D366",
            color: "white",
            border: "none",
            padding: "12px 20px",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Adicionar Produto
        </button>
      </div>

      <h2>Produtos Cadastrados</h2>

      {produtos.map((produto) => (
        <div
          key={produto.id}
          style={{
            border: "1px solid #ddd",
            borderRadius: "12px",
            padding: "20px",
            marginBottom: "15px",
          }}
        >
          {editando === produto.id ? (
            <>
              <input
                type="text"
                value={produto.nome}
                onChange={(e) =>
                  atualizarProduto(
                    produto.id,
                    "nome",
                    e.target.value
                  )
                }
                style={{
                  width: "100%",
                  padding: "10px",
                  marginBottom: "10px",
                }}
              />

              <input
                type="number"
                value={produto.preco}
                onChange={(e) =>
                  atualizarProduto(
                    produto.id,
                    "preco",
                    e.target.value
                  )
                }
                style={{
                  width: "100%",
                  padding: "10px",
                  marginBottom: "10px",
                }}
              />

              <input
                type="number"
                value={produto.estoque}
                onChange={(e) =>
                  atualizarProduto(
                    produto.id,
                    "estoque",
                    e.target.value
                  )
                }
                style={{
                  width: "100%",
                  padding: "10px",
                  marginBottom: "10px",
                }}
              />

              <button
                onClick={() => setEditando(null)}
                style={{
                  backgroundColor: "#25D366",
                  color: "white",
                  border: "none",
                  padding: "10px 20px",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                Salvar
              </button>
            </>
          ) : (
            <>
              <h3>{produto.nome}</h3>

              <p>
                <strong>Preço:</strong> R$ {produto.preco}
              </p>

              <p>
                <strong>Estoque:</strong> {produto.estoque}
              </p>

              <p>
                <strong>Categoria:</strong> {produto.categoria}
              </p>

              <button
                onClick={() =>
                  setEditando(produto.id)
                }
                style={{
                  backgroundColor: "black",
                  color: "white",
                  border: "none",
                  padding: "10px 20px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  marginRight: "10px",
                }}
              >
                Editar
              </button>

              <button
                onClick={() =>
                  removerProduto(produto.id)
                }
                style={{
                  backgroundColor: "#dc3545",
                  color: "white",
                  border: "none",
                  padding: "10px 20px",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                Excluir
              </button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default Admin;