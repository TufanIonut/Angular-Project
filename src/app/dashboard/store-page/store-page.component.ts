import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-store-page',
  templateUrl: './store-page.component.html',
  styleUrls: ['./store-page.component.css']
})
export class StorePageComponent implements OnInit {

  ngOnInit(): void {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', this.ready);
    } else {
      this.ready();
    }
  }

  ready(): void {
    const removeCartItemButtons = document.getElementsByClassName('btn-danger');
    for (let i = 0; i < removeCartItemButtons.length; i++) {
      const button = removeCartItemButtons[i] as HTMLButtonElement;
      button.addEventListener('click', this.removeCartItem);
    }

    const quantityInputs = document.getElementsByClassName('cart-quantity-input');
    for (let i = 0; i < quantityInputs.length; i++) {
      const input = quantityInputs[i] as HTMLInputElement;
      input.addEventListener('change', this.quantityChanged);
    }

    const addToCartButtons = document.getElementsByClassName('shop-item-button');
    for (let i = 0; i < addToCartButtons.length; i++) {
      const button = addToCartButtons[i] as HTMLButtonElement;
      button.addEventListener('click', this.addToCartClicked);
    }

    document.getElementsByClassName('btn-purchase')[0]
      .addEventListener('click', this.purchaseClicked);

    const playButton = document.getElementsByClassName('btn-play')[0] as HTMLButtonElement;
    playButton.addEventListener('click', () => {
      const audio = new Audio('/Sound/intro.wav');
      audio.play();
    });
  }

  purchaseClicked(): void {
    alert('Thank you for your purchase');
    const cartItems = document.getElementsByClassName('cart-items')[0] as HTMLElement;
    while (cartItems.firstChild) {
      cartItems.firstChild.remove();
    }
    this.updateCartTotal();
  }
  

  removeCartItem(event: MouseEvent): void {
    const buttonClicked = event.target as HTMLElement;
    const cartItem = buttonClicked.parentElement?.parentElement;
    if (cartItem) {
      cartItem.remove();
      this.updateCartTotal();
    }
  }

  quantityChanged(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (isNaN(Number(input.value)) || Number(input.value) <= 0) {
      input.value = '1';
    }
    this.updateCartTotal();
  }

  addToCartClicked(event: MouseEvent): void {
    const button = event.target as HTMLElement;
    const shopItem = button.parentElement?.parentElement;
    if (!shopItem) {
      return; // Exit the method if shopItem is null or undefined
    }
    const titleElement = shopItem.getElementsByClassName('shop-item-title')[0];
    const priceElement = shopItem.getElementsByClassName('shop-item-price')[0];
    const imageElement = shopItem.getElementsByClassName('shop-item-image')[0];
  
    if (!titleElement || !priceElement || !imageElement) {
      return; // Exit the method if any of the required elements are missing
    }
  
    const title = (titleElement as HTMLElement).innerText;
    const price = (priceElement as HTMLElement).innerText;
    const imageSrc = (imageElement as HTMLImageElement).src;
  
    this.addItemToCart(title, price, imageSrc);
    this.updateCartTotal();
  }
  

  addItemToCart(title: string, price: string, imageSrc: string): void {
    const cartRow = document.createElement('div');
    cartRow.classList.add('cart-row');
  
    const cartItems = document.getElementsByClassName('cart-items')[0];
    const cartItemNames = cartItems.getElementsByClassName('cart-item-title');
    for (let i = 0; i < cartItemNames.length; i++) {
      const cartItemName = cartItemNames[i] as HTMLElement;
      if (cartItemName.textContent === title) {
        alert('This item is already added to the cart');
        return;
      }
    }
  
    const cartRowContents = `
      <div class="cart-item cart-column">
        <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
        <span class="cart-item-title">${title}</span>
      </div>
      <span class="cart-price cart-column">${price}</span>
      <div class="cart-quantity cart-column">
        <input class="cart-quantity-input" type="number" value="1">
        <button class="btn btn-danger" type="button">REMOVE</button>
      </div>`;
    cartRow.innerHTML = cartRowContents;
    cartItems.append(cartRow);
    
    const removeButton = cartRow.getElementsByClassName('btn-danger')[0];
if (removeButton instanceof HTMLElement) {
  removeButton.addEventListener('click', (event: MouseEvent) => {
    this.removeCartItem(event);
  });
}

  
    cartRow.getElementsByClassName('cart-quantity-input')[0]
      .addEventListener('change', this.quantityChanged);
  }
  
  

  updateCartTotal(): void {
    const cartItemContainer = document.getElementsByClassName('cart-items')[0] as HTMLElement;
    const cartRows = cartItemContainer.getElementsByClassName('cart-row');
    let total = 0;
    for (let i = 0; i < cartRows.length; i++) {
      const cartRow = cartRows[i] as HTMLElement;
      const priceElement = cartRow.getElementsByClassName('cart-price')[0] as HTMLElement;
      const quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0] as HTMLInputElement;
      const price = parseFloat(priceElement.textContent!.replace('$', ''));
      const quantity = Number(quantityElement.value);
      total = total + (price * quantity);
    }
    total = Math.round(total * 100) / 100;
    const cartTotalPriceElement = document.getElementsByClassName('cart-total-price')[0] as HTMLElement;
    cartTotalPriceElement.innerText = '$' + total;
  }
  

}
