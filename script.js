let myLeads = ["Hola", "Hernancito"];
const inputEl = document.querySelector("#input-el");
const UlEl = document.querySelector("#ul-el");

let saveButton = document.querySelector("#input-btn");

saveButton.addEventListener("click", function () {
  myLeads.push(inputEl.value);
  inputEl.value = "";
  leadItems();
});

function leadItems() {
  let listItems = "";
  for (let i = 0; i < myLeads.length; i++) {
    listItems += "<li>" + myLeads[i] + "</li>";
    // const li = document.createElement('li');
    // li.textContent = myLeads[i];
    // UlEl.append(li);
  }
  UlEl.innerHTML = listItems;
}

console.log(myLeads);
