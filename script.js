
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("🌱 Greenopedia backend is running!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Greenopedia backend running on http://localhost:${PORT}`);
});
document.addEventListener('DOMContentLoaded', () => {
            const chatIcon = document.getElementById('chatIcon');
            const chatPopup = document.getElementById('chatPopup');
            const closeBtn = document.getElementById('closeBtn');
            const sendBtn = document.getElementById('sendBtn');
            const userInput = document.getElementById('userInput');
            const chatMessages = document.getElementById('chatMessages');

            chatIcon.addEventListener('click', () => {
                chatPopup.classList.add('show');
            });

            closeBtn.addEventListener('click', () => {
                chatPopup.classList.remove('show');
            });

            const sendMessage = () => {
                const messageText = userInput.value.trim();
                if (messageText === '') return;

                addMessage(messageText, 'user');
                userInput.value = '';

                setTimeout(() => {
                    const botResponse = getBotResponse(messageText);
                    addMessage(botResponse, 'bot');
                }, 600);
            };

            sendBtn.addEventListener('click', sendMessage);
            userInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    sendMessage();
                }
            });

            const addMessage = (text, sender) => {
                const messageElement = document.createElement('div');
                messageElement.classList.add('message', `${sender}-message`);
                const textElement = document.createElement('p');
                textElement.textContent = text;
                messageElement.appendChild(textElement);
                chatMessages.appendChild(messageElement);
                chatMessages.scrollTop = chatMessages.scrollHeight;
            };

            const getBotResponse = (userMessage) => {
                const msg = userMessage.toLowerCase();
                if (msg.includes('hello') || msg.includes('hi')) {
                    return 'Hi there! How can I help you?';
                } else if (msg.includes('price') || msg.includes('cost')) {
                    return 'Our pricing is available on the pricing page.';
                } else if (msg.includes('support') || msg.includes('help')) {
                    return 'Sure, I can help. What seems to be the problem?';
                } else if (msg.includes('bye')) {
                    return 'Goodbye! Have a great day!';
                } else {
                    return "I'm sorry, I'm not sure how to answer that.";
                }
            };
        });