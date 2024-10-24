document.getElementById("subscribe-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const emailInput = document.getElementById("email");
  const email = emailInput.value;
  const subscribeButton = document.querySelector(".notify-btn");

  // Use built-in validation
  if (!emailInput.checkValidity()) {
    alert("Please enter a valid email.");
    return;
  }

  // Replace button text with spinner (button size remains fixed)
  subscribeButton.classList.add("loading");
  subscribeButton.innerHTML = '<span class="spinner"></span>';
  subscribeButton.disabled = true;

  try {
    const response = await fetch(
      "https://9vpx1a5sb3.execute-api.eu-north-1.amazonaws.com/prod/subscribe",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      }
    );

    const result = await response.json();
    if (response.ok) {
      setTimeout(() => {
        subscribeButton.innerHTML = '<span class="checkmark"></span>';
      }, 500); // Small delay for a smooth experience
    } else {
      setTimeout(() => {
        subscribeButton.innerText = "Subscribe";
        subscribeButton.disabled = false;
        alert(`Error: ${result.message || 'Unknown error occurred'}`);
      }, 500);
    }
  } catch (error) {
    setTimeout(() => {
      subscribeButton.innerText = "Subscribe";
      subscribeButton.disabled = false;
      alert("Failed to connect to server.");
    }, 500);
  }
});
