const form = document.getElementById("reservationForm");
const confirmationMessage = document.getElementById("confirmationMessage");

form.addEventListener("submit", function(e){
  e.preventDefault();

  confirmationMessage.style.display = "block";
  confirmationMessage.innerHTML =
    "🎉 Your reservation has been successfully confirmed!";

  form.reset();
});