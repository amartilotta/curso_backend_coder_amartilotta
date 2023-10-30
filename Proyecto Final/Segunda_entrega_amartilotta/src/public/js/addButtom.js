async function addProductToCart(element) {
  try {
    const productId = element.getAttribute("data-product-id");
    const cartId = element.getAttribute("data-cart-id");
    console.log(productId);
    const response = await fetch(`/apiDb/carts/${cartId}/products/${productId}`, {
      method: "put",
    });

    if (response.ok) {
      alert("Product added to cart");
    } else {
      alert("Error when adding the product to the cart");
    }
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}