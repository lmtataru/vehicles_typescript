// declare a global variable of type Car
let car: Car;
function createCar(plate: string, brand: string, color: string) {
    car = new Car(plate, color, brand);
}
// connect and get data from form
const form: HTMLFormElement = (document.querySelector('#car_form') as HTMLFormElement);
const form1: HTMLFormElement = (document.querySelector('#wheel_form') as HTMLFormElement);

form.onsubmit = () => {
	var plate: HTMLInputElement = (document.getElementById("plate_car") as HTMLInputElement);
	var color: HTMLInputElement = (document.getElementById("color_car") as HTMLInputElement);
	var brand: HTMLInputElement = (document.getElementById("brand_car") as HTMLInputElement);
	//create errors
	var plate_error: HTMLInputElement = (document.getElementById("plate_error") as HTMLInputElement);
	var color_error: HTMLInputElement = (document.getElementById("color_error") as HTMLInputElement);
	var brand_error: HTMLInputElement = (document.getElementById("brand_error") as HTMLInputElement);
	
	var countErrors: number = 0;
	// verify if plate number format, brand&color are not empty, if they are not -> create car
	if (!validatePlate(plate.value)) {
        plate.classList.add('is-invalid');
        plate_error.textContent = "Please insert your plate number";
        countErrors++;
    } else {
    	plate.classList.remove('is-invalid');
    	plate.classList.add('is-valid');
    	plate_error.textContent = "";
  	}

  	if (!color.value) {
  		color.classList.add('is-invalid');
        color_error.textContent = "Please insert the color";
        countErrors++;
  	} else {
  		color.classList.remove('is-invalid')
  		color.classList.add('is-valid');
    	color_error.textContent = "";
  	}

  	if (!brand.value) {
  		brand.classList.add('is-invalid');
        brand_error.textContent = "Please insert the brand";
        countErrors++;
  	} else {
  		brand.classList.remove('is-invalid');
  		brand.classList.add('is-valid');
    	brand_error.textContent = "";
  	}

  	if (countErrors == 0) {
		createCar(plate.value, brand.value, color.value);
		form.style.display = "none";
   		form1.classList.remove('invisible');
  	}
	
  	return false; // prevent reload
}
// check if the plate number format is correct 
function validatePlate(platenr: string){
	var plateformat: RegExp = /^[0-9]{4}[A-Za-z]{3}$/;
	if (plateformat.test(platenr)) {
        return true;
    } else {
        return false;
    }
}

form1.onsubmit = () => {
	var first_diameter: HTMLInputElement = (document.getElementById("first_diameter") as HTMLInputElement);
	var first_wheel: HTMLInputElement = (document.getElementById("first_wheel") as HTMLInputElement);
	var second_diameter: HTMLInputElement = (document.getElementById("second_diameter") as HTMLInputElement);
	var second_wheel: HTMLInputElement = (document.getElementById("second_wheel") as HTMLInputElement);
	var third_diameter: HTMLInputElement = (document.getElementById("third_diameter") as HTMLInputElement);
	var third_wheel: HTMLInputElement = (document.getElementById("third_wheel") as HTMLInputElement);	
	var fourth_diameter: HTMLInputElement = (document.getElementById("fourth_diameter") as HTMLInputElement);
	var fourth_wheel: HTMLInputElement = (document.getElementById("fourth_wheel") as HTMLInputElement);
	
	
	var diameter1_error: HTMLInputElement = (document.getElementById("diameter1_error") as HTMLInputElement);
	var wheel1_error: HTMLInputElement = (document.getElementById("wheel1_error") as HTMLInputElement);	
	var diameter2_error: HTMLInputElement = (document.getElementById("diameter2_error") as HTMLInputElement);
	var wheel2_error: HTMLInputElement = (document.getElementById("wheel2_error") as HTMLInputElement);
	var diameter3_error: HTMLInputElement = (document.getElementById("diameter3_error") as HTMLInputElement);
	var wheel3_error: HTMLInputElement = (document.getElementById("wheel3_error") as HTMLInputElement);
	var diameter4_error: HTMLInputElement = (document.getElementById("diameter4_error") as HTMLInputElement);
	var wheel4_error: HTMLInputElement = (document.getElementById("wheel4_error") as HTMLInputElement);
	
	var countErrors: number = 0;

	countErrors += checkDiameter(first_diameter, diameter1_error);
	countErrors += checkDiameter(second_diameter, diameter2_error);
	countErrors += checkDiameter(third_diameter, diameter3_error);
	countErrors += checkDiameter(fourth_diameter, diameter4_error);

 	countErrors += checkWheel(first_wheel, wheel1_error);
 	countErrors += checkWheel(second_wheel, wheel2_error);
 	countErrors += checkWheel(third_wheel, wheel3_error);
 	countErrors += checkWheel(fourth_wheel, wheel4_error);

  	if (countErrors == 0) {
		car.addWheel(new Wheel(parseFloat(first_diameter.value), first_wheel.value));
		car.addWheel(new Wheel(parseFloat(second_diameter.value), second_wheel.value));
		car.addWheel(new Wheel(parseFloat(third_diameter.value), third_wheel.value));
		car.addWheel(new Wheel(parseFloat(fourth_diameter.value), fourth_wheel.value));

		var show_data: HTMLElement = (document.getElementById("show_data") as HTMLElement);
		show_data.classList.remove('invisible');
		// display data
		const car_details: any = document.getElementsByClassName("col-3");
			car_details[0].innerHTML = "Plate: " + car.plate;
			car_details[1].innerHTML = "Color: " + car.color;
			car_details[2].innerHTML = "Brand: " + car.brand;

		const wheel_details: any = document.getElementsByClassName("col");
		for (var i: number = 0; i < wheel_details.length; i++) {
				wheel_details[i].innerHTML = "Wheel: " +  (i + 1) + "<br>" + 
    			    						 "Brand: " +  car.wheels[i].brand + "<br>" + 
    			    						 "Diameter: " + car.wheels[i].diameter + "<br>";
		}
  	}
  	return false; // prevent reload "&nbsp" 
}
// check if the plate diameter is between 0.4 and 2
function validateDiameter(diameter: number) {
	if ((0.4 < diameter) && (diameter < 2)) {
        return true;
    } else {
        return false;
    }
}
// count errors
function checkDiameter(diameter:HTMLInputElement, diameter_error: HTMLInputElement) {
	var countErrors: number = 0;

	if (!diameter.value) {
  		diameter.classList.add('is-invalid');
        diameter_error.textContent = "Please insert the diameter";
        countErrors++;
  	} else if (!validateDiameter(parseFloat(diameter.value))) {
  		switch(diameter.id) {
  			case "first_diameter":
  				alert("Diameter of the 1st wheel is not correct");
  				break;
			case "second_diameter":
  				alert("Diameter of the 2nd wheel is not correct");
  				break;
 			case "third_diameter":
  				alert("Diameter of the 3rd wheel is not correct");
  				break;
			case "fourth_diameter":
  				alert("Diameter of the 4th wheel is not correct");
  				break;
  		}
  		diameter.classList.add('is-invalid');
        diameter_error.textContent = "Please insert the correct diameter";
        countErrors++;
  	} else {
  		diameter.classList.remove('is-invalid');
  		diameter.classList.add('is-valid');
    	diameter_error.textContent = "";
    }
	return countErrors;
}
// count errors
function checkWheel(wheel: HTMLInputElement, wheel_error: HTMLInputElement){
	var countErrors: number = 0;

	if (!wheel.value) {
  		wheel.classList.add('is-invalid');
        wheel_error.textContent = "Please insert the brand";
        countErrors++;
  	} else {
  		wheel.classList.remove('is-invalid');
  		wheel.classList.add('is-valid');
    	wheel_error.textContent = "";
  	}    
  	return countErrors;
}
