document.addEventListener("DOMContentLoaded", function() {
  var errorMessageElement = document.getElementById("error-message");
  if (errorMessageElement) {
    var errorMessage = errorMessageElement.getAttribute("data-message");

    if (typeof Toastify !== 'undefined') {
      Toastify({
        text: errorMessage,
        duration: 3000,
        style: {
          background: "linear-gradient(to right, #C42200, #E52800)",
        },
      }).showToast();
    }
  }
});