document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.card-caixa');
  cards.forEach(card => {
 
    // clique do mouse
    card.addEventListener('click', () => {
      card.classList.toggle('virado');
    });
 });

  // Garantir scroll suave para links internos
  const links = document.querySelectorAll('a[href^="#"]');
  links.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        // Obter altura do header fixo
        const header = document.querySelector('header');
        const headerHeight = header ? header.offsetHeight : 0;
        
        // Calcular posição com offset para o header
        const targetPosition = targetElement.offsetTop - headerHeight;
        
        // Função de scroll suave personalizada
        function smoothScrollTo(targetPosition) {
          const startPosition = window.pageYOffset;
          const distance = targetPosition - startPosition;
          const duration = 800; // duração em ms
          let start = null;
          
          function animation(currentTime) {
            if (start === null) start = currentTime;
            const timeElapsed = currentTime - start;
            const progress = Math.min(timeElapsed / duration, 1);
            
            // Função de easing para movimento mais natural
            const ease = progress < 0.5 
              ? 2 * progress * progress 
              : 1 - Math.pow(-2 * progress + 2, 3) / 2;
            
            window.scrollTo(0, startPosition + distance * ease);
            
            if (timeElapsed < duration) {
              requestAnimationFrame(animation);
            }
          }
          
          requestAnimationFrame(animation);
        }
        
        // Executar scroll suave
        smoothScrollTo(targetPosition);
      }
    });
  });
});