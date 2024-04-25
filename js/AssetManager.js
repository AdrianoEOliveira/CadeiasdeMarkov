export default class AssetManager {
  constructor(mixer = null) {
    this.aCarregar = 0;
    this.carregadas = 0;
    this.imagens = new Map();
    this.audios = new Map();
    this.mixer = mixer;
  }
  adicionaImagem(chave, source) {
    if(this.imagens.get(chave))
    {
      this.imagens.delete(chave);
      this.aCarregar--;
      this.carregadas--;
    }
    const img1 = new Image();
    const that = this;
    img1.addEventListener("load", function () {
      that.carregadas++;
      console.log(`Imagem ${that.carregadas}/${that.aCarregar}carregado!`);
    });
    img1.src = source;
    this.imagens.set(chave, img1);
    this.aCarregar++;
  }
  adicionaAudio(chave, source) {
    const audio = new Audio();
    const that = this;
    audio.addEventListener("loadeddata", function () {
      that.carregadas++;
      console.log(`Audio ${that.carregadas}/${that.aCarregar}carregado!`);
    });
    audio.src = source;
    this.audios.set(chave, audio);
    this.aCarregar++;
  }

  Img(chave) {
    return this.imagens.get(chave);
  }
  audio(chave) {
    return this.audios.get(chave);
  }

  progresso() {
    if (this.aCarregar > 0) {
      return `${((this.carregadas / this.aCarregar) * 100).toFixed(2)}%`;
    }
    return "Nada a carregar";
  }
  acabou() {
    return this.carregadas === this.aCarregar;
  }
  play(chave) {
    this.mixer?.play(this.audio(chave));
  }
}
