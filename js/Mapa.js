import Markov from "./Markov.js";

export default class Mapa {
  constructor(linhas = 21, colunas = 21, tamanho = 32) {
    this.LINHAS = linhas;
    this.COLUNAS = colunas;
    this.TAMANHO = tamanho;
    this.tiles = [];
  }
  desenhar(ctx) {
    this.cena.canvas.style.zoom = this.cena.zoomValue
    //ctx.save()
    //ctx.scale(this.cena.zoomValue, this.cena.zoomValue)
    let img = new Image();
    img = this.cena.assets.Img("terreno"); // 0
    let pedra = new Image()
    pedra = this.cena.assets.Img("pedra"); // 1
    let parede = new Image()
    parede = this.cena.assets.Img("parede"); //2
    let chest = new Image();
    chest = this.cena.assets.Img("chest"); //3
    let coin = new Image();
    coin = this.cena.assets.Img("coin");
    let linha = 20;
    let coluna = 8;
    for (let l = 0; l < this.LINHAS; l++) {
      for (let c = 0; c < this.COLUNAS; c++) {
        if(this.tiles[l][c]>=0)
        {
          if(this.tiles[l][c]==0)
          {
          ctx.drawImage(
            img,
            coluna * 32,
            linha * 32,
            32,
            32,
            c * 32,
            l * 32,
            32,
            32
          );
        }
          if(this.tiles[l][c]==1000)
          {
            ctx.fillStyle = 'yellow'; // Cor de preenchimento
            ctx.fillRect(c*32, l*32, 32, 32); // Desenhe o retângulo
          }
          if(this.tiles[l][c]==10)
            {
              ctx.fillStyle = 'white'; // Cor de preenchimento
              ctx.fillRect(c*32, l*32, 32, 32); // Desenhe o retângulo
            }
          if (this.tiles[l][c] == 1) { //pedra
            ctx.drawImage(pedra, 0 , 0, 32, 32, c * 32, l * 32, 32, 32);
          }
          if (this.tiles[l][c] == 3) { //bau
            ctx.drawImage(chest, 0, 0, 32, 32, c * 32, l * 32, 32, 32);
          }
          if (this.tiles[l][c] == 2) { // parede
            ctx.drawImage(parede, 0, 0, 32, 32, c * 32, l * 32, 32, 32);
          }
          if (this.tiles[l][c] == 4) {
            ctx.drawImage(img, 22 * 32, 21 * 32, 32, 32, c * 32, l * 32, 32, 32);
          }
          if (this.tiles[l][c] == 5) {
            ctx.drawImage(coin, 0, 0, 32, 32, c * 32, l * 32, 32, 32);
          }
          ctx.strokeRect(
            c * this.TAMANHO,
            l * this.TAMANHO,
            this.TAMANHO,
            this.TAMANHO
          );

        }
      }
    }
    //ctx.restore()
  }
}
