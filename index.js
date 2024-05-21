// an app that lets an author add a message into the input field, then click the "Publish" button, and 
// message is added to the unordered list, and is rendered on the page
// app connects to firebase db
// an input field takes text
// an "Author" field default says "Dima" but onclick changes to "Asya
// once the message is clicked on in the list, a "[x]" message appears with the number of "likes"
// messages are order to the list in reverse order, meaning the latest one is on top

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, get, update } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

// DOM elements
const authorEl = document.getElementById('author-el');
const inputEl = document.getElementById('input-el');
const publishBtn = document.getElementById('publish-btn');
;

// connect firebase db here, db url is https://realtime-database-7e33c-default-rtdb.europe-west1.firebasedatabase.app/

const appSettings = { // firebase app settings
    databaseURL: 'https://realtime-database-7e33c-default-rtdb.europe-west1.firebasedatabase.app/'
}
// Initialize Firebase
const app = initializeApp(appSettings);
const db = getDatabase(app);
const messagesRef = ref(db, 'messages');


onValue(messagesRef, (snapshot) => {
    const messages = snapshot.val();
    const listEl = document.getElementById('all-items');
    listEl.innerHTML = '';

    Object.keys(messages).reverse().forEach((key) => {
        const message = messages[key];
        const messageEl = document.createElement('div');
        messageEl.className = 'item';
        messageEl.dataset.key = key; // Store the Firebase key as a data attribute

        /* if author of the message is Dima, background is red, if Asya it is blue */

        if (message.author === 'Dima') {
            messageEl.style.backgroundColor = '#a1a7ec';
        } else {
            messageEl.style.backgroundColor = '#eea9e5';
        }

        if (message.likes === 0) {
            messageEl.innerHTML = `
                <h3 class="message-author">${message.author}</h3>
                <p class="message-message">${message.message}</p>
            `;
        } else {
            messageEl.innerHTML = `
                <h3 class="message-author">${message.author}</h3>
                <p class="message-message">${message.message}</p>
                <p class="message-likes">${message.likes} 💓</p>
            `;
        }
        listEl.appendChild(messageEl);
    });
});

publishBtn.addEventListener('click', function() {  // add message to db on click
    const messageData = {
        message: inputEl.value,
        author: authorEl.textContent,
        likes: 0
    }
    push(messagesRef, messageData)
    console.log(`${inputEl.value} by ${authorEl.textContent} is added to "messages" db with 0 likes`);
    inputEl.value = '';
})

authorEl.addEventListener('click', function() { // toggles author name on click 

    if (authorEl.textContent === 'Dima') {
        authorEl.textContent = 'Asya';
    } else {
        authorEl.textContent = 'Dima';
    }
})


// on click of specific class "item", a like is added to db and rendered on page

document.addEventListener('click', function(e) {
    let targetElement = e.target; // Start with the target element

    // Traverse up the DOM until you find an element with class 'item' or until you run out of parent elements
    while (targetElement != null && !targetElement.classList.contains('item')) {
        targetElement = targetElement.parentElement;
    }

    // If an 'item' element was found, handle the click
    if (targetElement && targetElement.classList.contains('item')) {
        const key = targetElement.dataset.key; // Retrieve the key from the data attribute
        const messageRef = ref(db, 'messages/' + key);

        get(messageRef).then((snapshot) => {
            if (snapshot.exists()) {
                const message = snapshot.val();
                const updatedLikes = (message.likes || 0) + 1; // Increment likes, defaulting to 0 if undefined

                update(messageRef, { likes: updatedLikes }); // Update the likes in Firebase
                console.log(`${message.message} by ${message.author} has ${updatedLikes} likes`);
            }
        });
    }
});

