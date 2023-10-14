const socketClient = io();

const form = document.getElementById('productForm');
const inputTitle = document.getElementById("title");
const inputDescription = document.getElementById("description");
const inputPrice = document.getElementById("price");
const table = document.getElementById("table");
const tableBody = document.getElementById("tableBody");
const form2 = document.getElementById('productForm2');
const inputId = document.getElementById("idToDelete");

form.onsubmit = (e) => {
    e.preventDefault();
    const product = {
        title: inputTitle.value,
        description: inputDescription.value,
        price: inputPrice.value,
    };

    socketClient.emit('addProduct', product);

};

form2.onsubmit = (e) => {
    e.preventDefault();
    const idToDelete = inputId.value;
    socketClient.emit('deleteProduct', idToDelete);
};


socketClient.on("productCreated", (product) => {
    const { id, title, description, price } = product;
    const row = `
    <tr>
    <td>${id}</td>
            <td>${title}</td>
            <td>${description}</td>
            <td>${price}</td>
        </tr>`;

    Swal.fire({
        title: 'Product added',
        icon: 'success',
        showConfirmButton: false,
        timer: 1500
    });
    table.innerHTML += row;
});

socketClient.on("productDeleted", (newproducts, response) => {
    console.log("Soy la lista de productos del json \n")
    console.log(newproducts)
    const productsHTML = newproducts.map((product) => {
        const { id, title, description, price } = product;
        return (
            `<tr>
                <td>${id}</td>
                <td>${title}</td>
                <td>${description}</td>
                <td>${price}</td>
            </tr>`);
    }).join('');

    Swal.fire({
        title: 'Product deleted',
        icon: 'success',
        showConfirmButton: false,
        timer: 1500
    });
    
    console.log("Soy el html de los productos despues de eliminar (o no) el producto: \n")
    console.log(productsHTML)
    
    if (response === -1){
        Swal.fire({
            title: 'Error',
            text: 'Not found id',
            icon: 'error',
            confirmButtonText: 'Enter',
        })
        }

    tableBody.innerHTML = productsHTML;

    console.log("Soy la tabla que deberia ver el cliente: \n")
    console.log(tableBody)
});
