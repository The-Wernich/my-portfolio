function submitForm(event) {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);

  fetch("https://formspree.io/f/mnnvrzwn", {
    method: "POST",
    headers: {
      'Accept': 'application/json'
    },
    body: formData
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    const modal = document.getElementById("thank-you-modal");
    modal.style.display = "flex";
    document.body.classList.add("modal-open");
    form.reset();
  })
  .catch(error => {
    console.error("Formspree Error:", error);
    alert(`Submission failed: ${error.message}`);
  });
}

function closeModal() {
  const modal = document.getElementById("thank-you-modal");
  modal.style.display = "none";
  document.body.classList.remove("modal-open");
}
