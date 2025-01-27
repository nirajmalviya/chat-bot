document.getElementById("send-btn").addEventListener("click", async () => {
  const userInput = document.getElementById("user-input").value;
  if (!userInput) return;

  // Append user message to chat
  const chatMessages = document.getElementById("chat-messages");
  const userMessage = document.createElement("div");
  userMessage.className = "message user-message";
  userMessage.textContent = userInput;
  chatMessages.appendChild(userMessage);

  // Clear input field
  document.getElementById("user-input").value = "";

  // Call API to get bot response
  try {
    const response = await fetch("https://chat-bot-wtqw.onrender.com/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: userInput }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    // Append bot response to chat
    const botMessage = document.createElement("div");
    botMessage.className = "message bot-message";
    botMessage.textContent = data.response;
    chatMessages.appendChild(botMessage);

    // Scroll to the bottom of chat
    chatMessages.scrollTop = chatMessages.scrollHeight;
  } catch (error) {
    console.error("Error:", error);
    // Append error message to chat
    const chatMessages = document.getElementById("chat-messages");
    const errorMessage = document.createElement("div");
    errorMessage.className = "message error-message";
    errorMessage.textContent = `Error: ${error.message}`;
    chatMessages.appendChild(errorMessage);
  }
});
