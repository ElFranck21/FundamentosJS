const catalogo = document.querySelector('#lista-cursos');
const table = document.querySelector('#carrito tbody');
const vaciar = document.querySelector('#vaciar-carrito');
const btnVaciar = document.querySelector('#vaciar-carrito');
let carrito = [];

function getProduct(e){
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')){
        const item = {}
        const cardParent = e.target.parentElement;
        item.id = e.target.getAttribute('data-id');
        item.name = cardParent.querySelector('h4').innerText;
        item.price = cardParent.querySelector('p span').innerText;
        item.image = cardParent.parentElement.querySelector('img').src;
        item.cantity = 1;
        // Verificar existencia de item
        addItem(item);
        
        fillTable();
    }
}

function cleanTable(){
    table.innerHTML = '';
}

function addItem(item){
    if(carrito.some(itemCarrito => itemCarrito.id == item.id)){
        //Incrementar cantidad de item
        carrito.forEach(itemCarrito => {
            if (itemCarrito.id == item.id){
                itemCarrito.cantity++;
            }
        })
    } else {
        carrito.push(item);
    }
    console.log(carrito);
}

function createRow(item){
    const row = document.createElement('tr');
    let htmlRow = '';
    htmlRow += `<td><img src="${ item.image }" width="100px"></td>`;
    htmlRow += `<td>${ item.name }</td>`;
    htmlRow += `<td>${ item.price }</td>`;
    htmlRow += `<td>${ item.cantity }</td>`;
    htmlRow += `<td>
    <button class="btn" data-id="${ item.id }">X
    </button><td>`;
    row.innerHTML = htmlRow;
    return row;
}

function fillTable(){
    cleanTable();
    carrito.forEach(itemCarrito => {
        table.appendChild(createRow(itemCarrito));
    })
}


function delItem(e){
    if(e.target.classList.contains('btn')){
        const id = e.target.getAttribute('data-id');
        console.log('Elimina '+ id);
        carrito = carrito.filter(item => item.id !== id);
        fillTable();
    }
}

function Vaciar(e){
    e.preventDefault();
    cleanTable();
    carrito = [];
}

catalogo.addEventListener('click', getProduct);
table.addEventListener('click', delItem);
btnVaciar.addEventListener('click', Vaciar)