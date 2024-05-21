// an app that lets an author add a message into the input field, then click the "Publish" button, and 
// message is added to the unordered list, and is rendered on the page
// app connects to firebase db
// an input field takes text
// an "Author" field default says "Dima" but onclick changes to "Asya
// once the message is clicked on in the list, a "[x]" message appears with the number of "likes"
// messages are order to the list in reverse order, meaning the latest one is on top

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const authorEl = document.getElementById('author-el');
const inputEl = document.getElementById('input-el');
const publishBtn = document.getElementById('publish-btn');
;

// connect firebase db here, db url is https://realtime-database-7e33c-default-rtdb.europe-west1.firebasedatabase.app/

const appSettings = {
    databaseURL: 'https://realtime-database-7e33c-default-rtdb.europe-west1.firebasedatabase.app/'
}

const app = initializeApp(appSettings);
const db = getDatabase(app);
const messagesRef = ref(db, 'messages');


// onValue snapshot of messagesRef is taken, and the messages are rendered on the page
onValue(messagesRef, (snapshot) => {
    const messages = Object.values(snapshot.val());
    const listEl = document.getElementById('all-items');
    listEl.innerHTML = '';

    messages.reverse().forEach((message) => {        
        const messageEl = document.createElement('div');
        messageEl.className = 'item'
        messageEl.innerHTML = 
            `
                <h3>Dima</h3>
                <p>${message}</p>
                <p>3 💓</p>
                `;
        listEl.appendChild(messageEl);
    })
})


publishBtn.addEventListener('click', function() { // add message to db on click
    // to messageRef add inputEl.value but also who currently is the author

    const messageData = {
        message: inputEl.value,
        author: authorEl.textContent
    }


    push(messagesRef, messageData)
    console.log(`${inputEl.value} by ${authorEl.textContent} is added to "messages" db`);
    inputEl.value = '';
})


authorEl.addEventListener('click', function() { // toggles author name on click 

    if (authorEl.textContent === 'Dima') {
        authorEl.textContent = 'Asya';
    } else {
        authorEl.textContent = 'Dima';
    }
})