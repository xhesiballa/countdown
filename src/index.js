
import "materialize-css/dist/css/materialize.min.css";
import "materialize-css/dist/js/materialize.min.js";

import Clock from "./Clock.js";
import DatePicker from "./DatePicker.js";

// setInterval(() => {
//         navigator.vibrate(5000);
//         console.log(vibrate);
//     }, 1000);

function createTimer(){
  let url = new URL(window.location);
  let title = document.getElementById("title");
  url.searchParams.append("title", title.value);
  let datePicker = document.getElementById("deadline");
  let deadline = Date.parse(datePicker.value);
  console.log(deadline);
  url.searchParams.append("deadline", deadline.valueOf())
  window.location = url;
}

let url = new URL(document.location);
let params = url.searchParams;
let deadline = params.get("deadline");
console.log("deadline: " + deadline);
let title = params.get("title");
if(deadline){
  let header = document.createElement('h1');
  header.innerHTML = title;
  document.body.append(header);

  let date = new Date(new Number(deadline));
  console.log(date);
  let c = new Clock(date, function(){ alert('countdown complete') });
  document.body.appendChild(c.el);
  {
    let div = document.createElement("div");
    let link = document.createElement("input");
    link.value = url;
    link.disabled = true;
    div.appendChild(link);
    let button = document.createElement("button");
    button.innerHTML = 'Copy Link';
    button.onclick = () => {
      navigator.permissions.query({name: "clipboard-write"}).then(result => {
        if (result.state == "granted" || result.state == "prompt") {
          navigator.clipboard.writeText(url)
          .then(() => { /* clipboard successfully set */  },  () => { /* clipboard write failed */});}
      });
      };
    div.appendChild(button);
    document.body.appendChild(div);
  }
}else{
  let datepicker = new DatePicker((date) => {
    document.getElementById("deadline").value = date;
  });
   let el = document.createElement('div');
   el.innerHTML = "<label>Title:</label><input type='text' id='title'></br>" + 
    "<label>Deadline:</label><input type='text' id='deadline'></br>" + 
    "<a class='waves-effect waves-light btn' id='createButton'>Create</a>";
   document.body.appendChild(el);
   document.getElementById("deadline").onfocus = () => {window.navigator.vibrate(50000)};
   document.getElementById("createButton").onclick = () => {console.log('clicked');createTimer();};

}

