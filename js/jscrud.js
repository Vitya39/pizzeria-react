var selectedIndex = null;
var array1 = [{"name":"Áfonyás","kategoria":"király","vegetarianus":"0"},{"name":"Kétarcú","kategoria":"lovag","vegetarianus":"0"},{"name":"Barbecue chicken","kategoria":"lovag","vegetarianus":"0"},{"name":"Betyáros","kategoria":"király","vegetarianus":"0"},{"name":"Cáriba","kategoria":"apród","vegetarianus":"0"},{"name":"Uniós támogatás","kategoria":"király","vegetarianus":"0"},{"name":"Csabesz","kategoria":"király","vegetarianus":"0"},{"name":"Francia","kategoria":"lovag","vegetarianus":"1"},{"name":"Belga","kategoria":"főispán","vegetarianus":"0"},{"name":"Erős János","kategoria":"főispán","vegetarianus":"0"},{"name":"Excellent","kategoria":"király","vegetarianus":"0"},{"name":"Főnök kedvence","kategoria":"lovag","vegetarianus":"0"}];

printArray();
function printArray(){
    var table = document.getElementById("pizzaList").getElementsByTagName('tbody')[0];
    table.innerHTML="";
    var newRow;
    for (i = 0; i < array1.length; i++) {
        newRow = table.insertRow(table.length);
        cell1 = newRow.insertCell(0);
        cell1.innerHTML = array1[i].name;
        cell2 = newRow.insertCell(1);
        cell2.innerHTML = array1[i].kategoria;
        cell3 = newRow.insertCell(2);
        cell3.innerHTML = array1[i].vegetarianus;
        cell4 = newRow.insertCell(3);
        switch (array1[i].kategoria) {
            case "apród":
            cell4.innerHTML = 850 + " Ft";
            cell4 = newRow.insertCell(4);
            break;

            case "főispán":
            cell4.innerHTML = 950 + " Ft";
            cell4 = newRow.insertCell(4);
            break;

            case "király":
            cell4.innerHTML = 1250 + " Ft";
            cell4 = newRow.insertCell(4);
            break;

            case "lovag":
            cell4.innerHTML = 1150 + " Ft";
            cell4 = newRow.insertCell(4);
            break;
        }
        cell4.innerHTML = '<a onClick="onEdit('+i+')">Szerkeszt</a>' + '<a onClick="onDelete('+i+')">Törlés</a>';
    }
}
function onFormSubmit() {
    if (validate()) {
        var formData = readFormData();
        if (selectedIndex==null)
            insertNewRecord(formData);
        else
            updateRecord(formData);
        resetForm();
    }
}
function readFormData() {
    var formData = {};
    formData["name"] = document.getElementById("name").value;
    formData["kategoria"] = document.getElementById("kategoria").value;
    formData["vegetarianus"] = document.getElementById("vegetarianus").checked ? "1" : "0";
    return formData;
}

function insertNewRecord(data) {
    array1.push({"name":data.name,"kategoria":data.kategoria,"vegetarianus":data.vegetarianus});
    printArray();
}

function resetForm() {
    document.getElementById("name").value = "";
    document.getElementById("kategoria").value = "";
    document.getElementById("vegetarianus").value = "";
    selectedIndex=null;
}
function onEdit(index) {
    document.getElementById("name").value = array1[index].name;
    document.getElementById("kategoria").value = array1[index].kategoria;
    document.getElementById("vegetarianus").value = array1[index].vegetarianus;
    selectedIndex=index;
}
function updateRecord(formData) {
    array1[selectedIndex].name=formData.name;
    array1[selectedIndex].kategoria=formData.kategoria;
    array1[selectedIndex].vegetarianus=formData.vegetarianus;
    printArray();
}
function onDelete(index) {
    if (confirm('Biztosan törölni szeretnéd?')) {
        array1.splice(index, 1);
        resetForm();
        printArray();
    }
}
function validate() {
    isValid = true;
    if (document.getElementById("name").value == "") {
        isValid = false;
        document.getElementById("fullNameValidationError").classList.remove("hide");
    } else {
        isValid = true;
        if (!document.getElementById("fullNameValidationError").classList.contains("hide"))
            document.getElementById("fullNameValidationError").classList.add("hide");
    }
    return isValid;
}