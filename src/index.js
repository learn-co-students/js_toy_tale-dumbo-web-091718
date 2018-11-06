const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false
const toyCollection = document.getElementById('toy-collection')
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

fetch('http://localhost:3000/toys').then(function(response){
  return response.json();
})
.then(function(json){
 json.forEach( function(toys){
   toyCollection.innerHTML += `<div class="card">
        <h2>${toys.name}</h2>
        <img src="${toys.image}" class="toy-avatar">
       <p>${toys.likes} Likes </p>
       <button class="like-btn" id="${toys.id}">Like this toy son</button>
      </div>`

 })
})

function addLikeListener() {
  toyCollection.addEventListener( 'click' function(event){
    event.preventDefault()
    if( event.target.className === 'like-btn'){
      let likeNum = (event.target.parentElement.children[2].innerHTML.split("")[0]
      likeNum++
      let data = {
        "likes":likeNum
      })
    })
  }
}

//fetch all the current toys
// <div class="card">
//     <h2>Woody</h2>
//     <img src="http://www.pngmart.com/files/3/Toy-Story-Woody-PNG-Photos.png" class="toy-avatar">
//     <p>2 Likes </p>
//     <button class="like-btn" id="1">Like this toy son</button>
//   </div>
// OR HERE!

// document.addEventListener('DOMContentLoaded', function() {
//     fetchToys()
//     addToyListener()
//     addLikeListener()
// })

// function fetchToys() {
//     toyCollection.innerHTML = ""
//     fetch('http://localhost:3000/toys')
//         .then(res => res.json())
//         .then(json =>
//             json.forEach(function(toy) {
//                 addToyToDiv(toy)
//             })
//         )
// }
//
// function addToyToDiv(toy) {
//     toyCollection.innerHTML += `<div class="card">
//     <h2>${toy.name}</h2>
//     <img src="${toy.image}" class="toy-avatar" />
//     <p>${toy.likes} Likes </p>
//     <button class="like-btn" id="${toy.id}">Like this toy son</button>
//   </div>`
// }
//
// function addToyListener() {
//     let toyInput = document.querySelector('.add-toy-form')
//     let toyName = toyInput.children[1]
//     let toyImage = toyInput.children[3]
//
//
//     toyForm.addEventListener('submit', function(event) {
//         let data = {
//             "name": toyName.value,
//             "image": toyImage.value,
//             "likes": 0
//         }
//
//         event.preventDefault()
//         fetch('http://localhost:3000/toys', {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                     Accept: "application/json"
//                 },
//                 body: JSON.stringify(data)
//
//             }).then(res => res.json())
//             .then(json =>
//                 fetchToys()
//             )
//     })
// }
//
// function addLikeListener() {
//   toyCollection.addEventListener('click',function(event){
//     event.preventDefault()
//
//
//     if (event.target.className==="like-btn"){
//       let likeNum=event.target.parentElement.children[2].innerHTML.split("")[0]
//       likeNum++
//       let data = {
//         "likes":likeNum
//       }
//
//       fetch(`http://localhost:3000/toys/${event.target.id}`,{
//       method: "PATCH",
//       headers:{
//         "Content-Type":"application/json",
//         Accept: "application.json"
//       },
//       body: JSON.stringify(data)
//     }).then(res=>res.json()).then(json=>fetchToys())//fetch
//
//   }//if
//   })
// }
//








// const addBtn = document.querySelector('#new-toy-btn')
// const toyForm = document.querySelector('.container')
// let addToy = false
//
// // YOUR CODE HERE
//
// addBtn.addEventListener('click', () => {
//   // hide & seek with the form
//   addToy = !addToy
//   if (addToy) {
//     toyForm.style.display = 'block'
//     // submit listener here
//   } else {
//     toyForm.style.display = 'none'
//   }
// })
//
//
// // OR HERE!
