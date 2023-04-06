export default class Game{
    constructor(canvas, assets,input)
    {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.assets = assets;
        this.input = input
        this.cenas = new Map();
        this.cena =null;
        this.pontuacao = 0;
        this.chests = 0;
        this.stars = 0;
        this.eliminacoes = 0;
    }
    adicionarCena(chave,cena)
    {
        cena.game = this;
        this.cenas.set(chave,cena)
        if(this.cena === null)

            this.cena = cena;
    }
    selecionaCena(chave)
    {
        if(this.cenas.has(chave))
        {
            this.cena.rodando = false;
            this.cena.parar();
            this.cena = this.cenas.get(chave);
            this.cena.preparar();
            this.cena.iniciar();
        }
    }
    iniciar()
    {
        this.cena?.iniciar();
    }
    parar()
    {
        this.cena?.parar();
    }
}