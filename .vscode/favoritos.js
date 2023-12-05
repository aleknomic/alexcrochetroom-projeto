document.addEventListener("DOMContentLoaded", function () {
  
    function exibirFavoritos() {
        var favList = JSON.parse(localStorage.getItem("favoritos")) || [];
        var favListaUl = document.getElementById("grid-catalog");

        favListaUl.innerHTML = "";

        favList.forEach(function (favItem) {
            //criando uma div para cada item favoritado
            var divItem = document.createElement("div");
            divItem.classList.add("grid-catalog-item");

            divItem.innerHTML = `
            <div class="grid-catalog-item">
                <img class="img-cat" src="${favItem.img}" alt="${favItem.nome}">
                <p>${favItem.nome}</p>
                <p>${favItem.preco}</p>
                <p>${favItem.descricao}</p>
                <button class="btn-remove" data-id="${favItem.id}"><i class="fa fa-fw fa-remove"></i>Remover Item</button>
            </div>    
            `;

            var btnRemove = divItem.querySelector(".btn-remove");
            btnRemove.addEventListener("click", function () {
                removerItemFavorito(favItem.id);
            });            

            favListaUl.appendChild(divItem);
        });
    }

    function removerItemFavorito(id) {
        var favList = JSON.parse(localStorage.getItem("favoritos")) || [];
        
        // Filtrando a lista para remover o item com o ID correspondente
        favList = favList.filter(function (favItem) {
            return favItem.id !== id;
        });

        // Salvando a lista atualizada no localstorage
        localStorage.setItem("favoritos", JSON.stringify(favList));

        exibirFavoritos();
    }

    var btnFavList = document.querySelectorAll(".btn-fav");

    btnFavList.forEach(function (btnFav) {
        btnFav.addEventListener("click", function () {
            var favItemId = btnFav.id.replace("btn-fav-", "");

            // Obter os valores corretos do item clicado
            var img = document.querySelector(`#img-cat${favItemId}`).getAttribute("src");
            var nome = document.querySelector(`#nome${favItemId}`).textContent;
            var preco = document.querySelector(`#valor${favItemId}`).textContent;
            var descricao = document.querySelector(`#desc${favItemId}`).textContent;

            var favItemInfo = {
                img: img,
                id: favItemId,
                nome: nome,
                preco: preco,
                descricao: descricao
            };

            var favList = JSON.parse(localStorage.getItem("favoritos")) || [];

            // Verificar se o item já está na lista
            var itemExistente = favList.some(function(item) {
                return item.id === favItemId;
            });

            if (!itemExistente) {
                favList.push(favItemInfo);
                alert("Item adicionado aos favoritos!");
                localStorage.setItem("favoritos", JSON.stringify(favList));
            } else {
                alert("Este item já está nos favoritos!");
            }

            exibirFavoritos();
        });
    });

    exibirFavoritos();
});
