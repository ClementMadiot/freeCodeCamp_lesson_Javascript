const messageInput = document.getElementById('message-input');
const result = document.getElementById('result');
const checkMessageButton = document.getElementById('check-message-btn');

checkMessageButton.addEventListener('click', () => {
if(messageInput === ''){
  alert('Please enter a message.')
  return
}
});
const isSpam = (msg) => false