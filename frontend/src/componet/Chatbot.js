import React, { useState } from "react";
import axios from "axios";

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    // Add user message to chat
    setMessages((prev) => [...prev, { sender: "user", text: input }]);

    try {
      const res = await axios.post("http://localhost:5000/api/chatbot", {
        message: input,
      });

      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: res.data.reply },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "❌ Error connecting to chatbot." },
      ]);
    }

    setInput("");
  };

  return (
    <div style={styles.container}>
      <h2>🌱 Greenopedia Chatbot</h2>
      <div style={styles.chatBox}>
        {messages.map((msg, index) => (
          <p
            key={index}
            style={{
              ...styles.message,
              alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
              backgroundColor: msg.sender === "user" ? "#d1ffd6" : "#f1f1f1",
            }}
          >
            <strong>{msg.sender === "user" ? "You" : "Bot"}:</strong>{" "}
            {msg.text}
          </p>
        ))}
      </div>
      <div style={styles.inputBox}>
        <input
          type="text"
          value={input}
          placeholder="Ask about plants..."
          onChange={(e) => setInput(e.target.value)}
          style={styles.input}
        />
        <button onClick={sendMessage} style={styles.button}>
          Send
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    width: "400px",
    margin: "20px auto",
    padding: "15px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    fontFamily: "Arial, sans-serif",
  },
  chatBox: {
    height: "300px",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    gap: "5px",
    padding: "10px",
    border: "1px solid #ddd",
    marginBottom: "10px",
    borderRadius: "5px",
    backgroundColor: "#fff",
  },
  message: {
    padding: "8px 12px",
    borderRadius: "15px",
    maxWidth: "80%",
  },
  inputBox: {
    display: "flex",
    gap: "10px",
  },
  input: {
    flex: 1,
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "10px 15px",
    border: "none",
    borderRadius: "5px",
    backgroundColor: "#4CAF50",
    color: "white",
    cursor: "pointer",
  },
};

export default Chatbot;
