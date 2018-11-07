const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

// YOUR CODE HERE

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
  } else {
    toyForm.style.display = 'none'
  }
})


// OR HERE!
//This gets the toys and converts its to JSON
const getToys = function () {
  return fetch('http://localhost:3000/toys')
  .then(function(response) {
    return response.json()
  })
}

let toyCollection = document.getElementById('toy-collection')
// console.log(toy);

//This adds Toy to the toy collection
const appendToy = function (toy) {
  toyCollection.innerHTML += `<div class="card" id=${toy.id}>
    <h2>${toy.name}</h2>
    <img src=${toy.image} class="toy-avatar" />
    <p>${toy.likes} Likes </p>
    <button class="like-btn">Like <3</button>
    </div>`
}

//Iterates through array and appends them
const renderToys = function () {
  getToys().then(function(toysArray) {
    toyCollection.innerHTML = ""
    toysArray.forEach(function(toy) {
      appendToy(toy)
    })
  })
}

renderToys()

let theToyForm = document.querySelector('.add-toy-form')
    
theToyForm.addEventListener('submit', function(event) {
        event.preventDefault()
        
        let toyName = event.target[0].value
        let toyImage = event.target[1].value
  
        let newToyObj = {'name': toyName, 'image': toyImage, 'likes': 0}
  
        fetch('http://localhost:3000/toys',{
        headers: { 
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(newToyObj)
      }).then(function(recieveToy) {
        appendToy(recieveToy)
      }).then(function(){
        renderToys()
      })
      event.target.reset()
    })

    toyCollection.addEventListener('click', function(event){
        // console.log(event.target);
        // debugger
        event.preventDefault()
      if(event.target.className === "like-btn" ){
        let likeCount = parseInt(event.target.previousSibling.previousElementSibling.innerText.split(" ")[0]) + 1
        let toyId = parseInt(event.target.parentElement.id)
        fetch(`http://localhost:3000/toys/${toyId}`,{
          method: 'PATCH',
          body: JSON.stringify({
            'likes': likeCount
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(function(response){
          return response.json()
        }).then(function(){
          event.target.previousSibling.previousElementSibling.innerText[0] = likeCount
          renderToys()
        })
      } 
      
    })