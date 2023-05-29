window.pets = [];
const pushPet = pet => {
  window.pets.push(pet);
  Pet.renderAll();
}

class Pet {
  constructor(name, species, age, color, breed, favoriteFood, favoriteToy, featured = false, aquatic = false) {
    this.name = name;
    this.species = species;
    this.age = age;
    this.color = color;
    this.breed = breed;
    this.favoriteFood = favoriteFood;
    this.favoriteToy = favoriteToy;
    this.featured = featured;
    this.aquatic = aquatic;
  }

  generateCard() {
    let cardClass = "pets__card";
    if (this.aquatic) {
      cardClass = "pets__aquatic_card"
    } else if (this.featured) {
      cardClass = "pets__featured_card"
    }

    return `
      <div class="${cardClass}">
        <h2 class="pets__card__title">${this.name}</h2>
        <p class="pets__card__info">Species: ${this.species}</p>
        <p class="pets__card__info">Age: ${this.age}</p>
        <p class="pets__card__info">Color: ${this.color}</p>
        <p class="pets__card__info">Breed: ${this.breed}</p>
        <p class="pets__card__info">Favorite Food: ${this.favoriteFood}</p>
        <p class="pets__card__info">Favorite Toy: ${this.favoriteToy}</p>
        <button type="button" class="pets__card__button">More Info</button>
      </div>
    `;
  }

  static renderAll() {
    const petsGrid = document.querySelector('.pets__grid');
    if (!petsGrid) return;

    petsGrid.innerHTML = '';
    window.pets.forEach(pet => {
      petsGrid.innerHTML += pet.generateCard();
    });
  }
}

const fetchPets = species => {
  fetch(`http://127.0.0.1:3000/api/v1/pets${species ? `?species=${species}` : ''}`).then(response => response.json()).then(data => {
    console.log(data)
    data.forEach(pet => {
      pushPet(new Pet(
        pet.name,
        pet.species,
        pet.age,
        pet.color,
        pet.breed,
        pet.favorite_food,
        pet.favorite_toy,
        pet.featured,
        pet.aquatic
      ));
    });
  });
}

// Check params for "species" and fetch pets accordingly
const params = new URLSearchParams(window.location.search);
const species = params.get('species');
fetchPets(species);
