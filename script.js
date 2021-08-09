let myLeads = [];
const inputEl = document.querySelector("#input-el");
const UlEl = document.querySelector("#ul-el");

const deleteButton = document.querySelector("#delete-btn");
const saveButton = document.querySelector("#input-btn");
const tabButton = document.querySelector("#tab-btn");

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
    chrome.tabs.query({active: true, lastFocusedWindow: true}, function(tabs) {
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
        listItems += `<li><a target='_blank' href=http://${myLeads[i]}>${myLeads[i]}</a></li>`;

        // const li = document.createElement('li');
        // li.textContent = myLeads[i];
        // UlEl.append(li);
    }

    UlEl.innerHTML = listItems;
}