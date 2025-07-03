function submitForm(event) {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);

  fetch("https://formsubmit.co/ajax/valentino.wernich@outlook.com", {
    method: "POST",
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
    console.error("FormSubmit Error:", error);
    alert(`Submission failed: ${error.message}`);
  });
}
