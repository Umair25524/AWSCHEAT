// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBgVi6ql8M_OxugSEhx2B4Uw3sdYmxjx1s",
    authDomain: "aws-cheat.firebaseapp.com",
    projectId: "aws-cheat",
    storageBucket: "aws-cheat.appspot.com",
    messagingSenderId: "732721393562",
    appId: "1:732721393562:web:92567006b47ba91cb0d423",
    measurementId: "G-2WF6E9YN4Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Initialize Firestore

// Fetch box tiles and content from Firestore
async function fetchBoxes() {
    const boxContainer = document.getElementById('boxContainer');
    try {
        // Get documents from Firestore
        const snapshot = await getDocs(collection(db, "boxes")); // Ensure 'await' is used here
        
        snapshot.forEach(doc => {
            const data = doc.data();
            const boxElement = createBoxElement(data.title, data.content);
            boxContainer.appendChild(boxElement);
        });
    } catch (error) {
        console.error("Error fetching boxes:", error);
    }
}

function createBoxElement(title, content) {
    const box = document.createElement('div');
    box.classList.add('box');
    
    const titleElement = document.createElement('div');
    titleElement.classList.add('title');
    titleElement.textContent = title;

    const contentElement = document.createElement('div');
    contentElement.classList.add('content');
    contentElement.textContent = content;

    box.appendChild(titleElement);
    box.appendChild(contentElement);
    box.addEventListener('click', () => {
        box.classList.toggle('open');
    });

    return box;
}

// Call fetchBoxes to load data
fetchBoxes(); // Ensure that this is called after the function is defined
