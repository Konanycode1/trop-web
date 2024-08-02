$(document).ready(function () {
    const url = "http://localhost:3031/api/v1/product/getAll"
    $.ajax({
        
        url: url,
        type: 'GET', // added data type
        contentType: 'application/json',
        success: function(res) {
          const {products} = res
          products.map(element=>{
            console.log(element)
            const content = `
             <article class="relative flex flex-col overflow-hidden rounded-lg border" keyProduct="${element.id}">
              <div class="aspect-square overflow-hidden">
                <img class="h-full w-full object-cover transition-all duration-300 group-hover:scale-125" src="${element.images[0].url}" alt="" />
              </div>
              <div class="absolute top-0 m-2 rounded-full bg-white">
                <p class="rounded-full bg-emerald-500 p-1 text-[8px] font-bold uppercase tracking-wide text-white sm:py-1 sm:px-3">Sale</p>
              </div>
              <div class="my-4 mx-auto flex w-10/12 flex-col items-start justify-between">
                <div class="flex mx-auto flex justify-between sm:justify-between">
                    ${
                       element.isFlash === false && element.isArchived === false ? `
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
                  <p class="mr-3 text-sm font-semibold">${element.price} Franc</p>
                  <del class="text-xs text-gray-400">${(parseInt(element.price)*parseInt(element.reduce))/100} Fr CFA</del> 
                </div>
                <h3 class="mb-2 text-sm text-gray-400">${element.name}</h3>
                <span class=" text-gray-800 text-xs font-medium mr-2">${element.description}</span>
              </div>
              <button class="group mx-auto mb-2 flex h-10 w-10/12 items-stretch overflow-hidden rounded-md text-gray-600">
                <div class="flex w-full items-center justify-center bg-gray-100 text-xs uppercase transition group-hover:bg-emerald-500 group-hover:text-white">Ajouter</div>
                <div class="flex items-center justify-center bg-orange-500 text-white px-5 transition group-hover:bg-emerald-600 group-hover:text-white">+</div>
              </button> 
            </article>
            `;
            $('#contentProducts').append(content)
          })
         
        },
        error: function(xhr, status, error) {
            console.log('Error:', error);
            alert('Error: ' + error);
        }
    }); 

    
})

