// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'

// Your JavaScript code goes here!

const errorNode = document.getElementById('modal') 
errorNode.classList.add('hidden')

const posts = document.getElementsByClassName("media-post")
for (const post of posts) {
  let likeGlyph = post.querySelector('span.like-glyph')
  likeGlyph.addEventListener("click", likePost)
}


function likePost(event) {
      const li = event.target
      mimicServerCall()
      .then(res => handleLike(res)) 
      .catch(error => handleError(error) )
        
      function handleLike(res) {
        if (li.innerText == EMPTY_HEART) {
          console.log("LIKED")
          li.innerText = FULL_HEART
          li.classList.add('activated-heart')
        } else {
          console.log("unliked") 
          li.innerText = EMPTY_HEART 
          li.classList.remove('activated-heart')
        }
      }
      function handleError(error) {
        let errorMessage = document.createElement('p')
        errorMessage.innerHTML = `${error}`
        errorNode.appendChild(errorMessage)
        errorNode.classList.remove('hidden')

        setTimeout(function() {errorNode.classList.add('hidden')}, 5000)
        setTimeout(function() {errorMessage.innerHTML = " "}, 5000)
        
      }
    }


//------------------------------------------------------------------------------
// Ignore after this point. Used only for demo purposes
//------------------------------------------------------------------------------

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
