
import "materialize-css/dist/css/materialize.min.css";
import "materialize-css/dist/js/materialize.min.js";

import Clock from "./Clock.js";

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

function dateTimePicker(){
  var d_elems = document.createElement("input");
    d_elems.hidden = true;
    d_elems.type = "text";
    d_elems.classList.add("datepicker");
  document.body.appendChild(d_elems);

    let t_elems = document.createElement("input");
    t_elems.hidden = true;
    t_elems.type = "text";
    t_elems.classList.add("timepicker");
    document.body.appendChild(t_elems);

   document.addEventListener('DOMContentLoaded', () => {
      d_elems = document.querySelectorAll('.datepicker');

      
      d_instance = M.Datepicker.init(d_elems, 
        { autoClose: true, 
          format: "yyyy-mm-dd",
          minDate: new Date(),
          onClose: () => t_instance.open()
        })[0];
      console.log(d_instance);

      let t_elems = document.querySelectorAll('.timepicker');
      
      t_instance = M.Timepicker.init(t_elems, {
        onCloseEnd: dateTimePicked
      })[0];

      function dateTimePicked(){
        let time = t_instance.time + " " + d_instance.toString();
        document.getElementById("deadline").value = time;
        console.log(d_instance.toString() + "T" + t_instance.time);
      }
   });
}

let d_instance;
let t_instance;

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
   let el = document.createElement('div');
   el.innerHTML = "<label>Title:</label><input type='text' id='title'></br>" + 
    "<label>Deadline:</label><input type='text' id='deadline'></br>" + 
    "<a class='waves-effect waves-light btn' id='createButton'>Create</a>";
   document.body.appendChild(el);
   dateTimePicker();
   document.getElementById("deadline").onfocus = () => {d_instance.open()};
   document.getElementById("createButton").onclick = () => {console.log('clicked');createTimer();};

}

