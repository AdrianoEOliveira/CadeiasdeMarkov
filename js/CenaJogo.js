import Cena from "./Cena.js";
import Mapa from "./Mapa.js";
import  modeloMapa1 from "./maps/mapa1.js";
import  modeloMapa2 from "./maps/mapa2.js";
import Sprite from "./Sprite.js";


export default class CenaJogo extends Cena
{
    quandoColidir(a,b)
    {
        if(!this.aRemover.includes(a) && !a.tags.has("pc"))
        {
            this.aRemover.push(a);
        }
        if(!this.aRemover.includes(b))
        {
            this.aRemover.push(b);
        }
        if(a.tags.has("pc")&& b.tags.has("enemy"))
        {
        this.assets.play("boom");
        this.game.selecionaCena("fim");
        }
        else{
            if(a.tags.has("enemy")&& b.tags.has("enemy"))
            {
                this.assets.play("boom");
                this.game.pontuacao++;
                this.game.eliminacoes++;
            }

        }
    }
    preparar()
    {
        super.preparar();
        this.markov.addStates("Piso");
        this.markov.addStates("Pedra");
        this.markov.addStates("Parede");
        this.markov.addStates("Bau");
        this.treinarMarkov();
        console.log("Markov de ordem 3 :");

        let mapa = new Mapa(this.LINHAS,this.COLUNAS,32);
        this.iniciaMapa(mapa); // Aleatório ou tudo pedra
        this.mapa = mapa;
        for(let k = 0; k<20;k++)
        {
        const oldTiles = structuredClone(this.mapa.tiles);
        const newTiles = structuredClone(this.mapa.tiles);
        

        for (let l = 1; l < this.LINHAS - 1; l++) 
        {
            for (let c = 1; c < this.COLUNAS - 1; c++) 
            {

                let proximo = this.markov.proximo([
                    oldTiles[l][c-1],
                    oldTiles[l -1][c - 1],
                    oldTiles[l-1][c],
                    oldTiles[l-1][c+1],
                    oldTiles[l][c+1],
                    oldTiles[l+1][c+1],
                    oldTiles[l+1][c],
                    oldTiles[l+1][c-1],
                ]);
                if(proximo>=0)
                {
                    newTiles[l][c] = proximo;
                }
            }
        }
        this.mapa.tiles = newTiles;
        }

        /*
        let Invalido = 1;
        let xa ,ya;

        while(Invalido ===1)
        {
        xa = Math.floor(Math.random() * 15*32)  ;
        let mx=Math.floor(xa/32);
        ya = Math.floor(Math.random() * 15*32)  ;
        let my=Math.floor(ya/32);
            if(mx<15 && my <15)
            {
                if(mapa1.tiles[my][mx]==0 )
                {
                    Invalido = 0;
                }
            }
        }
        */

        this.configuraMapa(mapa);
        const cena = this;
        //const pc = new Sprite({x:xa,y:ya,w:20,h:20,vx:0,color:"white"});
        //pc.tags.add("pc");
        //const imagem = new Image();
        //imagem = this.cena.assets.Img("ship");
        /*Uncaught TypeError: Cannot read property 'assets' of undefined
        at CenaJogo.preparar (CenaJogo.js:50)
        at new Cena (Cena.js:10)
        at new CenaJogo (CenaJogo.js:7)
        at Main.js:34
       */
      /*
        pc.controlar = function(dt)
        {
            if(cena.input.comandos.get("MOVE_ESQUERDA"))
            {
                this.vx=-50;
            }
            else
            {
                if(cena.input.comandos.get("MOVE_DIREITA"))
                {
                    this.vx=50;
                }
                else
                {
                    this.vx=0;
                }
            }
            if(cena.input.comandos.get("MOVE_CIMA"))
            {
            this.vy=-50;
            }
            else
            {
                if(cena.input.comandos.get("MOVE_BAIXO"))
                {
                    this.vy=50;
                }
                else
                {
                    this.vy=0;
                }
            }

            
        }
        //this.adicionarSprite(pc);
        */

    }
    iniciaMapa(mapa)
    {
        for (let l = 0; l < this.LINHAS; l++) {
            mapa.tiles[l] = [];
            for (let c = 0; c < this.COLUNAS; c++) {
              //mapa.tiles[l][c] = Math.floor(Math.random() * 4)
              mapa.tiles[l][c] = 0
            }
          }
          for (let l = 0; l < this.LINHAS; l++) {
            for (let c = 0; c < this.COLUNAS; c++) {
              //mapa.tiles[l][c] = Math.floor(Math.random() * 4)
              if((l==1 || l == this.LINHAS-2) || (c==1 ||c == this.COLUNAS-2))
              {
              mapa.tiles[l][c] = 2
              }
              if((l==0 || l == this.LINHAS-1) || (c==0 ||c == this.COLUNAS-1))
              {
              mapa.tiles[l][c] = 1
              }
            }
          }
        mapa.cena =this
         // console.log("Tudo pedra");
          //console.log(this.tiles)
        
    }
    treinarMarkov()
    {
        this.markov.treino()
    }
}
