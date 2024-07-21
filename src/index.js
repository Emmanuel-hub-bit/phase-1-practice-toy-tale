let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  // Handle form submission to add a new toy
  addToyForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const toyName = event.target.name.value;
    const toyImage = event.target.image.value;

    const newToy = {
      name: toyName,
      image: toyImage,
      likes: 0
    };

    // Send POST request to add the new toy
    fetch('http://localhost:3000/toys', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(newToy)
    })
    .then(response => response.json())
    .then(toy => {
      createToyCard(toy);
      addToyForm.reset();
    })
    .catch(error => {
      console.error('Error:', error);
    });
  });

  // Function to create a toy card
  function createToyCard(toy) {
    const toyCard = document.createElement("div");
    toyCard.className = "card";

    const toyName = document.createElement("h2");
    toyName.textContent = toy.name;

    const toyImage = document.createElement("img");
    toyImage.src = toy.image;
    toyImage.className = "toy-avatar";

    const toyLikes = document.createElement("p");
    toyLikes.textContent = `${toy.likes} Likes`;

    const likeButton = document.createElement("button");
    likeButton.className = "like-btn";
    likeButton.id = toy.id;
    likeButton.textContent = "Like ❤️";

    // Add event listener to like button
    likeButton.addEventListener("click", () => {
      const newLikes = toy.likes + 1;

      // Send PATCH request to update the toy's likes
      fetch(`http://localhost:3000/toys/${toy.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ likes: newLikes })
      })
      .then(response => response.json())
      .then(updatedToy => {
        toy.likes = updatedToy.likes;
        toyLikes.textContent = `${toy.likes} Likes`;
      })
      .catch(error => {
        console.error('Error:', error);
      });
    });

    toyCard.appendChild(toyName);
    toyCard.appendChild(toyImage);
    toyCard.appendChild(toyLikes);
    toyCard.appendChild(likeButton);

    toyCollection.appendChild(toyCard);
  }
});
