function reloadAndScrollToSection(sectionId) {
  const currentUrl = window.location.href.split('#')[0];
  window.location.href = `${currentUrl}#${sectionId}`;
  window.location.reload();
}

document.addEventListener('DOMContentLoaded', () => {
  const links = document.querySelectorAll('nav ul li a');
  links.forEach(link => {
      link.addEventListener('click', (event) => {
          event.preventDefault();
          const sectionId = link.getAttribute('href').substring(1);
          document.body.classList.add('fade-out');
          setTimeout(() => {
              reloadAndScrollToSection(sectionId);
          }, 500);
      });
  });
});
