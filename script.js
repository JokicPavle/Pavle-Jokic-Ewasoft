const modalContainer = document.querySelector(".modal-container");
const closeModal = document.querySelector(".close-btn");
const openModal = document.querySelectorAll(".configurator");
const productImg = document.querySelectorAll(".product-img");
const productModel = document.querySelectorAll(".model");
const productPrice = document.querySelectorAll(".product-price");
const modalNew = document.querySelectorAll(".new");
const modalProductContainer = document.querySelector(".product");
const checkboxesContainer = document.querySelector(".checkboxes");
for (let i = 0; i < openModal.length; i++) {
  openModal[i].addEventListener("click", () => {
    modalContainer.style.display = "block";

    const imgSrc = productImg[i].getAttribute("src");
    const modelName = productModel[i].textContent;
    const basePrice = parseFloat(productPrice[i].textContent.replace(",", "."));
    const basePriceScaled = basePrice * 1000;
    let isNew = "";
    if (!modalNew[i]) {
      isNew = "NEW";
    }

    let htmlProduct = `<div class='box'>
        <img class='modal-img' src='${imgSrc}' alt='Product image' />
        <div class='top'>
        ${isNew ? `<p class="new">${isNew}</p>` : ""}
          <p>5 Seats, 4 Doors</p>
          <h4 class='model'>${modelName}</h4>
        </div>
        <div class='bottom'>
          <button class="black-btn">
            Starting from <br/>
            <p class="price">${basePrice.toFixed(3)} €</p>
          </button>
        </div>
      </div>
      `;
    let htmlCheckboxes = ` <div class="checkbox-item">
      <input id="check-1" class="checkbox" type="checkbox" checked />
      <div class="info">
        <p>48-V electrical system</p>
        <p><label for="check-1">0,</label>- EUR</p>
      </div>
    </div>
    <div class="checkbox-item">
      <input id="check-2" class="checkbox" type="checkbox" />
      <div class="info">
        <p>Adaptive air suspension - sport</p>
        <p><label for="check-2">278,60</label> EUR</p>
      </div>
    </div>
    <div class="checkbox-item">
      <input id="check-3" class="checkbox" type="checkbox" />
      <div class="info">
        <p>Acoustic side windows - optional</p>
        <p><label for="check-3">558,78</label> EUR</p>
      </div>
    </div>
    <div class="checkbox-item">
      <input id="check-4" class="checkbox" type="checkbox" />
      <div class="info">
        <p>Acoustic and heat-insulating glass</p>
        <p><label for="check-4">357,29</label> EUR</p>
      </div>
    </div>
    <div class="checkbox-item">
      <input id="check-5" class="checkbox" type="checkbox" />
      <div class="info">
        <p>Ambiental LED</p>
        <p><label for="check-5">637,48</label> EUR</p>
      </div>
    </div>`;
    modalProductContainer.innerHTML = htmlProduct;
    checkboxesContainer.innerHTML = htmlCheckboxes;
    const checkboxes = document.querySelectorAll(".checkbox");

    checkboxes.forEach((checkbox) => {
      const checkboxId = checkbox.id;
      const isChecked = localStorage.getItem(`${checkboxId}_${i}`) === "true";
      checkbox.checked = isChecked;
    });

    checkboxes.forEach((checkbox) => {
      checkbox.addEventListener("change", () => {
        let totalPrice = basePriceScaled;

        checkboxes.forEach((checkbox) => {
          if (checkbox.checked) {
            const label = checkbox.nextElementSibling.querySelector("label");
            const itemValue = parseFloat(label.textContent.replace(",", "."));
            totalPrice += itemValue;
          }
        });

        const priceElement = document.querySelector(".price");
        priceElement.textContent = (totalPrice / 1000).toFixed(3) + " €";

        checkboxes.forEach((checkbox) => {
          const checkboxId = checkbox.id;
          const isChecked = checkbox.checked;
          localStorage.setItem(`${checkboxId}_${i}`, isChecked);
        });
      });
    });
  });
}

closeModal.addEventListener("click", () => {
  modalContainer.style.display = "none";
});
window.addEventListener("load", () => {
  localStorage.clear();
});
