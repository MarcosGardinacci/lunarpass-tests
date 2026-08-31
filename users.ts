


// function buscarUsuario(): string {
//     let nome = ''

//     //Simulação de uma operação demorada (API, banco, etc)
//     setTimeout(() => {
//         nome = 'João'
//     }, 2000)

//     return nome
        
// }

function buscarUsuario(): Promise<string> {
    return new Promise((resolve) => {
        setTimeout(() =>  resolve('João'), 2000)
    
    })

}

   


async function exibirUsuario() {
    const nome = buscarUsuario()

    console.log('Antes')
    console.log(nome)
    console.log('Depois')
}

exibirUsuario()

