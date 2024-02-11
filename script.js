document.getElementById('search-button').addEventListener('click', function(){
    let makeFilter = document.getElementById('make-filter').value;
    let minPriceFilter = parseFloat(document.getElementById('price-filter-min').value);
    let maxPriceFilter = parseFloat(document.getElementById('price-filter-max').value);

    let carItems = document.querySelectorAll('#car-list span');

    carItems.forEach(function(carItem){
        let carMake = carItem.dataset.make;
        let carPrice = parseFloat(carItem.dataset.price);

        if((makeFilter ==='all'|| carMake === makeFilter)&&
        (!minPriceFilter || carPrice>= minPriceFilter)&&
        (!maxPriceFilter || carPrice<= maxPriceFilter)) {
            carItem.style.display='block';
        } else{
            carItem.style.display='none';
        }
    
    });

})






let shoppingCart =[];

function addToCart(carId,carName,carPrice){
    let existingCar = shoppingCart.find(item=>item.id ===carId);

    if(existingCar){
        existingCar.quantity++;
    } else{
        shoppingCart.push({id: carId, name: carName , price: carPrice, quantity:1});
    }
    displayShoppingCart();
}

function removeFromCart(carId){
    let index = shoppingCart.findIndex(item=>item.id ===carId);

    if(index !== -1){
        shoppingCart.splice(index, 1);
    }

    displayShoppingCart();
}

function displayShoppingCart(){
    let cartList = document.getElementById('cart-list');

    cartList.innerHTML ='';

    shoppingCart.forEach(item => {
        let carListItem = document.createElement('span');
        carListItem.textContent = `${item.name}- Price: $${item.price} -Quantity: ${item.quantity}`;

        let removeButton = document.createElement('button');
        removeButton.textContent = 'X';
        removeButton.addEventListener('click',()=>{
            removeFromCart(item.id);
        });
        carListItem.appendChild(removeButton);
        cartList.appendChild(carListItem);
    });

    displayTotalPrice();
}

function displayTotalPrice() {
    let totalPrice = shoppingCart.reduce((total,item)=> total +(item.price* item.quantity),0);

    document.getElementById('total').textContent = `Total: $${totalPrice}`;
}

document.querySelectorAll('.add-to-cart').forEach(button => {

    button.addEventListener('click',() => {

        let carId = button.dataset.id;

        let carName = button.parentElement.querySelector('h3').textContent;

        let carPrice = parseFloat(button.parentElement.querySelector('p').textContent.slice(8).replace(',',''));
     
        addToCart(carId, carName , carPrice);

    });

});



document.addEventListener('DOMContentLoaded', function(){

    document.getElementById('pay-button').addEventListener('click', function(event){

        let cardNumber = document.getElementById('card-number').value;

        let cardExpiry = document.getElementById('card-expiry').value;

        let cardCvc = document.getElementById('card-cvc').value;

        let cardHolderName = document.getElementById('card-holder-name').value;

        displayCheckoutMessage('Payment successful!');

        clearCheckoutForm();
    });
});

function displayCheckoutMessage(message){

    let checkoutMessage = document.getElementById('checkout-message');

    setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 2500);

    checkoutMessage.textContent = message;
}

function clearCheckoutForm(){

    document.getElementById('checkout-form').reset();
}



function addCarToList(car){
    
    let carList = document.getElementById('car-list');
    let listItem = document.createElement('span');
    listItem.innerHTML = `
    <img src="${car.image}" alt="${car.make} ${car.model}">
    <div class="car-info">
    <h3>${car.make} ${car.model}</h3>
    <p>Price: $${car.price}</p>
    </div>
     `;
     listItem.dataset.make = car.make;
     listItem.dataset.price = car.price;
    carList.appendChild(listItem);

    document.getElementsByClassName('remove-from-cart').style.display = 'block'

}

document.getElementById('add-car-button').addEventListener('click',function(){
    let make = document.getElementById('make-input').value;
    let model = document.getElementById('model-input').value;
    let price = document.getElementById('price-input').value;
    let imageFile = document.getElementById('image-input').files[0];

    let newCar = {
        make: make,
        model: model,
        price: price,
        image: null
    };

    let reader = new FileReader();

    reader.onload = function(){
        newCar.image = reader.result;

        addCarToList(newCar);
    };

    reader.readAsDataURL(imageFile);
});

document.getElementById('image-input').addEventListener('change', function(){
    const input = this;

    if(input.files && input.files[0]) {
        const reader = new FileReader();

        reader.onload = function(e) {
            const img = new Image();

            img.onload = function(){

                const width = this.width;
                const height = this.height;

                input.style.maxWidth = '550px';
                input.style.maxHeight = '350px';
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);

    };
});

document.getElementById('add-car-button').addEventListener('click', function() {
    window.scrollBy({
        top: -250,
        behavior: 'smooth'
    })
})