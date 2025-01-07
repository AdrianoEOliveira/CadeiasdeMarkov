

export function compareMatrices(matrix1, matrix2) {
    // Verifica se ambas as matrizes têm o mesmo número de linhas
    if (matrix1.length !== matrix2.length) {
        console.log("linhas diferentes")
        console.log(matrix1.length)
        console.log(matrix1)
        console.log(matrix2.length)
        console.log(matrix2)
        return false;
    }

    // Itera pelas linhas
    for (let i = 0; i < matrix1.length; i++) {
        // Verifica se ambas as linhas têm o mesmo número de colunas
        if (matrix1[i].length !== matrix2[i].length) {
            return false;
        }

        // Itera pelos elementos de cada linha
        for (let j = 0; j < matrix1[i].length; j++) {
            // Compara os elementos
            if (matrix1[i][j] !== matrix2[i][j]) {
                return false;
            }
        }
    }

    // Se passou por todos os testes, as matrizes são iguais
    return true;
}
