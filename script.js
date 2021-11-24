function updatePrice() {
    let s = document.getElementsByName("productType");
    let select = s[0];
    let price = 0;
    let prices = getPrices();
    let priceIndex = parseInt(select.value) - 1;
    if (priceIndex >= 0) {
      price = prices.prodTypes[priceIndex];
    }
    
    let radioDiv = document.getElementById("radio-product-specifics");
    radioDiv.style.display = (select.value === "3" ? "inline-block" : "none");
    
    let radios = document.getElementsByName("radioOptions");
    radios.forEach(function(radio) {
      if (radio.checked) {
        let optionPrice = prices.radioOptions[radio.value];
        if (optionPrice !== undefined) {
          price += optionPrice;
        }
      }
    });
  
    let checkDiv = document.getElementById("checkbox-product-specifics");
    checkDiv.style.display = (select.value === "3" ? "none" : "inline-block");
  
    let checkboxes = document.querySelectorAll("#checkbox-product-specifics input");
    checkboxes.forEach(function(checkbox) {
      if (checkbox.checked) {
        let propPrice = prices.prodProperties[checkbox.name];
        if (propPrice !== undefined) {
          price += propPrice;
        }
      }
    });
    
    let prodPrice = document.getElementById("result");
    prodPrice.innerHTML = price + " ₽";
}

function calculate() {
    let regexp = /\D/g;
    let productAmount = document.getElementsByName("product-amount")[0].value;
    let r = document.getElementById("result");

    if (Boolean(productAmount)) {
        if (regexp.test(productAmount)) {
           r.innerText = "Ну и что ты написал";
        } else {
            regexp = /\d/g;
            productAmount = parseInt(productAmount.match(regexp).join(""));
            let productPrice = r.innerText.match(/\d+/g);
            r.innerText = `${productPrice * productAmount} ₽`;
        }
    }
    return false;
}
  
  function getPrices() {
    return {
        prodProperties: {
            checkOptionsB: 300,
            checkOptionsC: 1000,
          },
        prodTypes: [49, 1, 1990000],
        radioOptions: {
            option2: 300,
            option3: 1000,
        }
    };
  }
  
  window.addEventListener("DOMContentLoaded", function (event) {
    let radioDiv = document.getElementById("radio-product-specifics");
    radioDiv.style.display = "none";
    
    let s = document.getElementsByName("productType");
    let select = s[0];

    select.addEventListener("change", function(event) {
      let target = event.target;
      console.log(target.value);
      updatePrice();
    });
     
    let radios = document.getElementsByName("radioOptions");
    radios.forEach(function(radio) {
      radio.addEventListener("change", function(event) {
        let r = event.target;
        console.log(r.value);
        updatePrice();
      });
    });
  
    let checkboxes = document.querySelectorAll("#checkbox-product-specifics input");
    checkboxes.forEach(function(checkbox) {
      checkbox.addEventListener("change", function(event) {
        let c = event.target;
        console.log(c.name);
        console.log(c.value);
        updatePrice();
      });
    });
  
    updatePrice();

    let button = document.getElementById("calculate-button");
    button.addEventListener("click", calculate);
});
  
