let myLeads = [];
const inputEl = document.querySelector("#input-el");
const UlEl = document.querySelector("#ul-el");

const deleteButton = document.querySelector("#delete-btn");
const saveButton = document.querySelector("#input-btn");
const tabButton = document.querySelector("#tab-btn");
const deleteIcon = document.querySelectorAll("#delete-icon");

// Modal UL List
const UlModal = document.querySelector('#ul-modal');


/*********************************************************************************/
// Search Module

const searchButton = document.querySelector('search-btn');

inputEl.addEventListener('keyup', function (e) {
    let searchQuery = e.target.value.toLowerCase();
    let allList = document.getElementsByClassName('bookmarks')

    for (let i = 0; i < allList.length; i++) {
        const currentName = allList[i].textContent.toLowerCase();

        if (currentName.includes(searchQuery)) {
            allList[i].style.display = 'block';
        } else {
            allList[i].style.display = 'none';
        }
    }
})


// Modal Edit Configuration

const editButton = document.querySelector('#edit-btn');
const overlayEdit = document.querySelector('.overlay-edit');
const closeEdit = document.querySelector('.close-btn');


editButton.addEventListener('click', function () {
    let listItems = '';
    overlayEdit.style.display = 'block';
    for (let i = 0; i < myLeads.length; i++) {
        listItems += myLeads[i];
    }
    listItems = modalRender(UlModal);
})


closeEdit.addEventListener('click', function () {
    const deleteLi = document.getElementsByClassName('bookmarks');
    overlayEdit.style.display = 'none';
    for (let i = deleteLi.length - 1; i >= 0; i--) {
        deleteLi[i].remove();
    }
    leadItems(UlEl);

})




function modalRender(ulRender) {

    for (let i = 0; i < myLeads.length; i++) {

        const li = document.createElement('li');
        li.classList = 'bookmarks';
        li.dataset = `${i}`;
        const a = document.createElement('a');
        a.setAttribute('target', '_blank');
        a.setAttribute('href', `http://${myLeads[i]}`);
        a.setAttribute('class', 'edit-label');
        a.textContent = `${myLeads[i]}`;
        li.appendChild(a);
        UlModal.appendChild(li);
    }
}

/*********************************************************************************/

// Parses values from local Storage (string) and sets its value to leadsFromLocalStorage as an array
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myleads"));

// Checks for Local Storage values, if so, store it in myLeads Array
if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage;
    leadItems(UlEl);
}


saveButton.addEventListener("click", function () {
    myLeads.push(inputEl.value);
    inputEl.value = "";
    localStorage.setItem("myleads", JSON.stringify(myLeads));
    leadItems(UlEl);
});


tabButton.addEventListener("click", function () {
    chrome.tabs.query({
        active: true,
        lastFocusedWindow: true
    }, function (tabs) {
        myLeads.push(tabs[0].url);
        inputEl.value = "";
        localStorage.setItem('myleads', JSON.stringify(myLeads));
        leadItems(UlEl);
    })
});

// Deletes local Storage // deletes items in array myLeads // clears DOM calling out to render leadItems()
deleteButton.addEventListener("dblclick", function () {
    localStorage.clear();
    myLeads = [];
    leadItems(UlEl);
});

// Looping through myLeads array

function leadItems(ulRender) {
    let listItems = "";

    for (let i = 0; i < myLeads.length; i++) {
        listItems += `<li class='bookmarks' data-id="${i}"><a target='_blank' href=http://${myLeads[i]}>${myLeads[i]}</a> <img id="delete-icon" alt="" src="delete-icon.png"> </li>`;
        // const li = document.createElement('li');
        // li.textContent = myLeads[i];
        // UlEl.append(li);
    }

    ulRender.innerHTML = listItems;
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
        leadItems(UlEl);
    }
})