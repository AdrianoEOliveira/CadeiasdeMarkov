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
            this.ctx.fillText("Aperte espaço para continuar",this.canvas.width/2,this.canvas.height/2+120);
            this.ctx.fillText("Baus valem 1 ponto, moedas 2",this.canvas.width/2,this.canvas.height/2+40);
            this.ctx.fillText("Pegue a moeda para mudar de fase",this.canvas.width/2,this.canvas.height/2+80);
        }
    }

    quadro(t)
    {
        this.t0 = this.t0 ?? t;
        this.dt = (t-this.t0)/1000;

        if(this.assets.acabou())
        {
            if(this.input.comandos.get("PROXIMA_CENA"))
            {
                this.game.selecionaCena("jogo");
                return;
            }
        }
        this.desenhar();

        this.t0 = t;
        this.iniciar();
    }
}