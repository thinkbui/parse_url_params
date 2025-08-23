let default_url = "https://example.com/page.php?url=http://www.example.test";

let submit_button = function() {
  let raw_input = document.getElementById("input_box").value;

  if(raw_input) {
    let url = new URL(raw_input);
    let urlParams = url.searchParams;
    let tbody_output_html = buildRow("",url.origin+url.pathname);
    for (let key of urlParams.keys()) {
      tbody_output_html += buildRow(key,urlParams.get(key));
    }
    document.getElementById("tbody_output").innerHTML = tbody_output_html;
  } else {
    console.log("No URL to parse");
  }
}

let reset_button = function() {
  let input_box = document.getElementById("input_box");
  input_box.value = "";
  document.getElementById("tbody_output").innerHTML = "";
  input_box.focus();
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
  return `<tr><td class='cell_key'>${k}</td><td><button onclick='copyClick(this)'>Copy</button></td><td><textarea>${v}</textarea></td></tr>`;
}

document.getElementById("input_box").value = default_url;
submit_button();
