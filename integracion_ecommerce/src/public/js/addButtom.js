async function addProductToCarts(element) {
  try {
    const productId = element.getAttribute("data-product-id");
    const cartId = element.getAttribute("data-cart-id");
    const response = await fetch(`/api/carts/${cartId}/products/${productId}`, {
      method: "post",
    });
    console.log("SOY EL ELEMENT", element);
    console.log("soy el id del carrito: ", cartId);
    console.log("soy el response",response);
    if (response.ok) {
      alert("Product added to cart");
    } else {
      alert("Error when adding the product to the cart");
    }
    const data = await response.json();
    console.log("soy la data",data);
  } catch (error) {
    console.log(error);
  }
}