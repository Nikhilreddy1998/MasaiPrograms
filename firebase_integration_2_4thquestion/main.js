
const firebaseConfig = {
    apiKey: "AIzaSyCfvkSpyl1MJD8jlgf6ibBpntABs-AegAQ",
    authDomain: "fire-base-integration-2-4thq.firebaseapp.com",
    databaseURL: "https://fire-base-integration-2-4thq-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "fire-base-integration-2-4thq",
    storageBucket: "fire-base-integration-2-4thq.firebasestorage.app",
    messagingSenderId: "599557074908",
    appId: "1:599557074908:web:b6ec0e65860c5b009b2919",
    measurementId: "G-QL9P0ZFM11"
  };
firebase.initializeApp(firebaseConfig);
const db = firebase.database();


function getElement(id) {
    return document.getElementById(id);
}

function clearElementContent(id) {
    getElement(id).innerHTML = '';
}


async function getBooks() {
    const snapshot = await db.ref("books").once("value");
    const data = snapshot.val();
    return data ? Object.entries(data).map(([key, value]) => ({ ...value, id: key })) : [];
}

async function getMembers() {
    const snapshot = await db.ref("members").once("value");
    const data = snapshot.val();
    return data ? Object.entries(data).map(([key, value]) => ({ ...value, id: key })) : [];
}


async function createBook(book) {
    try {
        const newBookRef = db.ref("books").push();
        await newBookRef.set(book);
        return true; 
    } catch (error) {
        console.error("Error creating book:", error);
        return false; 
    }
}

async function updateBook(id, updates) {
    try {
        await db.ref(`books/${id}`).update(updates);
        return true;
    } catch (error) {
        console.error("Error updating book:", error);
        return false;
    }
}

async function deleteBook(id) {
    try {
        await db.ref(`books/${id}`).remove();
        return true;
    } catch (error) {
        console.error("Error deleting book:", error);
        return false;
    }
}

async function createMember(member) {
    try {
        const newMemberRef = db.ref("members").push();
        await newMemberRef.set(member);
        return true;
    } catch (error) {
        console.error("Error creating member:", error);
        return false;
    }
}

async function updateMember(id, updates) {
    try {
        await db.ref(`members/${id}`).update(updates);
        return true;
    } catch (error) {
        console.error("Error updating member:", error);
        return false;
    }
}

async function deleteMember(id) {
    try {
        await db.ref(`members/${id}`).remove();
        return true;
    } catch (error) {
        console.error("Error deleting member:", error);
        return false;
    }
}


function filterBooks(books, filters) {
    return books.filter(book => {
        if (filters.genre && book.genre !== filters.genre) return false;
        if (filters.author && !book.author.toLowerCase().includes(filters.author.toLowerCase())) return false;
        if (filters.available !== undefined && book.available !== filters.available) return false;
        return true;
    });
}

function filterMembers(members, filters) {
    return members.filter(member => {
        if (filters.active !== undefined && member.active !== filters.active) return false;
        if (filters.membershipDate && new Date(member.membershipDate) < new Date(filters.membershipDate)) return false;
        return true;
    });
}


function sortBooks(books, sortBy, order = 'asc') {
    return [...books].sort((a, b) => {
        let comparison = 0;
        if (a[sortBy] > b[sortBy]) comparison = 1;
        if (a[sortBy] < b[sortBy]) comparison = -1;
        return order === 'desc' ? comparison * -1 : comparison;
    });
}

function sortMembers(members, sortBy, order = 'asc') {
    return [...members].sort((a, b) => {
        let comparison = 0;
        if (a[sortBy] > b[sortBy]) comparison = 1;
        if (a[sortBy] < b[sortBy]) comparison = -1;
        return order === 'desc' ? comparison * -1 : comparison;
    });
}


function paginate(array, pageSize, pageNumber) {
    const startIndex = (pageNumber - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return array.slice(startIndex, endIndex);
}

const booksPerPage = 5;
let currentBookPage = 1;

const membersPerPage = 5;
let currentMemberPage = 1;


function saveState(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

function loadState(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
}


function displayBooks(books) {
    const bookTableBody = getElement('book-list').querySelector('tbody');
    clearElementContent(bookTableBody);

    books.forEach(book => {
        const row = bookTableBody.insertRow();
        row.insertCell().textContent = book.title;
        row.insertCell().textContent = book.author;
        row.insertCell().textContent = book.genre;
        row.insertCell().textContent = book.publishedYear;
        row.insertCell().textContent = book.available ? 'Yes' : 'No';


        const actionsCell = row.insertCell();
        const updateButton = document.createElement('button');
        updateButton.textContent = 'Update';
        updateButton.addEventListener('click', () => openUpdateBookModal(book)); 
        actionsCell.appendChild(updateButton);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => deleteBook(book.id));
        actionsCell.appendChild(deleteButton);
    });
}

function displayMembers(members) {
    const memberTableBody = getElement('member-list').querySelector('tbody');
    clearElementContent(memberTableBody);

    members.forEach(member => {
        const row = memberTableBody.insertRow();
        row.insertCell().textContent = member.name;
        row.insertCell().textContent = member.membershipDate;
        row.insertCell().textContent = member.active ? 'Yes' : 'No';

        const actionsCell = row.insertCell();
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => deleteMember(member.id));
        actionsCell.appendChild(deleteButton);
    });
}

function updatePaginationDisplay(currentPageElement, currentPage) {
    currentPageElement.textContent = currentPage;
}


function setupBookEventListeners() {
    const genreFilter = getElement('genre-filter');
    const authorFilter = getElement('author-filter');
    const availabilityFilter = getElement('availability-filter');
    const sortBy = getElement('sort-by');
    const sortOrder = getElement('sort-order');
    const prevPageButton = getElement('prev-book-page');
}