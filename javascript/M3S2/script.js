let id = 0;

class Products {
    constructor (id,name,price) {
        this.id = id;
        this.name = name;
        this.price = price;
    }

    showing() {
        return `${id}: ${this.name} has a price of ${this.price}`
    }
}

const nameinput = document.getElementById("nametocreate")
const priceinput = document.getElementById("pricetocreate")
const buttonadd = document.getElementById("btnadd")

buttonadd.addEventListener("click", function addproduct () {
    const nameadd = nameinput.value.trim();
    const priceadd = parseFloat(priceinput.value);

    const NewProducto = new Products(id++,nameadd,priceadd);

    console.log(NewProducto.showing())

})

const SetProducts = new Set();

SetProducts.add(NewProducto)