document
  .getElementById("subscribe-form")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const emailInput = document.getElementById("email");
    const email = emailInput.value;

    // Use built-in validation instead of regex
    if (!emailInput.checkValidity()) {
      document.getElementById("response-message").innerText =
        "Please enter a valid email.";
      return;
    }

    document.getElementById("response-message").innerText = "Processing...";

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
        document.getElementById("response-message").innerText =
          "Subscription successful!";
      } else {
        document.getElementById("response-message").innerText =
          `Error: ${result.message || 'Unknown error occurred'}`;
      }
    } catch (error) {
      document.getElementById("response-message").innerText =
        "Failed to connect to server.";
    }
  });
