let selectedRow = null;

window.addEventListener('load', function() {
    let storedData = JSON.parse(localStorage.getItem('formData'));
    if (storedData) {
        populateTable(storedData);
    }
});

function onFormSubmit(e) {
    event.preventDefault();
    let formData = readFormData();
    
    if (selectedRow === null) {
        insertNewRecord(formData);
    }
    else{
        updateRecord(formData);//updateRecord() is take table old details to and give updated value of table.
    }

    resetForm();
    saveDataToLocalStorage();
}

//retrive the data
function readFormData() {
    let formData = {};
    formData["name"] = document.getElementById("name").value;
    formData["email"] = document.getElementById("email").value;
    formData["phone_no"] = document.getElementById("phone_no").value;
    formData["gender"] = document.querySelector('input[name="gender"]:checked').value;
    formData["age"] = document.getElementById("age").value;
    formData["file"] = document.getElementById("file").value;
    return formData;
}


//insert the data
function insertNewRecord(data) {
    let table = document.getElementById('storeList').getElementsByTagName('tbody')[0];
    let newRow = table.insertRow(table.length);

    let cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.name;

    let cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.email;

    let cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.phone_no;

    let cell4 = newRow.insertCell(3);
    cell4.innerHTML = data.gender;

    let cell5 = newRow.insertCell(4);
    cell5.innerHTML = data.age;

    let cell6 = newRow.insertCell(5);
    cell6.innerHTML = data.file;

    let cell7 = newRow.insertCell(6)
    cell7.innerHTML = `<button onClick = "onEdit(this)">Edit</button>
                        <button onClick = "onDelete(this)">Delete</button>`
}

//edit data
function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("name").value = selectedRow.cells[0].innerHTML;
    document.getElementById("email").value = selectedRow.cells[1].innerHTML;
    document.getElementById("phone_no").value = selectedRow.cells[2].innerHTML;
    document.getElementById("gender").value = selectedRow.cells[3].innerHTML;
    document.getElementById("age").value = selectedRow.cells[4].innerHTML;
    document.getElementById("file").value = selectedRow.cells[5].innerHTML;
}



function updateRecord(formData) {
    selectedRow.cells[0].innerHTML = formData.name;
    selectedRow.cells[1].innerHTML = formData.email;
    selectedRow.cells[2].innerHTML = formData.phone_no;
    selectedRow.cells[3].innerHTML = formData.gender;
    selectedRow.cells[4].innerHTML = formData.age;
    selectedRow.cells[5].innerHTML = formData.file;
}

function onDelete(td) {
    row = td.parentElement.parentElement;
    document.getElementById("storeList").deleteRow(row.rowIndex);
    resetForm();
}

function resetForm(){
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("phone_no").value = "";
    document.getElementById("gender").value = "";
    document.getElementById("age").value = "";
    document.getElementById("file").value = "";
}

function saveDataToLocalStorage() {
    let table = document.getElementById('storeList').getElementsByTagName('tbody')[0];
    let data = [];

    for (let i = 0; i < table.rows.length; i++) {
        let rowData = {
            name: table.rows[i].cells[0].innerHTML,
            email: table.rows[i].cells[1].innerHTML,
            phone_no: table.rows[i].cells[2].innerHTML,
            gender: table.rows[i].cells[3].innerHTML,
            age: table.rows[i].cells[4].innerHTML,
            file: table.rows[i].cells[5].innerHTML
        };
        data.push(rowData);
    }

    localStorage.setItem('formData', JSON.stringify(data));
}

function populateTable(data) {
    let table = document.getElementById('storeList').getElementsByTagName('tbody')[0];
    for (let i = 0; i < data.length; i++) {
        insertNewRecord(data[i]);
    }
}
