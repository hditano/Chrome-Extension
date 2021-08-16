let myLeads = [];
const inputEl = document.querySelector("#input-el");
const UlEl = document.querySelector("#ul-el");

const deleteButton = document.querySelector("#delete-btn");
const saveButton = document.querySelector("#input-btn");
const tabButton = document.querySelector("#tab-btn");
const deleteIcon = document.querySelectorAll("#delete-icon");

// Modal Logic
const openModal = document.querySelector('#edit-btn');
const closeModal = document.querySelector('#modal-btn');
const overlay = document.querySelector('.overlay');

openModal.addEventListener('click', function() {
    overlay.style.display = 'block';
})

closeModal.addEventListener('click', function() {
    overlay.style.display = 'none';
})

// Parses values from local Storage (string) and sets its value to leadsFromLocalStorage as an array
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myleads"));

// Checks for Local Storage values, if so, store it in myLeads Array
if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage;
    leadItems();
}


saveButton.addEventListener("click", function () {
    myLeads.push(inputEl.value);
    inputEl.value = "";
    localStorage.setItem("myleads", JSON.stringify(myLeads));
    leadItems();
});


tabButton.addEventListener("click", function () {
    chrome.tabs.query({
        active: true,
        lastFocusedWindow: true
    }, function (tabs) {
        myLeads.push(tabs[0].url);
        inputEl.value = "";
        localStorage.setItem('myleads', JSON.stringify(myLeads));
        leadItems();
    })
});

// Deletes local Storage // deletes items in array myLeads // clears DOM calling out to render leadItems()
deleteButton.addEventListener("dblclick", function () {
    localStorage.clear();
    myLeads = [];
    leadItems();
});

// Looping through myLeads array

function leadItems() {
    let listItems = "";

    for (let i = 0; i < myLeads.length; i++) {
        listItems += `<li data-id="${i}"><a target='_blank' href=http://${myLeads[i]}>${myLeads[i]}</a> <img id="delete-icon" alt="" src="delete-icon.png"> </li>`;
        // const li = document.createElement('li');
        // li.textContent = myLeads[i];
        // UlEl.append(li);
    }

    UlEl.innerHTML = listItems;
}


// Event Listener that checks if certain id exists...if so, if statement comes true and works. (Event Delegation)
// Data-ID variable gets the data-id associate to his <li> parent.
// Parses myleads localStorage, deletes myLeads specific value and Re-set it in the Local Storage, calls render.
document.body.addEventListener('click', function (e) {
    if (e.target.id === 'delete-icon') {
        let dataID = e.target.parentNode.getAttribute('data-id');
        let items = JSON.parse(localStorage.getItem('myleads'));
        myLeads.splice(dataID, 1);
        localStorage.setItem('myleads', JSON.stringify(myLeads));
        leadItems();
    }
})