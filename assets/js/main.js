const TABLE_BODY_OUTPUT_ID = "tbody_output";
const TABLE_BODY_OUTPUT_ELEM = document.getElementById(TABLE_BODY_OUTPUT_ID);
const INPUT_BOX_ID = "input_box";
const INPUT_BOX_ELEM = document.getElementById(INPUT_BOX_ID);

const CELL_KEY_CLASS = "cell_key";
const CELL_COPY_CLASS = "cell_copy";
const CELL_VALUE_CLASS = "cell_value";

const CELL_COPY_BTN_TEXT = "Copy";

const DEFAULT_URL = "https://example.com/page.php?url=http://www.example.test";

let submitButton = function() {
  let raw_input = INPUT_BOX_ELEM.value;

  if(raw_input) {
    clearTableOutput();
    let url = new URL(raw_input);
    let urlParams = url.searchParams;

    TABLE_BODY_OUTPUT_ELEM.append(buildRow("", url.origin + url.pathname));

    for (let key of urlParams.keys()) {
      TABLE_BODY_OUTPUT_ELEM.append(buildRow(key, urlParams.get(key)));
    }
  } else {
    console.log("No URL to parse");
  }
}

let resetButton = function() {
  INPUT_BOX_ELEM.value = "";
  clearTableOutput();
  INPUT_BOX_ELEM.focus();
}

let clearTableOutput = function() {
  TABLE_BODY_OUTPUT_ELEM.innerHTML = "";
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
  td_elem.classList.add(CELL_KEY_CLASS);
  td_elem.innerHTML = k;
  return td_elem;
}

let buildCellCopyTd = function() {
  let td_elem = document.createElement("td");
  td_elem.classList.add(CELL_COPY_CLASS);
  td_elem.append(buildCellCopyBtn());
  return td_elem;
}

let buildCellCopyBtn = function() {
  let btn_elem = document.createElement("button");
  btn_elem.innerHTML = CELL_COPY_BTN_TEXT;
  btn_elem.onclick = function(event){copyClick(this)};
  return btn_elem;
}

let buildCellValueTd = function(v) {
  let td_elem = document.createElement("td");
  td_elem.classList.add(CELL_VALUE_CLASS);
  td_elem.append(buildCellValueTextarea(v));
  return td_elem;
}

let buildCellValueTextarea = function(v) {
  let textarea_elem = document.createElement("textarea");
  textarea_elem.value = v;
  return textarea_elem;
}

INPUT_BOX_ELEM.value = DEFAULT_URL;
submitButton();
