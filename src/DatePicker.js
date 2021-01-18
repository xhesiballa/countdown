export default class DatePicker{
	constructor(callback){
		this.callback = callback;
		console.log("creating date picker instance");
		let d_elems = document.createElement("input");
		d_elems.hidden = true;
		d_elems.type = "text";
		d_elems.classList.add("datepicker");
		document.body.appendChild(d_elems);

		let t_elems = document.createElement("input");
		t_elems.hidden = true;
		t_elems.type = "text";
		t_elems.classList.add("timepicker");
		document.body.appendChild(t_elems);

	  	d_elems = document.querySelectorAll('.datepicker');

      	this.d_instance = M.Datepicker.init(d_elems, 
	        { autoClose: true, 
	          format: "yyyy-mm-dd",
	          minDate: new Date(),
	          onClose: () => this.t_instance.open()
	        })[0];
      	console.log(d_elems);

        t_elems = document.querySelectorAll('.timepicker');
      
      	this.t_instance = M.Timepicker.init(t_elems, {
        	onCloseEnd: () => {this.dateTimePicked();}
      	})[0];
	}

	dateTimePicked(){
        let time = this.t_instance.time + " " + this.d_instance.toString();
        console.log(this.d_instance.toString() + "T" + this.t_instance.time);
        this.callback(time);
    }
      

	pickDate(){
		this.d_instance.open();
	}
}