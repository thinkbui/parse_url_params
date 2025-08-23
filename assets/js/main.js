const table_body_output_id = "tbody_output";
const table_body_output_elem = document.getElementById(table_body_output_id);
const input_box_id = "input_box";
const input_box_elem = document.getElementById(input_box_id);

const cell_key_class = "cell_key";
const cell_copy_class = "cell_copy";
const cell_value_class = "cell_value";

const cell_copy_btn_text = "Copy";

const default_url = "https://example.com/page.php?url=http://www.example.test";

let submitButton = function() {
  let raw_input = input_box_elem.value;

  if(raw_input) {
    clearTableOutput();
    let url = new URL(raw_input);
    let urlParams = url.searchParams;

    table_body_output_elem.append(buildRow("", url.origin + url.pathname));

    for (let key of urlParams.keys()) {
      table_body_output_elem.append(buildRow(key, urlParams.get(key)));
    }
  } else {
    console.log("No URL to parse");
  }
}

let resetButton = function() {
  input_box_elem.value = "";
  clearTableOutput();
  input_box_elem.focus();
}

let clearTableOutput = function() {
  table_body_output_elem.innerHTML = "";
}

let copyClick = function(elem) {
  let copy_textarea = elem.parentElement.nextSibling.getElementsByTagName("textarea")[0];
  if (copy_textarea.value) {
    if(navigator.clipboard) {
      navigator.clipboard.writeText(copy_textarea.value)
        .then(function() {console.log("Successfully copied to clipboard.")})
        .catch(function() {console.log("Could not copy.")});
    } else {
      download_list.select();
      document.execCommand("copy");
    }
  } else {
    console.log("Nothing to copy.");
  }
}

let buildRow = function(k,v) {
  let tr_elem = document.createElement("tr");
  tr_elem.append(buildCellKeyTd(k));
  tr_elem.append(buildCellCopyTd());
  tr_elem.append(buildCellValueTd(v));
  return tr_elem;
}

let buildCellKeyTd = function(k) {
  let td_elem = document.createElement("td");
  td_elem.classList.add(cell_key_class);
  td_elem.innerHTML = k;
  return td_elem;
}

let buildCellCopyTd = function() {
  let td_elem = document.createElement("td");
  td_elem.classList.add(cell_copy_class);
  td_elem.append(buildCellCopyBtn());
  return td_elem;
}

let buildCellCopyBtn = function() {
  let btn_elem = document.createElement("button");
  btn_elem.innerHTML = cell_copy_btn_text;
  btn_elem.onclick = function(event){copyClick(this)};
  return btn_elem;
}

let buildCellValueTd = function(v) {
  let td_elem = document.createElement("td");
  td_elem.classList.add(cell_value_class);
  td_elem.append(buildCellValueTextarea(v));
  return td_elem;
}

let buildCellValueTextarea = function(v) {
  let textarea_elem = document.createElement("textarea");
  textarea_elem.value = v;
  return textarea_elem;
}

input_box_elem.value = default_url;
submitButton();
