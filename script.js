
function submitForm(event) {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);

  fetch("https://formsubmit.co/ajax/valentino.wernich@outlook.com", {
    method: "POST",
    body: formData
  })
  .then(response => response.json())
  .then(data => {
    const modal = document.getElementById("thank-you-modal");
    modal.style.display = "flex"; // Show using flex only
    document.body.classList.add("modal-open");
    form.reset();
  })
  .catch(error => {
    console.error("Error:", error);
    alert("Oops! Something went wrong. Please try again.");
  });
}

function closeModal() {
  document.getElementById("thank-you-modal").style.display = "none";
  document.body.classList.remove("modal-open");
}
