// an app that lets an author add a message into the input field, then click the "Publish" button, and 
// message is added to the unordered list, and is rendered on the page
// app connects to firebase db
// an input field takes text
// an "Author" field default says "Dima" but onclick changes to "Asya
// once the message is clicked on in the list, a "[x]" message appears with the number of "likes"
// messages are order to the list in reverse order, meaning the latest one is on top

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

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











// add message to db on click

publishBtn.addEventListener('click', function() {
    push(messagesRef, inputEl.value)
    console.log(`${inputEl.value } is added to "messages" db`)
})












authorEl.addEventListener('click', function() {

    if (authorEl.textContent === 'Dima') {
        authorEl.textContent = 'Asya';
    } else {
        authorEl.textContent = 'Dima';
    }

    // authorEl.textContent = 'Asya';
})