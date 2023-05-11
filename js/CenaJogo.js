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
        let mapa1 = new Mapa(10,10,32,this.markov);

        mapa1.carregaMapa();

        this.configuraMapa(mapa1);
        const cena = this;
        const pc = new Sprite({x:140,y:100,w:20,h:20,vx:0,color:"white"});
        pc.tags.add("pc");
        //const imagem = new Image();
        //imagem = this.cena.assets.Img("ship");
        /*Uncaught TypeError: Cannot read property 'assets' of undefined
        at CenaJogo.preparar (CenaJogo.js:50)
        at new Cena (Cena.js:10)
        at new CenaJogo (CenaJogo.js:7)
        at Main.js:34
       */
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
        this.adicionarSprite(pc);

    }
}