 

  const View = {
    menu: null,
    navigation: null,
    hamburger: null,
    cards: null,

  init() {
      this.body = document.querySelector('body');
      this.menu = document.querySelector('#menu');
      this.navigation = document.querySelector('.header__navigation');
      this.hamburger = document.querySelector('.hamburger');
      this.cards = document.querySelector('.main-cards-images');
      this.switcher = document.querySelector('input');
      this.overlay =  document.querySelector('.overlay');
      
      this.link_container = document.querySelector('.navigation');
      this.list_for_link = document.querySelector('li');
      this.link = document.querySelector('a');
  

      //toggle switcher

      this.hamburger.addEventListener('click', this.clickHamburgerHandler.bind(this));
      this.navigation.addEventListener('click', this.clickLinksHandler.bind(this));

    
    },

    drowMainPage(img, text, id) {
      const container = document.createElement('div');
      container.classList.add('maine-page-cards');
      container.setAttribute('data-id', id);

      const card = document.createElement('div');
      card.classList.add('image-link');

      const image = document.createElement('img');
      image.setAttribute('src', img);
      image.setAttribute('alt', text);

      const title = document.createElement('span');
      title.textContent = text;

      card.appendChild(image);
      card.appendChild(title);

      container.appendChild(card);

      this.cards.appendChild(container);
    },

    drowMainPageCards(arrayCards) {
      arrayCards.forEach((card) => {
        this.drowMainPage(card.image, card.word, card.categories_id);
      });
  },

    drowMenu(text, id) {
      const listLink = document.createElement('li');
      // const link = document.createElement('a');
      // link.setAttribute('href');
      listLink.setAttribute('data-id', id);
      listLink.textContent = text;

      // listLink.appendChild(link);
      this.link_container.appendChild(listLink);
    },

    drowMenuPanel(arrayMenu) {
      arrayMenu.forEach((link) => {
        this.drowMenu(link.category, link.id);
      });
    },

   openMobileMenu() {
    this.overlay.classList.add('hidden-overlay');
    this.hamburger.classList.add('clicked__hamburger');
    this.navigation.style.left = "0%";
  },
  
  closeMobileMenu() {
    this.hamburger.classList.remove('clicked__hamburger');
    this.navigation.style.left = "-100%";
  },
  
  clickHamburgerHandler()  {
      if (this.navigation.style.left === "-100%" || this.navigation.style.left === "") {
          this.openMobileMenu();
      } else {
          this.closeMobileMenu();
      }
  },
  
  clickLinksHandler (e) {
      if (e.target.tagName === 'A') {
          this.closeMobileMenu();
      }
  },

   changeBackgroundColor() {
      let imageColor = document.querySelectorAll(".image-link");
      if(this.switcher.classList.contains('active')) {
        this.navigation.style.background = 'linear-gradient(to bottom left, #00cc00 0%, #ffcc00 100%)';
        imageColor.forEach(b => b.style.background = 'linear-gradient(to bottom left, #00cc00 0%, #ffcc00 100%)');
      } else {
        this.navigation.style.background = 'linear-gradient(to top right, #ffcc00 0%, #ff00ff 100%)';
        imageColor.forEach(b => b.style.background = 'linear-gradient(to top right, #ffcc00 0%, #ff00ff 100%)');
      }
    },
    
//flip card
   flipCard(card) {
      card.classList.toggle('is-flipped');
  },

// Draw card
  drawCard (img, text, sound, translate, id) {
    // main scene for card flip
      const container = document.createElement('div');
      container.classList.add('scene');

    // inner container for both sides
      const innerContainer = document.createElement('div');
      innerContainer.classList.add('card');
      innerContainer.setAttribute('data-id', id);

      container.appendChild(innerContainer);

     // Font side 
      const card = document.createElement('div');
      card.classList.add('card__face', 'card__face--front', 'image-link');

      
      // Back side
      const cardFacaBack = document.createElement('div');
      cardFacaBack.classList.add('card__face', 'card__face--back', 'image-link');

      // Image
      const image = document.createElement('img');
      image.setAttribute('src', img);
      image.setAttribute('alt', text);

      // Back side image
      const imageBack = document.createElement('img');
      imageBack.setAttribute('src', img);
      imageBack.setAttribute('alt', text);

      // Audio
      const audio = document.createElement('audio');
      audio.setAttribute('src', sound);

      // Title
      const title = document.createElement('span');
      title.textContent = text;

      const arrow = document.createElement('img');
      arrow.classList.add('arrow');
      arrow.setAttribute('src', '../src/img/rotate.svg');


      // Back side title
      const titleBack = document.createElement('span');
      titleBack.textContent = translate;

      card.appendChild(image);
      card.appendChild(audio);
      card.appendChild(title);
      card.appendChild(arrow);

      cardFacaBack.appendChild(imageBack);
      cardFacaBack.appendChild(titleBack);

      innerContainer.appendChild(card);
      innerContainer.appendChild(cardFacaBack);

      this.cards.appendChild(container);

    },

   // Draw cardSSS 
  drawCards (arrayCards) {
    arrayCards.forEach((card) => {
      this.drawCard(card.image, card.word, card.audioSrc, card.translation, card.id);
    });
},

 cleanPage() {
  this.cards.innerHTML = '';
 },

 cleanListMenu() {
  this.link_container.innerHTML = '';
 }


  }





export default View;

