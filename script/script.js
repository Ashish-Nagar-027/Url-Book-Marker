const addNewBox = document.querySelector('.add-new')
const modal = document.querySelector('.modal')
const cancelModalIcon = document.querySelector('.remove-modal')
const addBtn = document.querySelector('.add-url-btn')
const urlNameInput = document.querySelector('#url-name-input')
const mainUrlInput = document.querySelector('#url-input')
const warningText = document.querySelector('.warning-text')
const allBookmark = document.querySelector('.all-bookmarks')


let bookmarks = []


// Event Listners
addNewBox.addEventListener('click', addNew)
cancelModalIcon.addEventListener('click',removeModal)
addBtn.addEventListener('click', submitBtn)
document.addEventListener('DOMContentLoaded', getFromLocalStorage)

// functions

// remove modal while clicking outside of modal
modal.addEventListener('click', (e)=> {
    e.target.classList.contains('modal-show') ? modal.classList.remove('modal-show') : false
})


// hide modal function
function removeModal() {
    modal.classList.remove('modal-show')
}

// show modal
function addNew() {
    modal.classList.add('modal-show')
}

// submit button
function submitBtn(e) {
    e.preventDefault()

    // checking for empty values 
    if ( urlNameInput.value == '' || mainUrlInput.value == '') {
        warningText.classList.add('text-show')
        setTimeout(() => {
            warningText.classList.remove('text-show')
        }, 1000);
    }
    
    // checking for url format
    else {
        if (checkUrl( mainUrlInput.value)) {
            CreatBookmark(urlNameInput.value,mainUrlInput.value )
            saveToLocal(urlNameInput.value ,mainUrlInput.value )
            urlNameInput.value = ''
            mainUrlInput.value = ''
        }
        else {
            warningText.classList.add('text-show')
            setTimeout(() => {
                warningText.classList.remove('text-show')
            }, 3000);
        }
    }
}



// Creating Bookmark
function CreatBookmark(urlName,url){

    let bookmark = document.createElement('div')

    bookmark.setAttribute('class' ,'bookmark-item')

    bookmark.innerHTML = `<img height="16" width="16" src='http://www.google.com/s2/favicons?domain=${url}' alt="icon"/>
    <div class="bookmark-url"><a href="${url}" target='_blank'>${urlName}</a></div>
    <i class="fa-solid fa-xmark removeBookmark" id='removeBookmark' 
    ></i>`
    allBookmark.appendChild(bookmark)

    removeModal()
}

// Removing the bookmark items
allBookmark.addEventListener('click', (e) => {
    if(e.target.classList.contains('removeBookmark')){

    //   removig from array
        bookmarks.map(bookmark => {
        bookmark.name === e.target.previousElementSibling.textContent ? bookmarks.splice(bookmarks.indexOf(bookmark),1) : false
       })

    //    removing from dom
        e.target.parentElement.remove()

        // after removing update local
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
    }
})


// url validation 
function checkUrl(urlValue) {
    let expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;

let regex = new RegExp(expression);

if (urlValue.match(regex)) {
  return true
  }
else{
  return false
  }
}



// Saving to local storage
function saveToLocal(urlName, url) {
    let bookmark = 
        {
            name: urlName,
            url : url
        }

    bookmarks.push(bookmark)

    localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
}

// local storange 
function getFromLocalStorage() {
    if(!(localStorage.getItem('bookmarks') == null)) {
        bookmarks = JSON.parse(localStorage.getItem('bookmarks'))
    }

    // Creating  bookmarks from local items
    if (bookmarks.length > 0){
        bookmarks.map(bookmark => {
            CreatBookmark(bookmark.name, bookmark.url)
        })
    }
}



  // logo link
  const myLogo = document.querySelector('.logo-img')
  myLogo.addEventListener('click',()=> {
      window.open("https://ashish-nagar.netlify.app/", '_blank');
  })
  