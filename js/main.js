var productContainer; // array bkhzn feh el objects 3shan el adeem mytmshsh wyfdl mwgod
var cuurentIndex = 0;


//Zbon adeem leh data 3ndna elmafroud nrg3halo
if (localStorage.getItem('ourProducts') != null) {
    productContainer = JSON.parse(localStorage.getItem('ourProducts'));
    displayProducts();
}
else {
    productContainer = [];
}

var productNameInput = document.getElementById('productName'); //Input koloo
var productPriceInput = document.getElementById('productPrice');
var productCategoryInput = document.getElementById('productCategory');
var productDescInput = document.getElementById('productDesc');
var buttonEvent = document.getElementById('addBtn');
var nameAlert = document.getElementById('nameAlert');
var priceAlert = document.getElementById('priceAlert');
var categoryAlert = document.getElementById('categoryAlert');
var descAlert = document.getElementById('descAlert');
var alerts = document.querySelectorAll("p.alert");



function addProduct() 
{
    if (buttonEvent.innerHTML == "Add Product") 
    {
        if (productNameCheck(productNameInput.value) && productPriceCheck(productPriceInput.value) && productCategoryCheck(productCategoryInput.value) && productDescCheck(productDescInput.value)) 
        {
           

            var product =
            {
                name: productNameInput.value,
                price: productPriceInput.value,
                category: productCategoryInput.value,
                desc: productDescInput.value
            }
            productContainer.push(product);   // push new element in array
            localStorage.setItem('ourProducts', JSON.stringify(productContainer));
            console.log(productContainer);
            clearForm();
            displayProducts();
            buttonEvent.classList.remove("btn-danger");
            buttonEvent.classList.add("btn-outline-info");

        }
        


    
       else {
           for (var i = 0; i < alerts.length; i++) {
            alerts[i].classList.remove("d-none");
            alerts[i].classList.add("d-block");
        }
           buttonEvent.classList.remove("btn-outline-info");
           buttonEvent.classList.add("btn-danger");
        }
    }
    else {
        updateProductProcess();
        displayProducts() ;
        clearForm();
    }


}

function clearForm() {
    productNameInput.value = "";
    productPriceInput.value = "";
    productCategoryInput.value = "";
    productDescInput.value = "";

}

function displayProducts() {
    var cartoona = ``;
    for (i = 0; i < productContainer.length; i++) {
        //template literal

        cartoona += `  <tr>
        <td>${i}</td>
        <td>${productContainer[i].name}</td>
        <td>${productContainer[i].price}</td>
        <td>${productContainer[i].category}</td>
        <td>${productContainer[i].desc}</td>
        <td><button onclick='updateProduct(${i})' class="btn btn-outline-info">Update</button></td>
        <td><button onclick='deleteProduct(${i})' class="btn btn-outline-danger">Delete</button></td>

    </tr>`;

    }
    document.getElementById('tableBody').innerHTML = cartoona;
}


function deleteProduct(index) {
    productContainer.splice(index, 1);
    localStorage.setItem('ourProducts', JSON.stringify(productContainer));
    displayProducts();


}

function updateProduct(index) {
    productNameInput.value = productContainer[index].name;
    productPriceInput.value = productContainer[index].price;
    productCategoryInput.value = productContainer[index].category;
    productDescInput.value = productContainer[index].desc;
    buttonEvent.innerHTML = "Update Product";
    cuurentIndex = index;
}

function updateProductProcess() {
    var product =
    {
        name: productNameInput.value,
        price: productPriceInput.value,
        category: productCategoryInput.value,
        desc: productDescInput.value
    }
    productContainer[cuurentIndex] = product;
    localStorage.setItem('ourProducts', JSON.stringify(productContainer));
}

function searchProduct(term) {
    var cartoona = ``;
    for (var i = 0; i < productContainer.length; i++) {
        if (productContainer[i].name.toLowerCase().includes(term.toLowerCase()) == true) {
            cartoona += `  <tr>
            <td>${i}</td>
            <td>${productContainer[i].name}</td>
            <td>${productContainer[i].price}</td>
            <td>${productContainer[i].category}</td>
            <td>${productContainer[i].desc}</td>
            <td><button onclick='updateProduct(${i})' class="btn btn-outline-info">Update</button></td>
            <td><button onclick='deleteProduct(${i})' class="btn btn-outline-danger">Delete</button></td>
    
        </tr>`;

        }
    }
    document.getElementById('tableBody').innerHTML = cartoona;

}
productNameInput.onkeyup = function showNameError() {
    var nameRejex = /^[A-Z][a-z]{2,8}$/
    if (!nameRejex.test(productNameInput.value) || productNameInput.value == null || productNameInput.value == "") {
        buttonEvent.disabled = "true";
        productNameInput.classList.add("is-invalid");
        productNameInput.classList.remove("is-valid");
        nameAlert.classList.remove("d-none");
    }
    else {
        buttonEvent.removeAttribute("disabled");
        productNameInput.classList.add("is-valid");
        productNameInput.classList.remove("is-invalid");
        nameAlert.classList.add("d-none");

    }
}
productPriceInput.onkeyup = function showPriceError() {
    var priceRejex = /\d/;
    if (!priceRejex.test(productPriceInput.value) || productPriceInput.value == null || productPriceInput.value == "") {
        buttonEvent.disabled = "true";
        productPriceInput.classList.add("is-invalid");
        productPriceInput.classList.remove("is-valid");
        priceAlert.classList.remove("d-none");
    }
    else {
        buttonEvent.removeAttribute("disabled");
        productPriceInput.classList.add("is-valid");
        productPriceInput.classList.remove("is-invalid");
        priceAlert.classList.add("d-none");

    }
}
productCategoryInput.onkeyup = function showCategoryError() {
    var categoryRejex = /^[a-z]{1,8}$/;
    if (!categoryRejex.test(productCategoryInput.value) || productCategoryInput.value == null || productCategoryInput.value == "") {
        buttonEvent.disabled = "true";
        productCategoryInput.classList.add("is-invalid");
        productCategoryInput.classList.remove("is-valid");
        categoryAlert.classList.remove("d-none");
    }
    else {
        buttonEvent.removeAttribute("disabled");
        productCategoryInput.classList.add("is-valid");
        productCategoryInput.classList.remove("is-invalid");
        categoryAlert.classList.add("d-none");

    }
}
productDescInput.onkeyup = function showDescError() {
    var descRejex = /^[a-z]{2,100}$/;
    if (!descRejex.test(productDescInput.value) || productDescInput.value == null || productDescInput.value == "") {
        buttonEvent.disabled = "true";
        productDescInput.classList.add("is-invalid");
        productDescInput.classList.remove("is-valid");
        descAlert.classList.remove("d-none");
    }
    else {
        buttonEvent.removeAttribute("disabled");
        productDescInput.classList.add("is-valid");
        productDescInput.classList.remove("is-invalid");
        descAlert.classList.add("d-none");

    }
}
function productNameCheck(name) {
    if (name == null || name == "") {
        return false;
    }
    return true;
}
function productPriceCheck(price) {
    if (price == null || price == "") {
        return false;
    }
    return true;
}
function productCategoryCheck(category) {
    if (category == null || category == "") {
        return false;
    }
    return true;
}
function productDescCheck(desc) {
    if (desc == null || desc == "") {
        return false;
    }
    return true;
}
