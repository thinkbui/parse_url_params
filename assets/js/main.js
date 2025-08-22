var submit_button = function() {
  var raw_input = document.getElementById("input_box").value;

  if(raw_input) {
    var url = new URL(raw_input);
    var urlParams = new URLSearchParams(new URL(raw_input).search);
    var myParam = urlParams.get('url');
    var tbody_output_html = buildRow("",url.origin+url.pathname);
    for (var key of urlParams.keys()) {
      tbody_output_html += buildRow(key,urlParams.get(key));
    }
    document.getElementById("tbody_output").innerHTML = tbody_output_html;
  } else {
    console.log("No URL to parse");
  }
}

var reset_button = function() {
  var input_box = document.getElementById("input_box");
  input_box.value = "";
  document.getElementById("tbody_output").innerHTML = "";
  input_box.focus();
}

var copyClick = function(elem) {
  console.log(elem.parentElement.nextSibling);
  var copy_textarea = elem.parentElement.nextSibling.getElementsByTagName("textarea")[0];
  console.log(copy_textarea.value);
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

var buildRow = function(k,v) {
  return `<tr><td class='cell_key'>${k}</td><td><button onclick='copyClick(this)'>Copy</button></td><td><textarea>${v}</textarea></td></tr>`;
}

document.getElementById("input_box").value = default_url;
submit_button();
