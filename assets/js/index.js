$(document).ready(function () {
    const Panier = JSON.parse(localStorage.getItem("Panier")) ||  [];
    const valuePan = Panier.length ===0? 0 :Panier.length
    console.log(Panier.length)
    $("#valuePanier").text(valuePan)
    const url = "http://localhost:3031/api/v1/product/getAll"
    $.ajax({
        
        url: url,
        type: 'GET', // added data type
        contentType: 'application/json',
        success: function(res) {
          const {products} = res

          for(let i = 0; i < 8; i++){
            const content = `
             <article  class="relative parentArticle flex flex-col overflow-hidden rounded-lg border " keyProduct="${products[i].id}">
              <div class="aspect-square overflow-hidden">
                <img class="h-full w-full object-cover transition-all duration-300 group-hover:scale-125" src="${products[i].images[0].url}" alt="" />
              </div>
              <div class="absolute top-0 m-2 rounded-full bg-white">
                <p class="rounded-full bg-emerald-500 p-1 text-[8px] font-bold uppercase tracking-wide text-white sm:py-1 sm:px-3">Sale</p>
              </div>
              <div class="my-4 mx-auto flex w-10/12 flex-col items-start justify-between">
                <div class="flex mx-auto flex justify-between sm:justify-between">
                    ${
                       products[i].isFlash === false && products[i].isArchived === false ? `
                        <span class="bg-orange-400 text-orange-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-md">En vedette</span>
                        <span class="bg-green-400 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-md">Disponible</span>
                       `:
                       `
                       <span class="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-md">Default</span>
                        <span class="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-md">Dark</span>
                       `
                    } 
                </div>
                <div class="mb-2 flex">
                  <p class="mr-3 text-sm font-semibold">${products[i].price} Franc</p>
                  <del class="text-xs text-gray-400">${(parseInt(products[i].price)*parseInt(products[i].reduce))/100} Fr CFA</del> 
                </div>
                <h3 class="mb-2 text-sm text-gray-400">${products[i].name}</h3>
                <span class=" text-gray-800 text-xs font-medium mr-2">${products[i].description}</span>
              </div>
              <button onclick="AjoutAuPanier(event)" class="group mx-auto  mb-2 flex h-10 w-10/12 items-stretch overflow-hidden rounded-md text-gray-600" keyProduct="${products[i].id}">
                <div id="addOne" class="flex w-full items-center justify-center bg-gray-100 text-xs uppercase transition group-hover:bg-emerald-500 group-hover:text-white">Ajouter</div>
                <div id="addTwo" class="flex items-center justify-center  bg-orange-500 text-white px-5 transition group-hover:bg-emerald-600 group-hover:text-white">+</div>
              </button> 
            </article>
            `;
            $('#contentProductIndex').append(content)
          }
         
        },
        error: function(xhr, status, error) {
            console.log('Error:', error);
            alert('Error: ' + error);
        }
    }); 

    
})

function AjoutAuPanier(event) {
const Panier = JSON.parse(localStorage.getItem("Panier")) ||  [];
const idElement = event.target
const selectParent = $(event.target).closest("button");
let productExists = false;
idProduct = selectParent.attr("keyProduct")
const data = {
    "id": idProduct,
    "quantity":1
}

if( Panier.length === 0){
    Panier.push(data)
    localStorage.setItem("Panier", JSON.stringify(Panier))
}
else{
    Panier.forEach(element => {
        if(element.id === data.id){
            alert("produit déjà ajouté")
        }
        if (!productExists) {
            Panier.push(data);
            console.log(Panier);
            return
            localStorage.setItem("Panier", JSON.stringify(Panier));
        }
        
    });
}
    
}