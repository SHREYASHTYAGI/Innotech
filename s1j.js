const header = document.getElementById('header');
const modeToggle = document.getElementById('mode-toggle');
const body = document.body;

header.addEventListener('animationend', () => {
  header.classList.add('typing-complete');
});

function toggleMode() {
  if (body.classList.contains('light-mode')) {
    body.classList.remove('light-mode');
    body.classList.add('dark-mode');
    modeToggle.textContent = 'Switch to Light Mode';
  } else {
    body.classList.remove('dark-mode');
    body.classList.add('light-mode');
    modeToggle.textContent = 'Switch to Dark Mode';
  }
}