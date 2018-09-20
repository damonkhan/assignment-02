const SINGLE_BASE_PRICE = 55;
const DOUBLE_BASE_PRICE = 100;
const STUDIO_BASE_PRICE = 125;
const ADULT_PRICE = 50;
const CHILD_PRICE = 25;
const BREAKFAST_PRICE = 30;

let checkIn = document.querySelector("#check-in");
let checkOut = document.querySelector("#check-out");
let arrivalInput = document.querySelector("#arrival");
let roomType = document.querySelector("#room-type");
let rooms = document.querySelector("#num-rooms");
let adults = document.querySelector("#num-adults");
let child = document.querySelector("#num-children");
let breakfast = document.querySelector("#checkbox-breakfast");
let reset = document.querySelector("#reset");
let submitBtn = document.querySelector('#submitBtn');
let payBtn = document.querySelector('#payBtn');
let blankMsg = " Cannot be left blank";
let repeater;
let opacity = 0;
let increments = 100;
let increment_value = 1/increments;

/*
*displays arrival time dropdown once check-in and check-out dates set
 */
function checkDates() {
    // check that date inputs are not set to default values
    if (checkIn.value !== "" && checkOut.value !== "") {
    	let div = document.getElementById('arrival');
    	div.style.opacity=0;
        opacity = 0;
        fadeNode = div;
        fadeIn(500);
        div.style.display="block";
    }
    else {
        arrivalInput.classList.add("hidden");
    }
}

/*
* Checks that the check out date comes after the
* check in date
 */
function checkDatePicker() {
    // The numeric representation of the check in day.
    let checkinDay = Number(checkIn.value.substring(checkIn.value.length - 2, checkIn.value.length));
    let checkoutDay = Number(checkOut.value.substring(checkOut.value.length - 2, checkOut.value.length));
    let error = document.querySelector("#error-message");

    if (checkoutDay < checkinDay) {
        arrivalInput.classList.add("hidden");
        document.querySelector("#date-error").classList.remove("hidden");
        // Warn the user that the check out date must come before the check in date
        error.innerHTML = "Check out date must come <strong>after</strong> check in date"
    } else if (checkoutDay === checkinDay) {
        // In and out date cannot be the same
        setCheckOutDate();
    } else {
        document.querySelector("#date-error").classList.add("hidden");
        document.querySelector("#error-message").classList.add("hidden");
    }
}

/*
* Automatically sets the check out date to be the day after
* the check in date
 */
function setCheckOutDate() {
    // Deconstruct the date
    let dd = Number(checkIn.value.substring(checkIn.value.length-2, checkIn.value.length));
    let mm = Number(checkIn.value.substring(checkIn.value.length-5, checkIn.value.length-3));
    let yyyy = checkIn.value.substring(0, 4);
    let date;

    // Check for end-of-month dates
    if ((dd === 28 && mm === 2) || (dd === 30 && mm === 9) || (dd === 30 && mm === 4) || (dd === 30 && mm === 6) || (dd === 30 && mm === 11)) {
        dd = 1;
        mm++;
    } else {
        dd += 1;
    }

    // Reconstruct to day after's date
    if (mm < 10) {
        date = yyyy + "-" + "0" + mm + "-" + "0" + dd;
    } else {
        date = yyyy + "-" + mm + "-" + "0" + dd;
    }

    checkOut.value = date;
}

/*
* Gets the num nights a guest is staying
* @ return: num nights (Number)
 */
function getNumNights() {

    return Number(checkOut.value.substring(checkOut.value.length - 2, checkOut.value.length)) - Number(checkIn.value.substring(checkIn.value.length - 2, checkIn.value.length));
}

/*
* Calculates the total cost based on:
* Unit type, num nights, num rooms, num adults, num children, breakfast (optional)
 */
function calculateCost() {
    let unitType = document.querySelector("#room-type").value;
    let numNights = getNumNights();
    let numRooms = Number(document.querySelector("#num-rooms").value);
    let numAdults = Number(document.querySelector("#num-adults").value);
    let numChildren = Number(document.querySelector("#num-children").value);
    let breakfast = document.querySelector("#checkbox-breakfast").checked;
    let total = 0;

    if (unitType !== "none" && numNights !== 0) {

        if (unitType === "single") {
            total = numNights * SINGLE_BASE_PRICE;
        } else if (unitType === "double") {
            total = numNights * DOUBLE_BASE_PRICE;
        } else {
            total = numNights * STUDIO_BASE_PRICE;
        }

        total = total + ((numAdults * ADULT_PRICE) + (numChildren * CHILD_PRICE));
        total *= numRooms;

        if (breakfast) {
            var cost = (BREAKFAST_PRICE * numAdults) + (BREAKFAST_PRICE * numChildren);
            total = cost + total;
        }

        document.querySelector("#total").textContent = total.toString();
    }
}

function validateFName() {
	let regex = /[^a-zA-Z ]/;
	fName = document.getElementById('first-name');
	let result = regex.test(fName.value);
	if (result) {
		let msg = " First name contains invalid characters";
		displayErrorMessage(fName, msg);
	}
	return result;
}

function validateLName() {
	let regex = /[^a-zA-Z ]/;
	lName = document.getElementById('last-name');
	let result = regex.test(lName.value);
	if (result) {
		let msg = " Last name contains invalid characters";
		displayErrorMessage(lName, msg);
	}
	return result;
}

function validateCity() {
	let regex = /[^a-zA-Z ]/;
	city = document.getElementById('city');
	let result = regex.test(city.value);
	if (result) {
		let msg = " Name contains invalid characters";
		displayErrorMessage(city, msg);
	}
	return result;
}

function validatePostalCode() {
    // get the postal code as a number
    let number = Number(document.getElementById('postal').value);
    let msg = " Invalid post code";

    if (!(number >= 0 && number <= 9999)) {
        displayErrorMessage(document.getElementById('postal'), msg);
        return true;
    }
    // valid
    return false;
}

function validateEmail() {
	let regex = /^\w+@[a-z]+(\.[a-z]+)+$/; 
	email = document.getElementById('email');
	let result = regex.test(email.value);
	if (!result) {
		let msg = " Email contains invalid characters";
		displayErrorMessage(email, msg);
	}
	return !result;
}

function validateCardNum() {
	ccNum = document.getElementById('ccnum');
	if (isNaN(ccNum.value)) {
		let msg = " Invalid card number";
		displayErrorMessage(ccNum, msg);
		return true;
	}
	return false;
}

function validateCSC() {
	cscNum = document.getElementById('cscnum');
	if (isNaN(cscNum.value)) {
		let msg = " Invalid CSC number";
		displayErrorMessage(cscNum, msg);
		return true;
	}
	return false;
}

function validateMM() {
	month = document.getElementById('month');
	if (isNaN(month.value)) {
		let msg = " Invalid month";
		displayErrorMessage(month, msg);
		return true;
	}
	return false;
}

function validateYY() {
	year = document.getElementById('year');
	if (isNaN(year.value)) {
		let msg = " Invalid year";
		displayErrorMessage(year, msg);
		return true;
	}
	return false;
}


function validateCCNums() {
    let msg = "";

    if(Number(document.getElementById('ccnum').value) < 0 || Number(document.getElementById('ccnum').value) > 9999999999999999) {
        msg = " Invalid card number";
        displayErrorMessage(document.getElementById('ccnum'), msg);
        return true;
    } else if (Number(document.getElementById('cscnum').value) < 0 || Number(document.getElementById('cscnum').value) > 999) {
        msg = " Invalid csc number";
        displayErrorMessage(document.getElementById('cscnum'), msg);
        return true;
    } else if (Number(document.getElementById('month').value) === 0 || Number(document.getElementById('month').value) > 12) {
        msg = " Invalid month";
        displayErrorMessage(document.getElementById('month'), msg);
        return true;
    } else if (Number(document.getElementById('year').value) === 0 || Number(document.getElementById('year').value) > 99) {
        msg = " Invalid year";
        displayErrorMessage(document.getElementById('year'), msg);
        return true;
    }

    console.log("CC info valid");
    return false;
}


/*
* Checks all required inputs are not left blank.
* @return: true if blank, false otherwise.
 */
function checkRequiredInputs() {

    // get arr of all required input
    let req = document.getElementsByClassName('req-input');

    for (var i = 0; i < req.length; i++) {
        if(req[i].value === "") {
            // display err message next to offending element
            displayErrorMessage(req[i], blankMsg);
            return true;
        }
    }
    return false;
}

function displayErrorMessage(element, msg) {

    if (document.getElementById('errElement') !== null) {
        document.getElementById('errElement').remove();
    }

    // check if message already being displayed
    if( element.nextSibling.tagName === "SPAN" && element.nextSibling.textContent.trim === msg.trim) {
        return;
    }
    // create an error element to display
    let errElement = document.createElement("span");
    errElement.setAttribute('id', 'errElement');
    errElement.textContent = msg;
    errElement.style.color = 'red';
    element.parentNode.insertBefore(errElement, element.nextSibling);
    element.style.border = "1px solid red";
}

function detailsValidator() {
    if (checkRequiredInputs()) {
    	// scroll back to the top of the page
        document.querySelector('#first-name').focus();
    } else if(validateFName()) {
    	document.querySelector('#first-name').focus();
    } else if(validateLName()) {
    	document.querySelector('#last-name').focus();
    } else if(validateCity()) {
    	document.querySelector('#city').focus();
    } else if(validateEmail()) {
    	document.querySelector('#email').focus();
    } else if(validatePostalCode()) {
    	document.querySelector('#postal').focus();
    }else {
    	let div = document.getElementById('payment-div');
    	div.style.opacity=0;
        opacity = 0;
        fadeNode = div;
        fadeIn(500);
        div.style.display="block";
        document.getElementById('submit-div').style.display = 'none';
        document.getElementById('payBtn').focus();
    }

}

function ccValidator() {
	if (validateCardNum()) {
		document.getElementById('ccnum').focus();
	} else if (validateCCNums()) {
		document.getElementById('cscnum').focus();
	} else if (validateCSC()) {
		document.getElementById('cscnum').focus();
	} else if (validateMM()) {
		document.getElementById('month').focus();
	} else if (validateYY()) {
		document.getElementById('year').focus();
	} else {
		document.getElementById('bookingForm').submit();
	}
}

// code block comes from Vimal Kumar, COMPX222
function fadeIn(duration) {
     var interval = duration/increments;
     repeater = setInterval(increaseOpacity, interval);
}

function increaseOpacity() 
{
    
    if (opacity < 1.0) 
    {
        opacity = opacity + increment_value;
        fadeNode.style.opacity = opacity;
    } 
    else 
    {
        clearInterval(repeater);
    }
}

function fadeOut(duration)
{

     var interval = duration/increments;
     repeater = setInterval(decreaseOpacity, interval);
    
}

function decreaseOpacity() 
{
    
    if (opacity > 0) 
    {
        opacity = opacity - increment_value;
        fadeNode.style.opacity = opacity;
    } 
    else 
    {
        fadeNode.style.display="none";
        clearInterval(repeater);
    }
}


// Unobtrusive JavaScript
checkIn.addEventListener("change", setCheckOutDate);
checkIn.addEventListener("change", checkDates);
checkIn.addEventListener("change", calculateCost);
checkOut.addEventListener("change", checkDates);
checkOut.addEventListener("change", checkDatePicker);
checkOut.addEventListener("change", calculateCost);
roomType.addEventListener("change", calculateCost);
adults.addEventListener("change", calculateCost);
child.addEventListener("change", calculateCost);
breakfast.addEventListener("change", calculateCost);
rooms.addEventListener("change", calculateCost);
submitBtn.addEventListener("click", detailsValidator);
payBtn.addEventListener("click", ccValidator);
reset.addEventListener("click", function () { document.querySelector("#total").textContent = "0";} );


