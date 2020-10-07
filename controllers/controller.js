"use strict";
// declare a global variable of type Car
var car;
function createCar(plate, brand, color) {
    car = new Car(plate, color, brand);
}
// connect and get data from form
var form = document.querySelector('#car_form');
var form1 = document.querySelector('#wheel_form');
form.onsubmit = function () {
    var plate = document.getElementById("plate_car");
    var color = document.getElementById("color_car");
    var brand = document.getElementById("brand_car");
    //create errors
    var plate_error = document.getElementById("plate_error");
    var color_error = document.getElementById("color_error");
    var brand_error = document.getElementById("brand_error");
    var countErrors = 0;
    // verify if plate number format, brand&color are not empty, if they are not -> create car
    if (!validatePlate(plate.value)) {
        plate.classList.add('is-invalid');
        plate_error.textContent = "Please insert your plate number";
        countErrors++;
    }
    else {
        plate.classList.remove('is-invalid');
        plate.classList.add('is-valid');
        plate_error.textContent = "";
    }
    if (!color.value) {
        color.classList.add('is-invalid');
        color_error.textContent = "Please insert the color";
        countErrors++;
    }
    else {
        color.classList.remove('is-invalid');
        color.classList.add('is-valid');
        color_error.textContent = "";
    }
    if (!brand.value) {
        brand.classList.add('is-invalid');
        brand_error.textContent = "Please insert the brand";
        countErrors++;
    }
    else {
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
};
// check if the plate number format is correct 
function validatePlate(platenr) {
    var plateformat = /^[0-9]{4}[A-Za-z]{3}$/;
    if (plateformat.test(platenr)) {
        return true;
    }
    else {
        return false;
    }
}
form1.onsubmit = function () {
    var first_diameter = document.getElementById("first_diameter");
    var first_wheel = document.getElementById("first_wheel");
    var second_diameter = document.getElementById("second_diameter");
    var second_wheel = document.getElementById("second_wheel");
    var third_diameter = document.getElementById("third_diameter");
    var third_wheel = document.getElementById("third_wheel");
    var fourth_diameter = document.getElementById("fourth_diameter");
    var fourth_wheel = document.getElementById("fourth_wheel");
    var diameter1_error = document.getElementById("diameter1_error");
    var wheel1_error = document.getElementById("wheel1_error");
    var diameter2_error = document.getElementById("diameter2_error");
    var wheel2_error = document.getElementById("wheel2_error");
    var diameter3_error = document.getElementById("diameter3_error");
    var wheel3_error = document.getElementById("wheel3_error");
    var diameter4_error = document.getElementById("diameter4_error");
    var wheel4_error = document.getElementById("wheel4_error");
    var countErrors = 0;
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
        var show_data = document.getElementById("show_data");
        show_data.classList.remove('invisible');
        // display data
        var car_details = document.getElementsByClassName("col-3");
        car_details[0].innerHTML = "Plate: " + car.plate;
        car_details[1].innerHTML = "Color: " + car.color;
        car_details[2].innerHTML = "Brand: " + car.brand;
        var wheel_details = document.getElementsByClassName("col");
        for (var i = 0; i < wheel_details.length; i++) {
            wheel_details[i].innerHTML = "Wheel: " + (i + 1) + "<br>" +
                "Brand: " + car.wheels[i].brand + "<br>" +
                "Diameter: " + car.wheels[i].diameter + "<br>";
        }
    }
    return false; // prevent reload "&nbsp" 
};
// check if the plate diameter is between 0.4 and 2
function validateDiameter(diameter) {
    if ((0.4 < diameter) && (diameter < 2)) {
        return true;
    }
    else {
        return false;
    }
}
// count errors
function checkDiameter(diameter, diameter_error) {
    var countErrors = 0;
    if (!diameter.value) {
        diameter.classList.add('is-invalid');
        diameter_error.textContent = "Please insert the diameter";
        countErrors++;
    }
    else if (!validateDiameter(parseFloat(diameter.value))) {
        switch (diameter.id) {
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
    }
    else {
        diameter.classList.remove('is-invalid');
        diameter.classList.add('is-valid');
        diameter_error.textContent = "";
    }
    return countErrors;
}
// count errors
function checkWheel(wheel, wheel_error) {
    var countErrors = 0;
    if (!wheel.value) {
        wheel.classList.add('is-invalid');
        wheel_error.textContent = "Please insert the brand";
        countErrors++;
    }
    else {
        wheel.classList.remove('is-invalid');
        wheel.classList.add('is-valid');
        wheel_error.textContent = "";
    }
    return countErrors;
}
