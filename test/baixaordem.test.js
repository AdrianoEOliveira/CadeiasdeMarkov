import { describe, it, expect, beforeEach } from "vitest";
import Markov from "../js/Markov.js";
import LowMarkov from "../js/LowMarkov.js";


describe("LowMarkov", () => {
    let markovInstance;
    let lowMarkov;
  
    beforeEach(() => {
      const mockCanvas = document.createElement("canvas");
  
      markovInstance = new Markov(
        [], // assets
        mockCanvas, // canvas mock
        5, // LINHAS
        5, // COLUNAS
        3, // GRID
        32, // TAMANHOIMAGEM
        [], // IMAGEM
        10, // iteracoes
        {}, // modelo
        [], // newTiles
        "mockMethod" // metodo
      );
  
      lowMarkov = new LowMarkov(markovInstance);
    });

  it("deve adicionar dados na tabela corretamente", () => {
    const vizinhosTabela = [1, 2, 3, 4, 5, 6, 7, 8];
    const probabilidades = [0.3, 0.3, 0.2, 0.2];
    const vizinho = "12345678";

    lowMarkov.adicionaDadosNaTabela(vizinhosTabela, probabilidades, vizinho);

    expect(lowMarkov.dados).toHaveLength(1);
    expect(lowMarkov.dados[0]).toEqual({
      vizinho: expect.any(Array),
      Piso: 0.3,
      Pedra: 0.3,
      Parede: 0.2,
      Bau: 0.2,
    });
  });

  it("deve retornar a tabela de dados corretamente", () => {
    // Simulando contagem no objeto base
    lowMarkov.contagem = {
      "12345678": 1,
      "23456789": 1,
    };

    const tabelaDados = lowMarkov.getTabelaDados();

    expect(tabelaDados[0]).toHaveLength(2); // Dois vizinhos processados
  });

  it("deve calcular vizinhos corretamente para ordem 8", () => {
    const tile = [
      [1, 1, 1],
      [1, 0, 1],
      [1, 1, 1],
    ];
    const vizinhos = lowMarkov.getVizinho(tile, 1, 1, 8);

    expect(vizinhos).toEqual([1, 1, 1, 1, 1, 1, 1, 1]);
  });

  it("deve realizar backtracking corretamente", () => {
    const tile = [
      [1, 1, 1],
      [1, 0, 1],
      [1, 1, 1],
    ];
    const ordemInicial = 8;

    const ordem = lowMarkov.verificaBacktracking(tile, 1, 1, ordemInicial, [0, 0, 0]);

    expect(ordem).toBe(8); // Esperado que o backtracking retorne para a ordem correta
  });

  it("deve treinar corretamente os dados", () => {
    lowMarkov.treino();

    expect(lowMarkov.totalGlobal).toBeGreaterThan(0); // O total global deve ser maior que 0 após o treino
    expect(Object.keys(lowMarkov.probabilidades)).not.toHaveLength(0); // As probabilidades devem estar definidas
  });

  it("deve determinar o próximo estado corretamente", () => {
    const anteriores = [0, 1, 2, 3, 4, 5, 6, 7];
    const proximoEstado = lowMarkov.proximo(anteriores);

    expect(typeof proximoEstado).toBe("number");
    expect(proximoEstado).toBeGreaterThanOrEqual(0);
    expect(proximoEstado).toBeLessThan(lowMarkov.estados.length);
  });
});
