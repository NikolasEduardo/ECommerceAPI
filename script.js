fetch(`https://nikolaseduardo.github.io/ThisNOTaProject/dados.json`).then(resposta => {
    return resposta.json();
}).then(produto => {
    console.log(Object.keys(produto).length);
    for (var x = 1; x < (Object.keys(produto).length) + 1; x++) {
        document.getElementById('todososprodutos').innerHTML += `<div class="col-lg-4  col-md-6 col-sm-12"><div class="d-flex justify-content-center"><div class="card" style="width: 20rem;"><div id="carousel${x}" class="carousel slide"><div class="carousel-indicators"><button type="button" data-bs-target="#carousel${x}" data-bs-slide-to="0"class="active" aria-current="true" aria-label="Slide 1"></button><button type="button" data-bs-target="#carousel${x}" data-bs-slide-to="1"aria-label="Slide 2"></button><button type="button" data-bs-target="#carousel${x}" data-bs-slide-to="2"aria-label="Slide 3"></button><button type="button" data-bs-target="#carousel${x}" data-bs-slide-to="3"aria-label="Slide 4"></button></div><div class="carousel-inner"><div class="carousel-item active"><img src="imagem/teste1.jpg" height="200px" id="imagem1do${x}"></div><div class="carousel-item"><img src="imagem/teste2.jpg" height="200px" id="imagem2do${x}"></div><div class="carousel-item"><img src="imagem/teste3.jpg" height="200px" id="imagem3do${x}"></div><div class="carousel-item"><img src="imagem/teste4.jpg" height="200px" id="imagem4do${x}"></div></div><button class="carousel-control-prev" type="button" data-bs-target="#carousel${x}"data-bs-slide="prev"><span class="carousel-control-prev-icon" aria-hidden="true"></span><span class="visually-hidden">Previous</span></button><button class="carousel-control-next" type="button" data-bs-target="#carousel${x}"data-bs-slide="next"><span class="carousel-control-next-icon" aria-hidden="true"></span><span class="visually-hidden">Next</span></button></div><div class="card-body"><h5 id="nome${x}" class="card-title ">Card title</h5><p id="descricao${x}" class="card-text">Some quick example text to build on the card titleand make up the bulk of the card's content.</p><a href="produto.html#${x}" class="btn btn-light ">Comprar</a></div></div></div></div>`
    }
})

fetch(`https://nikolaseduardo.github.io/ThisNOTaProject/dados.json`).then(resposta => {
    return resposta.json();
}).then(produto => {
    console.log(produto);
    for (var x = 1; x < (Object.keys(produto).length) + 1; x++) {
        document.getElementById(`nome${x}`).innerHTML = produto[`Produto${x}`].Nome;
        document.getElementById(`descricao${x}`).innerHTML = produto[`Produto${x}`].Descrição;
        document.getElementById(`imagem1do${x}`).src = produto[`Produto${x}`].imagem1;
        document.getElementById(`imagem2do${x}`).src = produto[`Produto${x}`].imagem2;
        document.getElementById(`imagem3do${x}`).src = produto[`Produto${x}`].imagem3;
        document.getElementById(`imagem4do${x}`).src = produto[`Produto${x}`].imagem4;
    }
})