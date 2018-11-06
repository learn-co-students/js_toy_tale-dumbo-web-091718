const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

//// toy form to add new toy
toyForm.addEventListener("submit", (event)=>{
  event.preventDefault()
  let toyName = event.target.children[1].value
  let toyUrl = event.target.children[3].value
  fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers:
    {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ "name": toyName,
      "image": toyUrl,
      "likes": 0 })
  }).then(response => response.json())
  return getToys('http://localhost:3000/toys')
})


/// button to display add toy form
addBtn.addEventListener('click', () => {
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
  } else {
    toyForm.style.display = 'none'
  }
})

///function to fetch and display all toys
function getToys(url) {
  fetch(url)
  .then(function(response) {
    return response.json();
  })
  .then(function(jsonResponse) {
    let toyDiv = document.getElementById('toy-collection')
    function loadToys(toyArr) {
      toyDiv.innerHTML = ""
      for (toy of toyArr) {
        let toyCard = document.createElement('div')
        toyCard.className = 'card'
        toyCard.innerHTML = `<h2>${toy['name']}</h2><img src="${toy['image']}" class="toy-avatar" /><p>${toy['likes']} Likes </p><button data-id="${toy['id']}" class="like-btn">Like <3</button>`
        toyDiv.appendChild(toyCard)
      }
    }
    loadToys(jsonResponse)
  })
}

//// like button creation
let likeBttn = document.getElementsByClassName('like-btn')
window.addEventListener("click", (event) => {
  event.preventDefault
  if (event.target.className === 'like-btn') {
    let newLike = parseInt(event.target.previousSibling.innerHTML.split(" ")[0])+1
    console.log(newLike)
    let toyUrl = 'http://localhost:3000/toys/' + `${event.target.dataset["id"]}`
    fetch(toyUrl, {
      method: 'PATCH',
      headers:
      {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ "likes": newLike })
    }).then(response => response.json())
  }
  return getToys('http://localhost:3000/toys')
})

///function call to load page with toys
getToys('http://localhost:3000/toys')
