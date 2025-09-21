
document.addEventListener("DOMContentLoaded", () => {
  const chatForm = document.getElementById("chat-form");
  const chatInput = document.getElementById("chat-input");
  const chatMessages = document.getElementById("chat-messages");

  function addMessage(sender, text) {
    const msg = document.createElement("div");
    msg.classList.add("message", sender);
    msg.textContent = text;
    chatMessages.appendChild(msg);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  chatForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const userMessage = chatInput.value.trim();
    if (!userMessage) return;

    addMessage("user", userMessage);
    chatInput.value = "";

    try {
      const res = await fetch("http://localhost:5001/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await res.json();
      addMessage("bot", data.reply || "⚠️ No reply received");
    } catch (err) {
      console.error("Chatbot error:", err);
      addMessage("bot", "⚠️ Error connecting to chatbot server");
    }
  });
});
