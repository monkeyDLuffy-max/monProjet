// Attendre que le DOM soit complètement chargé
document.addEventListener('DOMContentLoaded', function() {
    // Initialisation
    initializeApp();
    
    // Ajouter la classe fade-in au corps pour l'animation
    document.body.classList.add('fade-in');
  });
  
  // Fonction d'initialisation principale
  function initializeApp() {
    // Activer tous les tooltips
    initTooltips();
    
    // Activer la navigation active
    highlightCurrentNavItem();
    
    // Animation au défilement
    initScrollAnimations();
    
    // Bouton de mode sombre
    initDarkModeToggle();
    
    // Animations des cartes
    initCardAnimations();
    
    // Ajouter le bouton flottant de retour en haut
    addBackToTopButton();
    
    // Initialiser les notifications
    initNotifications();
    
    // Ajouter la recherche dynamique
    initDynamicSearch();
  
    // Ajouter la validation des formulaires
    initFormValidation();
    
    // Initialiser le panier d'achat
    initShoppingCart();
    
    // Initialiser le sélecteur de langue
    initLanguageSelector();
  }
  
  // Activer Bootstrap Tooltips
  function initTooltips() {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function(tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl);
    });
  }
  
  // Mettre en évidence l'élément de navigation actif
  function highlightCurrentNavItem() {
    const currentUrl = window.location.pathname;
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    navLinks.forEach(link => {
      // Nettoyer l'URL de Django
      const linkUrl = link.getAttribute('href').replace(/[{}%]/g, '');
      
      if (currentUrl.includes(linkUrl) && linkUrl !== '/') {
        link.classList.add('active');
      } else if (currentUrl === '/' && linkUrl === '/') {
        link.classList.add('active');
      }
    });
  }
  
  // Animations au défilement
  function initScrollAnimations() {
    // Observer les éléments pour l'animation au défilement
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate__animated', 'animate__fadeInUp');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    // Observer les cartes et autres éléments
    document.querySelectorAll('.card, .section-title, .product-item').forEach(item => {
      observer.observe(item);
    });
  }
  
  // Bouton pour basculer entre mode clair et sombre
  function initDarkModeToggle() {
    // Créer le bouton de basculement
    const darkModeButton = document.createElement('button');
    darkModeButton.innerHTML = '<i class="fas fa-moon"></i>';
    darkModeButton.className = 'btn btn-sm btn-outline-light dark-mode-toggle';
    darkModeButton.setAttribute('title', 'Changer de thème');
    darkModeButton.style.cssText = `
      position: fixed;
      right: 20px;
      bottom: 20px;
      z-index: 999;
      border-radius: 50%;
      width: 45px;
      height: 45px;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 2px 10px rgba(0,0,0,0.2);
      transition: all 0.3s;
      background-color: #343a40;
    `;
    
    // Ajouter à la page
    document.body.appendChild(darkModeButton);
    
    // Vérifier les préférences utilisateur
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedMode = localStorage.getItem('darkMode');
    
    if (savedMode === 'true' || (savedMode === null && prefersDarkMode)) {
      document.body.classList.add('dark-mode');
      darkModeButton.innerHTML = '<i class="fas fa-sun"></i>';
      darkModeButton.style.backgroundColor = '#ffcc00';
      darkModeButton.style.color = '#343a40';
    }
    
    // Gestion du clic
    darkModeButton.addEventListener('click', function() {
      document.body.classList.toggle('dark-mode');
      const isDarkMode = document.body.classList.contains('dark-mode');
      
      // Changer l'icône
      if (isDarkMode) {
        this.innerHTML = '<i class="fas fa-sun"></i>';
        this.style.backgroundColor = '#ffcc00';
        this.style.color = '#343a40';
      } else {
        this.innerHTML = '<i class="fas fa-moon"></i>';
        this.style.backgroundColor = '#343a40';
        this.style.color = '#fff';
      }
      
      // Sauvegarder la préférence
      localStorage.setItem('darkMode', isDarkMode);
    });
  }
  
  // Animations des cartes de produits
  function initCardAnimations() {
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
      card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
        this.style.boxShadow = '0 15px 30px rgba(0,0,0,0.1)';
      });
      
      card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.05)';
      });
    });
  }
  
  // Bouton retour en haut
  function addBackToTopButton() {
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.setAttribute('title', 'Retour en haut');
    backToTopBtn.style.cssText = `
      position: fixed;
      right: 20px;
      bottom: 80px;
      z-index: 999;
      border-radius: 50%;
      width: 45px;
      height: 45px;
      background-color: #ffcc00;
      color: #343a40;
      border: none;
      display: none;
      align-items: center;
      justify-content: center;
      box-shadow: 0 2px 10px rgba(0,0,0,0.2);
      transition: all 0.3s;
      cursor: pointer;
    `;
    
    document.body.appendChild(backToTopBtn);
    
    // Afficher le bouton au défilement
    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 300) {
        backToTopBtn.style.display = 'flex';
        backToTopBtn.style.animation = 'fadeIn 0.3s';
      } else {
        backToTopBtn.style.display = 'none';
      }
    });
    
    // Retour en haut au clic
    backToTopBtn.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
  
  // Système de notifications
  function initNotifications() {
    // Créer le conteneur de notifications
    const notificationContainer = document.createElement('div');
    notificationContainer.className = 'toast-container position-fixed top-0 end-0 p-3';
    notificationContainer.style.zIndex = '1100';
    document.body.appendChild(notificationContainer);
    
    // Fonction pour afficher une notification
    window.showNotification = function(message, type = 'info') {
      const toastId = 'toast-' + Date.now();
      const iconMap = {
        'info': 'fas fa-info-circle text-primary',
        'success': 'fas fa-check-circle text-success',
        'warning': 'fas fa-exclamation-triangle text-warning',
        'error': 'fas fa-times-circle text-danger'
      };
      
      const toastHtml = `
        <div class="toast" role="alert" aria-live="assertive" aria-atomic="true" id="${toastId}">
          <div class="toast-header">
            <i class="${iconMap[type]} me-2"></i>
            <strong class="me-auto">${type.charAt(0).toUpperCase() + type.slice(1)}</strong>
            <small>à l'instant</small>
            <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
          </div>
          <div class="toast-body">
            ${message}
          </div>
        </div>
      `;
      
      notificationContainer.insertAdjacentHTML('beforeend', toastHtml);
      const toastElement = document.getElementById(toastId);
      const toast = new bootstrap.Toast(toastElement, { autohide: true, delay: 5000 });
      toast.show();
      
      // Supprimer après la fermeture
      toastElement.addEventListener('hidden.bs.toast', function() {
        this.remove();
      });
    };
    
    // Exemple d'utilisation
    // setTimeout(() => {
    //   window.showNotification('Bienvenue sur ShopEase!', 'success');
    // }, 1000);
  }
  
  // Recherche dynamique
  function initDynamicSearch() {
    const navbarNav = document.querySelector('.navbar-nav');
    
    // Créer la barre de recherche
    const searchForm = document.createElement('form');
    searchForm.className = 'ms-auto d-flex position-relative search-form';
    searchForm.innerHTML = `
      <input class="form-control me-2" type="search" placeholder="Rechercher..." aria-label="Rechercher" id="searchInput">
      <button class="btn" type="submit" style="background: none; border: none; position: absolute; right: 5px; top: 5px;">
        <i class="fas fa-search text-light"></i>
      </button>
      <div id="searchResults" class="position-absolute w-100 mt-1 bg-white rounded shadow-sm d-none" 
           style="top: 100%; left: 0; z-index: 1000; max-height: 300px; overflow-y: auto;"></div>
    `;
    
    navbarNav.insertAdjacentElement('afterend', searchForm);
    
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    
    // Simuler des résultats de recherche (à remplacer par une API réelle)
    const mockProducts = [
      { id: 1, name: 'Ordinateur portable Pro', price: '1299 €', category: 'Électronique' },
      { id: 2, name: 'Écran 27" 4K', price: '399 €', category: 'Écrans' },
      { id: 3, name: 'Souris sans fil ergonomique', price: '59 €', category: 'Accessoires' },
      { id: 4, name: 'Clavier mécanique', price: '89 €', category: 'Accessoires' },
      { id: 5, name: 'Smartphone XS', price: '899 €', category: 'Téléphonie' }
    ];
    
    searchInput.addEventListener('input', function() {
      const query = this.value.toLowerCase().trim();
      
      if (query.length < 2) {
        searchResults.classList.add('d-none');
        return;
      }
      
      // Filtrer les résultats
      const filteredResults = mockProducts.filter(product => 
        product.name.toLowerCase().includes(query) || 
        product.category.toLowerCase().includes(query)
      );
      
      // Afficher les résultats
      if (filteredResults.length > 0) {
        searchResults.innerHTML = filteredResults.map(product => `
          <div class="p-2 border-bottom search-item" data-id="${product.id}">
            <div class="fw-bold">${product.name}</div>
            <div class="d-flex justify-content-between">
              <small class="text-muted">${product.category}</small>
              <span class="text-primary">${product.price}</span>
            </div>
          </div>
        `).join('');
        
        searchResults.classList.remove('d-none');
        
        // Ajouter des écouteurs d'événements aux résultats
        document.querySelectorAll('.search-item').forEach(item => {
          item.addEventListener('click', function() {
            const productId = this.getAttribute('data-id');
            // Rediriger vers la page du produit (simulé)
            window.showNotification(`Produit ${productId} sélectionné`, 'info');
            searchResults.classList.add('d-none');
            searchInput.value = '';
          });
        });
      } else {
        searchResults.innerHTML = `<div class="p-3 text-center text-muted">Aucun résultat trouvé</div>`;
        searchResults.classList.remove('d-none');
      }
    });
    
    // Masquer les résultats lors du clic à l'extérieur
    document.addEventListener('click', function(e) {
      if (!searchForm.contains(e.target)) {
        searchResults.classList.add('d-none');
      }
    });
    
    // Empêcher la soumission du formulaire
    searchForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const query = searchInput.value.trim();
      if (query) {
        window.showNotification(`Recherche de: "${query}"`, 'info');
      }
    });
  }
  
  // Validation de formulaire
  function initFormValidation() {
    // Chercher tous les formulaires nécessitant une validation
    const forms = document.querySelectorAll('.needs-validation');
    
    // Parcourir les formulaires
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
          window.showNotification('Veuillez corriger les erreurs du formulaire', 'warning');
        } else {
          // Simuler l'envoi du formulaire
          event.preventDefault();
          
          // Afficher l'indicateur de chargement
          const submitBtn = form.querySelector('[type="submit"]');
          const originalBtnText = submitBtn.innerHTML;
          submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Traitement...';
          submitBtn.disabled = true;
          
          // Simuler un délai d'envoi
          setTimeout(() => {
            window.showNotification('Formulaire envoyé avec succès!', 'success');
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
            form.reset();
          }, 1500);
        }
        
        form.classList.add('was-validated');
      }, false);
    });
  }
  
  // Panier d'achat interactif
  function initShoppingCart() {
    // Créer l'icône de panier dans la navbar
    const navbarNav = document.querySelector('.navbar-nav');
    const cartItem = document.createElement('li');
    cartItem.className = 'nav-item dropdown';
    cartItem.innerHTML = `
      <a class="nav-link dropdown-toggle" href="#" id="cartDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
        <i class="fas fa-shopping-cart"></i> 
        <span class="badge rounded-pill bg-danger cart-badge">0</span>
      </a>
      <div class="dropdown-menu dropdown-menu-end p-3" aria-labelledby="cartDropdown" style="min-width: 300px;">
        <h6 class="dropdown-header">Votre Panier</h6>
        <div class="cart-items">
          <p class="text-center text-muted mt-3 mb-3">Votre panier est vide</p>
        </div>
        <hr>
        <div class="d-flex justify-content-between">
          <span class="fw-bold">Total:</span>
          <span class="cart-total">0.00 €</span>
        </div>
        <div class="d-grid gap-2 mt-3">
          <button class="btn btn-primary checkout-btn" disabled>Passer commande</button>
        </div>
      </div>
    `;
    
    navbarNav.appendChild(cartItem);
    
    // État du panier
    const cart = {
      items: [],
      total: 0,
      count: 0
    };
    
    // Fonction pour mettre à jour l'affichage du panier
    function updateCartDisplay() {
      const cartBadge = document.querySelector('.cart-badge');
      const cartItemsContainer = document.querySelector('.cart-items');
      const cartTotal = document.querySelector('.cart-total');
      const checkoutBtn = document.querySelector('.checkout-btn');
      
      // Mettre à jour le badge
      cartBadge.textContent = cart.count;
      
      // Mettre à jour le contenu
      if (cart.items.length === 0) {
        cartItemsContainer.innerHTML = `<p class="text-center text-muted mt-3 mb-3">Votre panier est vide</p>`;
        checkoutBtn.disabled = true;
      } else {
        let cartHtml = '';
        cart.items.forEach(item => {
          cartHtml += `
            <div class="cart-item d-flex justify-content-between align-items-center mb-2">
              <div>
                <div class="fw-bold">${item.name}</div>
                <div class="text-muted small">${item.price.toFixed(2)} € x ${item.quantity}</div>
              </div>
              <div class="d-flex align-items-center">
                <span class="me-2">${(item.price * item.quantity).toFixed(2)} €</span>
                <button class="btn btn-sm btn-outline-danger remove-from-cart" data-id="${item.id}">
                  <i class="fas fa-times"></i>
                </button>
              </div>
            </div>
          `;
        });
        cartItemsContainer.innerHTML = cartHtml;
        checkoutBtn.disabled = false;
        
        // Ajouter desécouteurs pour supprimer des articles
        document.querySelectorAll('.remove-from-cart').forEach(button => {
          button.addEventListener('click', function(e) {
            e.stopPropagation();
            const itemId = parseInt(this.getAttribute('data-id'));
            removeFromCart(itemId); });
        });   
    }
    }
    
    // Fonction pour supprimer un article du panier