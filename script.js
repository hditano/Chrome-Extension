let myLeads = [];
const inputEl = document.querySelector("#input-el");
const UlEl = document.querySelector("#ul-el");

let saveButton = document.querySelector("#input-btn");

// Parses values from local Storage (string) and sets its value to leadsFromLocalStorage as an array
let leadsFromLocalStorage = JSON.parse(localStorage.getItem('myleads'));

// Checks for Local Storage values, if so, store it in myLeads Array
if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage;
    leadItems();
}

saveButton.addEventListener("click", function () {
  myLeads.push(inputEl.value);
  inputEl.value = "";
  localStorage.setItem('myleads', JSON.stringify(myLeads));
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
