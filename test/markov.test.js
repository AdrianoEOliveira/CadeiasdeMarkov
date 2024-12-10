import { describe, it, expect, beforeEach } from "vitest";
import Markov from "../js/Markov"

const Piso = 0;
const Pedra = 1;
const Parede = 2;
const Bau = 3;

describe("Markov Class Tests", () => {
  let markov;

  beforeEach(() => {
    markov = new Markov(
      null, // assets
      { getContext: () => ({}) }, // canvas mock
      10, // linhas
      10, // colunas
      [], // grid
      16, // tamanhoimagem
      "dummyImage", // imagem
      100, // numero_de_iteracoes
      {}, // modelo
      [], // newTiles
      null // metodo
    );
  });

  it("should reset training data with zeraTreino", () => {
    markov.adicionaEstado(1);
    markov.adicionaEstado(2);
    markov.zeraTreino();

    expect(markov.estados).toEqual([]);
    expect(markov.probabilidades).toEqual([]);
    expect(markov.totalGlobal).toBe(0);
  });

  it("should reset table data with zeraTabela", () => {
    markov.dados = [1, 2, 3];
    markov.zeraTabela();

    expect(markov.dados).toEqual([]);
    expect(markov.dadosBacktracking).toEqual([]);
    expect(markov.dadosEscolhidos).toEqual([]);
  });

  it("should add a new state with adicionaEstado", () => {
    markov.adicionaEstado(1);
    markov.adicionaEstado(2);

    expect(markov.estados).toEqual([1, 2]);
  });

  it("should calculate probabilities correctly", () => {
    markov.adicionaEstado(Piso);
    markov.adicionaEstado(Pedra);

    markov.soma(["Piso", "Pedra"], Piso);
    markov.soma(["Piso", "Pedra"], Piso);
    markov.soma(["Piso", "Pedra"], Pedra);

    markov.calculate();

    const probabilities = markov.getProbabilidades("PisoPedra", Piso);
    expect(probabilities).toBeCloseTo(2 / 3);
  });

  it("should handle undefined probabilities in getProbabilidades", () => {
    markov.adicionaEstado(Piso);
    markov.adicionaEstado(Pedra);

    const probability = markov.getProbabilidades("undefinedKey", Piso);
    expect(probability).toBeUndefined();
  });

  it("should convert a valid image correctly with converterImagem", () => {
    // Mock getImageData to simulate pixel data
    const canvasMock = {
      getContext: () => ({
        drawImage: () => {},
        getImageData: () => ({
          data: [255, 255, 255, 255], // Simulate white (Piso)
        }),
      }),
    };
    markov.canvas = canvasMock;

    const tiles = markov.converterImagem();
    expect(tiles).toBeTruthy();
    expect(tiles.length).toBe(markov.TAMANHOIMAGEM);
  });
});
//random seed number
//numeros aleatorios javascript
//terminar os testes
