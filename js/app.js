/*======MODEL======*/

var model = {
  currentCat: null,
  admin: false,
  cats: [{
      clickCount: 0,
      name: 'Cat 1',
      imgSrc: 'img/cat1.jpeg',
      imgAttribution: 'Cat 1'
    },
    {
      clickCount: 0,
      name: 'Cat 2',
      imgSrc: 'img/cat2.jpeg',
      imgAttribution: 'Cat 2'
    },
    {
      clickCount: 0,
      name: 'Cat 3',
      imgSrc: 'img/cat3.jpeg',
      imgAttribution: 'Cat 3'
    },
    {
      clickCount: 0,
      name: 'Cat 4',
      imgSrc: 'img/cat4.jpeg',
      imgAttribution: 'Cat 4'
    },
    {
      clickCount: 0,
      name: 'Cat 5',
      imgSrc: 'img/cat5.jpeg',
      imgAttribution: 'Cat 5'
    }
  ]
};



/* ======= Octopus ======= */

var octopus = {

  init: function() {
    // set our current cat to the first one in the list
    model.currentCat = model.cats[0];

    // tell our views to initialize
    catListView.init();
    catView.init();
  },

  getCurrentCat: function() {
    return model.currentCat;
  },

  getCats: function() {
    return model.cats;
  },

  // set the currently-selected cat to the object passed in
  setCurrentCat: function(cat) {
    model.currentCat = cat;
  },

  // increments the counter for the currently-selected cat
  incrementCounter: function() {
    model.currentCat.clickCount++;
    catView.render();
  },

  activateAdmin: function() {
    model.admin = true;
    adminDiv.removeAttribute('style');
  },

  cancel: function() {
    adminDiv.setAttribute('style', 'display: none;')
  },

  save: function() {
    var currentCat = octopus.getCurrentCat();
    this.catNameElem = document.getElementById('cat-name');
    this.countElem = document.getElementById('cat-count');
    this.catNameElem.textContent = nameInput.value;
    currentCat.name = nameInput.value;
    this.countElem.textContent = clicksInput.value;
    currentCat.clickCount = clicksInput.value;
  }

};


/* ======= View ======= */
var admin = $('.admin');
var adminDiv = document.querySelector('.adminDiv');
var cancel = $('.cancel');
var activateAdmin = $('.admin');
var save = $('.save');
var nameInput = document.querySelector('.name');
var clicksInput = document.querySelector('.clicks');

var catView = {

  init: function() {
    // store pointers to our DOM elements for easy access later
    this.catElem = document.getElementById('cat');
    this.catNameElem = document.getElementById('cat-name');
    this.catImageElem = document.getElementById('cat-img');
    this.countElem = document.getElementById('cat-count');

    // on click, increment the current cat's counter
    this.catImageElem.addEventListener('click', function() {
      octopus.incrementCounter();
    });

    // render this view (update the DOM elements with the right values)
    this.render();
  },

  render: function() {
    // update the DOM elements with values from the current cat
    var currentCat = octopus.getCurrentCat();
    this.countElem.textContent = currentCat.clickCount;
    this.catNameElem.textContent = currentCat.name;
    this.catImageElem.src = currentCat.imgSrc;

    cancel.click(function() {
      octopus.cancel();
    });

    activateAdmin.click(function() {
      octopus.activateAdmin();
    });

    save.click(function() {
      octopus.save();
    })
  }

};

var catListView = {

  init: function() {
    // store the DOM element for easy access later
    this.catListElem = document.getElementById('cat-list');

    // render this view (update the DOM elements with the right values)
    this.render();
  },

  render: function() {
    var cat, img, i, elem;
    // get the cats we'll be rendering from the octopus
    var cats = octopus.getCats();

    // empty the cat list
    this.catListElem.innerHTML = '';

    // loop over the cats
    for (i = 0; i < cats.length; i++) {
      // this is the cat we're currently looping over
      cat = cats[i];

      // make a new cat list item and set its text
      var img = document.createElement('img');
      img.setAttribute('src', cat.imgSrc);

      // on click, setCurrentCat and render the catView
      // (this uses our closure-in-a-loop trick to connect the value
      //  of the cat variable to the click event function)
      img.addEventListener('click', (function(catCopy) {
        return function() {
          octopus.setCurrentCat(catCopy);
          catView.render();
        };
      })(cat));

      // finally, add the element to the list
      this.catListElem.appendChild(img);
    }
  }
};

// make it go!
octopus.init();