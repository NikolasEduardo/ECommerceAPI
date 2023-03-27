const idproduto = window.location.hash.substring(1);

fetch(`https://nikolaseduardo.github.io/ThisNOTaProject/dados.json`).then(resposta => {
    return resposta.json();
}).then(produto => {
    console.log(produto);
    document.getElementById("nomeproduto").innerHTML = produto[`Produto${idproduto}`].Nome;
    document.getElementById("descricaoproduto").innerHTML = produto[`Produto${idproduto}`].Descrição;
    document.getElementById("preco-dolar").innerHTML = produto[`Produto${idproduto}`].PreçoUSS;
    document.getElementById("imagem1").src = produto[`Produto${idproduto}`].imagem1;
    document.getElementById("imagem2").src = produto[`Produto${idproduto}`].imagem2;
    document.getElementById("imagem3").src = produto[`Produto${idproduto}`].imagem3;
    document.getElementById("imagem4").src = produto[`Produto${idproduto}`].imagem4;
    document.title = `FofuraStore - ${produto[`Produto${idproduto}`].Nome}`
})

function converterRealPraDolar() {
    fetch(`https://economia.awesomeapi.com.br/json/last/USD-BRL`).then(resposta => {
        return resposta.json();
    }).then(economia => {
        //console.log(economia);
        numero = document.getElementById("preco-dolar").innerHTML * economia.USDBRL.bid;
        document.getElementById("preco-real").innerHTML = parseFloat(numero.toFixed(2));
        numero2 = document.getElementById("frete-dolar").innerHTML * economia.USDBRL.bid;
        document.getElementById("frete-real").innerHTML = parseFloat(numero2.toFixed(2));
        preconobotao();
    })
}

function preconobotao() {
    soma = parseFloat(document.getElementById("preco-real").innerHTML) + parseFloat(document.getElementById("frete-real").innerHTML);
    document.getElementById("fname").innerHTML = `Comprar - R$${parseFloat(soma.toFixed(2))}`;
}

converterRealPraDolar();

//Endereço e suas validações
const preencherFormulario = (endereco) => {
    definirCep = document.getElementById("cep").value;
    definirRua = endereco.logradouro;
    if (endereco.localidade == "Mogi das Cruzes") {
        //Frete Grátis
        document.getElementById("fname").classList = "btn btn-light";
        console.log("frete em Mogi das Cruzes")
        document.getElementById("frete-dolar").innerHTML = 10.00 * 0.00;
        converterRealPraDolar();
    } else if (definirCep >= 06000000 & definirCep <= 09999999 & definirRua != "undefined") {
        //50% de Desconto
        document.getElementById("fname").classList = "btn btn-light";
        console.log("frete na região metropolitana de SP")
        document.getElementById("frete-dolar").innerHTML = 10.00 * 0.50;
        converterRealPraDolar();
    } else if (definirCep >= 11000000 & definirCep <= 11999999 & definirRua != "undefined") {
        //40% de Desconto
        document.getElementById("fname").classList = "btn btn-light";
        console.log("frete na região litoranea de SP")
        document.getElementById("frete-dolar").innerHTML = 10.00 * 0.60;
        converterRealPraDolar();
    } else {
        switch (endereco.uf) {
            case "SP":
                console.log("frete em são paulo fi")
                document.getElementById("fname").classList = "btn btn-light";
                //30% de Desconto
                document.getElementById("frete-dolar").innerHTML = 10.00 * 0.70;
                converterRealPraDolar();
                return;
            case "RJ":
            case "ES":
            case "MG":
                console.log("frete na região Sudeste")
                document.getElementById("fname").classList = "btn btn-light";
                //25% de Desconto
                document.getElementById("frete-dolar").innerHTML = 10.00 * 0.75;
                converterRealPraDolar();
                return;
            case "PR":
            case "SC":
            case "RS":
                console.log("frete na região Sul")
                document.getElementById("fname").classList = "btn btn-light";
                //20% de Desconto
                document.getElementById("frete-dolar").innerHTML = 10.00 * 0.80;
                converterRealPraDolar();
                return;
            case "BA":
            case "SE":
            case "PE":
            case "AL":
            case "PB":
            case "RN":
            case "CE":
            case "PI":
            case "MA":
                console.log("frete na região Nordeste")
                document.getElementById("fname").classList = "btn btn-light";
                //10% de Desconto
                document.getElementById("frete-dolar").innerHTML = 10.00 * 0.90;
                converterRealPraDolar();
                return;
            case "PA":
            case "AP":
            case "AM":
            case "RR":
            case "AM":
            case "AC":
            case "RO":
            case "TO":
                console.log("frete na região Norte")
                document.getElementById("fname").classList = "btn btn-light";
                //5% de Desconto
                document.getElementById("frete-dolar").innerHTML = 10.00 * 0.95;
                converterRealPraDolar();
                return;
            case "DF":
            case "GO":
            case "GO":
            case "MT":
            case "MS":
                console.log("frete na região Centro-Oeste")
                document.getElementById("fname").classList = "btn btn-light";
                //15% de Desconto
                document.getElementById("frete-dolar").innerHTML = 10.00 * 0.85;
                converterRealPraDolar();
                return;
            default:
                console.log("Insira um CEP válido que seja no Brasil")
                document.getElementById("fname").classList = "btn btn-light disabled";
                //colocar preço de volta
                document.getElementById("frete-dolar").innerHTML = 10.00;
                converterRealPraDolar();
                return;
        }
    }
    converterRealPraDolar();
}


const cepValido = (cep) => {
    if (cep.length == 8) {
        return true;
    } else {
        return false;
    }
}

const pesquisarCep = async () => {
    const cep = document.getElementById("cep").value;
    const url = `https://viacep.com.br/ws/${cep}/json/`;
    if (cepValido(cep)) {
        const dados = await fetch(url);
        const endereco = await dados.json();
        preencherFormulario(endereco);
    }
}
document.getElementById("cep").addEventListener("focusout", pesquisarCep);

//Testar CEP's
//Mogi -            08780910
//Litoral SP -      11075300
//Sudeste -         29027039
//SUL -             82400000
//Norte -           69047010
//Centro-Oeste -    70722510
//Nordeste -        65631240