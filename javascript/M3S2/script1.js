let id = 1;

class Products {
    constructor(id,name,price,category) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.category = category;
    }

    show() {
        return `${this.id} | ${this.name} | ${this.category} | $${this.price}`
    }
}

const MySet = new Set();  


const NameCreate = document.getElementById("nametocreate")
const PriceCreate = document.getElementById("pricetocreate")
const CategoryCreate = document.getElementById("categorytocreate")

const NameUpdate = document.getElementById("nametoupdate")
const PriceUpdate = document.getElementById("pricetoupdate")



document.getElementById("btnadd").addEventListener("click", function () {
    
    const name = NameCreate.value.trim() 
    const price = parseFloat(PriceCreate.value.trim())
    const category = CategoryCreate.value.trim()

    const nameExists = [...MySet].some(product => product.name === name);
    if (nameExists) {
        alert(`${name} is already in the list`);
        return;
    }


    const Addproduct = new Products(id++,name,price,category)

    MySet.add(Addproduct)

    let content = `
    <table border="1" cellpadding="5">
        <thead>
            <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Categoría</th>
                <th>Precio</th>
            </tr>
        </thead>
    <tbody>
`;

    MySet.forEach(product => {
    content += `
    <tr>
      <td>${product.id}</td>
      <td>${product.name}</td>
      <td>${product.category}</td>
      <td>$${product.price}</td>
    </tr>`;
    });

    content += `
        </tbody>
    </table>
    `;
    
    document.getElementById("addP").innerHTML = content
    
})

