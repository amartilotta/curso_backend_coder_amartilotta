async function addProductToCart(element){
    try{
      const productId = element.getAttribute("data-product-id")
      const cartId = element.getAttribute("data-cart-id")
      const response = await fetch(`/api/carts/${cartId}/product/${productId}`, {
        method: "post"
      })
      
      if(response.ok){
        alert("product added to cart")
      }
      else{
        alert("error when adding the to cart")
      }
      const data = await response.json()
      console.log(data)
    }
    catch (error){
      console.log(error)
    }
  }