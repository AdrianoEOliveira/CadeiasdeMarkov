export default class Markov {
  constructor(assets,canvas) {
    this.tiles = [];
    this.possibilidades = [];
    this.mapa = [];
    this.assets = assets;
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
  }
  RandomIndex(arr) {
    let randomIndex = Math.floor(Math.random() * arr.length);
    if (arr[randomIndex] > 0) {
      return randomIndex;
    } else {
      return this.RandomIndex(arr);
    }
  }
  GenerateRandomMap(primeiroTile) {
    let anterior = primeiroTile;
    for (let l = 0; l < 15; l++) {
      this.mapa[l] = [];
      for (let c = 0; c < 15; c++) {
        if (l == 0 && c == 0) {
          this.mapa[l][c] = this.tiles[anterior];
        } else {
          let aux = [];
          aux = aux.concat(this.possibilidades[anterior]);
          anterior = this.RandomIndex(aux);
          this.mapa[l][c] = this.tiles[anterior];
        }
      }
    }
    return this.mapa;
  }

  // Add a single state or states
  addStates(tile) {
    this.tiles.push(tile);
  }
  setPosssibilidades(possibilite) {
    this.possibilidades = possibilite;
  }

  treino()
  {
    //for (let i = 0; i<this.tiles.length(;i++))
    //{
    //this.possibilidades[i] = []
    //}
    let img =new Image();
    img = this.assets.Img("Treino");
    ctx.drawImage(img, 0, 0);
    img.style.display = "none";
    let tam = img.getWidth();
    let tam2 = img.getHeight();
    for(let i = 16 ; i<tam ; i = i +32)
    {
      for(let j = 16; j<tam2; j = j + 32 )
      {
        const pixel = ctx.getImageData(i, j, 1, 1);
        const data = pixel.data;
        const rgba = `rgba(${data[0]}, ${data[1]}, ${data[2]}, ${data[3] / 255})`;
        console.log(rgba)
      }
    }
    
  }

  iniciar() {
    return this.GenerateRandomMap;
  }
}
