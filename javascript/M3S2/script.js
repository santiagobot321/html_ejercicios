let id = 1; // Contador global para asignar ID únicos a cada producto

const SetProducts = new Set(); // Guardamos los nombres de productos para evitar duplicados
const MapProducts = new Map(); // Relacionamos categorías con arrays de productos

// Clase que representa un producto
class Products {
    constructor(id, name, price, category) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.category = category;
    }

    // Método para mostrar el producto en formato texto
    showing() {
        return `${this.id}: ${this.name} - $${this.price}`;
    }
}

// Traemos los elementos del DOM
const nameinput = document.getElementById("nametocreate");
const priceinput = document.getElementById("pricetocreate");
const categoryinput = document.getElementById("categorytocreate");
const buttonadd = document.getElementById("btnadd");

const nameToUpdate = document.getElementById("nametoupdate");
const updatedName = document.getElementById("updated-name");
const updatedPrice = document.getElementById("updated-price");
const updateBtn = document.getElementById("update-btn");

const deleteInput = document.getElementById("deletep");
const deleteBtn = document.getElementById("delete-btn");

const showBtn = document.getElementById("show-btn");
const output = document.getElementById("output");

// CREATE: Agregamos con esta función un nuevo producto 
buttonadd.addEventListener("click", () => {
    const name = nameinput.value.trim();
    const price = parseFloat(priceinput.value);
    const category = categoryinput.value.trim();

    // Validación: no permitir productos con el mismo nombre
    if (SetProducts.has(name)) {
        alert("Product already exists.");
        return;
    }

    // Crear producto y agregar al Set y al Map
    const product = new Products(id++, name, price, category);
    SetProducts.add(name); // Para evitar duplicados por nombre

    // Si la categoría no existe en el Map, la crea
    if (!MapProducts.has(category)) {
        MapProducts.set(category, []);
    }

    // Agrega el producto al array de la categoría correspondiente
    MapProducts.get(category).push(product);

    alert("Product added.");
});

// ─── READ: Muestra todos los productos agrupados por categoría ───
showBtn.addEventListener("click", () => {
    output.textContent = ""; // Limpia resultados anteriores

    // Recorre el Map: categoría → lista de productos
    MapProducts.forEach((products, category) => {
        output.textContent += `Category: ${category}\n`;

        // Recorre cada producto de esa categoría
        for (let product of products) {
            output.textContent += `${product.showing()}\n`;
        }
    });
});

//  UPDATE: Actualiza el nombre y precio de un producto ───
updateBtn.addEventListener("click", () => {
    const name = nameToUpdate.value.trim();       // Nombre actual del producto a buscar
    const newName = updatedName.value.trim();     // Nuevo nombre
    const newPrice = parseFloat(updatedPrice.value); // Nuevo precio

    // Validamos que el producto exista
    if (!SetProducts.has(name)) {
        alert("Product not found.");
        return;
    }

    // Buscar el producto en cada categoría
    for (let [category, products] of MapProducts) {
        for (let product of products) {
            if (product.name === name) {
                // Actualizar nombre en Set
                SetProducts.delete(name);
                SetProducts.add(newName);

                // Actualizar valores del objeto
                product.name = newName;
                product.price = newPrice;

                alert("Product updated.");
                return;
            }
        }
    }
});

// ─── DELETE: Elimina un producto ───
deleteBtn.addEventListener("click", () => {
    const name = deleteInput.value.trim();

    // Validación: que el producto exista
    if (!SetProducts.has(name)) {
        alert("Product not found.");
        return;
    }

    // Buscar el producto y eliminarlo
    for (let [category, products] of MapProducts) {
        const index = products.findIndex(p => p.name === name);

        if (index !== -1) {
            products.splice(index, 1); // Quita el producto del array

            // Si no quedan productos en esa categoría, elimina la categoría
            if (products.length === 0) {
                MapProducts.delete(category);
            }

            SetProducts.delete(name); // Elimina del Set
            alert("Product deleted.");
            return;
        }
    }
});
