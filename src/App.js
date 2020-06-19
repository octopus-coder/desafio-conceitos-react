import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    const fetchRepositories = async () => {
      const {data} = await api.get('repositories');
      setRepositories(data);
    }
    fetchRepositories();
  }, []);

  // Adicionar um repositório a sua API: Deve ser capaz de adicionar um novo item na sua API através de um botão com o texto Adicionar e, após a criação, deve ser capaz de exibir o nome dele após o cadastro.
  async function handleAddRepository() {
    const { data } = await api.post('repositories', {
      title: `proyect: ${Date.now()}`,
      url: "https://github.com/octopus-coder/desafio-conceitos-react",
      techs: ["ReactJS"]
    })
    setRepositories([...repositories, data]);
  }

  // Remover um repositório da sua API: Para cada item da sua lista, deve possuir um botão com o texto Remover que, ao clicar, irá chamar uma função para remover esse item da lista do seu frontend e da sua API.
  async function handleRemoveRepository(id) {
    const repoIndex = repositories.findIndex(repo => repo.id === id);
    if (repoIndex < 0) return;
    const { status } = await api.delete(`repositories/${id}`);
    if (status === 204) {
      const tempRepositories = [...repositories];
      tempRepositories.splice(repoIndex, 1);
      setRepositories(tempRepositories);
    }
  }

  return (
    <div>
      {/* Listar os repositórios da sua API: Deve ser capaz de criar uma lista com o campo title de todos os repositórios que estão cadastrados na sua API. */}
      <ul data-testid="repository-list">
        {repositories.map(repository => {
          return (
            <li key={repository.id}>
              {repository.title}
              <button text="Remover" onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </li>
          );
        })}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
