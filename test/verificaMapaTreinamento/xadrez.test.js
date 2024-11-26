import { expect, test } from 'vitest'
import { getByText } from '@testing-library/dom'
import path from 'path';

import mapaTeste from '../mapas/xadrez.js'
import { converte } from '../../js/AuxTest/Conversao.js'
import { compareMatrices } from '../../js/AuxTest/comparaMatrz.js'


import AssetManager from "../../js/AssetManager.js"
import Mixer from "../../js/Mixer.js";
import Markov from "../../js/Markov.js";

const Piso = 0;
const Pedra = 1;
const Parede = 2;
const Bau = 3;


test('leitura mapa xadrez', () => {
    const assets = new AssetManager(new Mixer(10));

    assets.adicionaImagem("treino","assets/xadrez.bmp");
    document.body.innerHTML = `
    <html>
      <body>
        <canvas id="canvasMarkov"></canvas>
      </body>
    </html>
  `;

    // Agora, document.getElementById funcionará
    let canvasMarkov = document.getElementById("canvasMarkov");
    expect(canvasMarkov).not.toBeNull(); // O teste verifica que o elemento existe
//canvasMarkov.setAttribute("hidden", "hidden");
canvasMarkov.width = 50;
canvasMarkov.height = 50;

let markov = new Markov(
    assets,
    canvasMarkov,
    0,
    0,
    0,
    0,
    "treino",
    0,
    "",
    "",
    ""
  );

  const img = new Image();
  img.src = "assets/xadrez.bmp";
  img.onload = function () {

  let mapalido = markov.converterImagem()
  let mapa = converte(mapaTeste)
  expect(compareMatrices(mapa,mapalido)).toBe(true)
  }
})
