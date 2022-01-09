// Create a "close" button and append it to each item in the table
var myNodelist = document.getElementsByTagName("TR");
var i;
for (i = 1; i < myNodelist.length; i++) {
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  span.onclick = function() {
    var row = this.parentElement;
    row.parentNode.removeChild(row);
  }
  myNodelist[i].appendChild(span);
}

// Create a new item in the table when clicking on the "Add" button
function newElement() {
  // create html node with product name
  var newProductName = document.getElementById("newProductName").value;
  var td1 = document.createElement("td");
  td1.innerHTML = newProductName
  td1.setAttribute("contenteditable", "true");

  // create html node with product quantity
  var newProductQuantity = document.getElementById("newProductQuantity").value;
  var td2 = document.createElement("td");
  var form = document.createElement("form");
  var input = document.createElement("input");
  input.setAttribute("type", "number");
  input.setAttribute("value", Number(newProductQuantity));
  form.appendChild(input)
  td2.appendChild(form)

  var tr = document.createElement("tr")
  tr.appendChild(td1)
  tr.appendChild(td2)

  var quantityParsed = Number(newProductQuantity)
  if (newProductName === '' || !Number.isInteger(quantityParsed) || isNaN(quantityParsed) || quantityParsed < 0) {
    alert("Invalid name or quantity");
  } else {
    document.getElementById("table").appendChild(tr);
  }

  // reset input fields
  document.getElementById("newProductQuantity").value = "";
  document.getElementById("newProductName").value = "";

  // add delete button
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  span.onclick = function() {
    var row = this.parentElement;
    row.parentNode.removeChild(row);
  }
  tr.appendChild(span);
}

function download_table_as_csv(table_id, separator = ',') {
    var rows = document.querySelectorAll('table#' + table_id + ' tr');
    var csv = [];

    // parse table header
    var header = []
    cols = rows[0].querySelectorAll('td, th');
    for (var j = 0; j < cols.length; j++) {
        var columnName = cols[j].innerText
        header.push(columnName);
    }
    csv.push(header.join(separator));

    // parse table rows
    for (var i = 1; i < rows.length; i++) {
        var row = [], cols = rows[i].querySelectorAll('td');

        // retrieve product name
        var productName = cols[0].innerText
        row.push(productName);

        // retrieve quantity available
        var quantityAvailable = cols[1].querySelectorAll('input')[0].value;
        row.push(quantityAvailable);

        csv.push(row.join(separator));
    }

    var csv_string = csv.join('\n');
    var filename = 'Inventory.csv';
    var link = document.createElement('a');
    link.style.display = 'none';
    link.setAttribute('target', '_blank');
    link.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv_string));
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
