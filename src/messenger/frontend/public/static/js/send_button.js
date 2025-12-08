const chat = document.getElementById('chatBox');
const button = document.getElementById('sendBtn');
const input = document.getElementById('messageInput');

console.log("JS loaded!");

if (!chat || !button || !input) {
  console.error('Не найден один из элементов: chatBox, sendBtn, messageInput');
}

input.addEventListener('input', () => {
  button.disabled = input.value.trim() === '';
});


function sendMessage() {
  const message = input.value.trim();
  if (!message) return;

  const messageElem = document.createElement('div');
  messageElem.textContent = message;
  messageElem.className = 'message outgoing';

  chat.appendChild(messageElem);

  chat.scrollTop = chat.scrollHeight;

  input.value = '';
  input.focus();

  button.disabled = true;
}

button.addEventListener('click', sendMessage);

input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});

