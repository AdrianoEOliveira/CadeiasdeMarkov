import { describe, it, expect, beforeEach } from "vitest";
import Markov from "../js/Markov.js";
import LowMarkov from "../js/LowMarkov.js";
import seedrandom from "seedrandom";

import AssetManager from "../js/AssetManager.js";
import Mixer from "../js/Mixer.js";
import xadrezCompleto from "./mapas/Xadrezmaiorcomcobertura.js"
import xadrezInvertido from "./mapas/xadrezInvertido.js";
import esperado1 from "./esperados/XadrezEsperado1.js";
import xadrez from "./mapas/xadrez.js";
import CenaJogo from "../js/CenaJogo.js";
import Mapa from "../js/Mapa.js";
import { compareMatrices } from "../js/AuxTest/comparaMatrz.js";
import { converte } from "../js/AuxTest/Conversao.js";

const Piso = 0;
const Pedra = 1;
const Parede = 2;
const Bau = 3;
const Vazio = 10;

describe("xadrez", () => {
  let lowMarkov;
  let mapa;
  let cena;

  beforeEach(async () => {
    // Criar um elemento canvas (mock)
    const canvas = document.createElement("canvas");
    const assets = new AssetManager(new Mixer(10));
  
    // Inicializar o gerador de números aleatórios (seeded)
    const rng = seedrandom("markov.");
  
    // Inicializar o LowMarkov
    lowMarkov = new LowMarkov(
      assets,
      canvas, // canvas
      20, // LINHAS
      20, // COLUNAS
      5, // GRID
      5, // TAMANHOIMAGEM
      "treino", // IMAGEM
      1, // iteracoes
      "padrao", // modelo
      "sim", // newTiles
      "low" // metodo
    );
  
    // Adicionar a semente ao LowMarkov
    lowMarkov.AdicionaSemente(rng);
    cena = new CenaJogo(canvas, assets, "", lowMarkov, 20, 20);
  });
  

  it("deve gerar listras", () => {

    cena.markov = lowMarkov
    cena.iniciaConfiguracao();
    lowMarkov.treino(converte(xadrez));
    cena.markov = lowMarkov
    cena.gerar()
    expect(compareMatrices(cena.mapa.tiles,esperado1)).toBeTruthy()
  });
});