const Piso = 0;
const Pedra = 1;
const Parede = 2;
const Bau = 3;

export function converte(mapa) {
    let convertido = [];
    
    for (let i = 0; i < mapa.length; i++) {
        convertido[i] = [];
        
        for (let j = 0; j < mapa[i].length; j++) {
            if (mapa[i][j] === Piso) {
                convertido[i][j] = "Piso";
            } else if (mapa[i][j] === Pedra) {
                convertido[i][j] = "Pedra";
            } else if (mapa[i][j] === Parede) {
                convertido[i][j] = "Parede";
            } else if (mapa[i][j] === Bau) {
                convertido[i][j] = "Bau";
            } else {
                convertido[i][j] = "Desconhecido"; // Opcional: trata valores inesperados
            }
        }
    }

    return convertido;
}
