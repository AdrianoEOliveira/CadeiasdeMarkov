import Cena from "./Cena.js";

export default class CenaCarregando extends Cena
{
    desenhar()
    {
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height);
        this.ctx.font ="20px Impact"
        this.ctx.fillStyle = "yellow";
        this.ctx.textAlign = "center";
        this.ctx.fillText(`Carregamento ${(this.assets?.progresso())}`,this.canvas.width/2,this.canvas.height/2);
        if(this.assets.acabou())
        {
            this.ctx.fillText("Aperte 1 a 7 para continuar",this.canvas.width/2,this.canvas.height/2+40);
            this.ctx.fillText("Aperte 1 para testar mapa base",this.canvas.width/2,this.canvas.height/2+80);
            this.ctx.fillText("Aperte 2 a 4 para mapa circulo com grid 3,5,10",this.canvas.width/2,this.canvas.height/2+120);
            this.ctx.fillText("Aperte 5 a 7 para mapa quadrado com grid 3,5,10",this.canvas.width/2,this.canvas.height/2+160);
            this.ctx.fillText("Quando travar ou mudar o teste recarrege a pagina",this.canvas.width/2,this.canvas.height/2+200);
            this.ctx.fillText("Baus valem 1 ponto",this.canvas.width/2,this.canvas.height/2 + 240);
        }
    }

    quadro(t)
    {
        this.t0 = this.t0 ?? t;
        this.dt = (t-this.t0)/1000;

        if(this.assets.acabou())
        {

            if(this.input.comandos.get("TESTE"))
            {
                this.game.selecionaCena("teste");
                return;
            }
            if(this.input.comandos.get("C3"))
            {
                this.game.selecionaCena("testeCirculo_3");
                return;
            }
            if(this.input.comandos.get("C5"))
            {
                this.game.selecionaCena("testeCirculo_5");
                return;
            }
            if(this.input.comandos.get("C10"))
            {
                this.game.selecionaCena("testeCirculo_10");
                return;
            }
            if(this.input.comandos.get("T3"))
            {
                this.game.selecionaCena("teste_3");
                return;
            }
            if(this.input.comandos.get("T5"))
            {
                this.game.selecionaCena("teste_5");
                return;
            }
            if(this.input.comandos.get("T10"))
            {
                this.game.selecionaCena("teste_10");
                return;
            }
        }
        this.desenhar();

        this.t0 = t;
        this.iniciar();
    }
}