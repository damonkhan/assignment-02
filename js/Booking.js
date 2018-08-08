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

/*
*displays arrival time dropdown once check-in and check-out dates set
 */
function checkDates() {
    // check that date inputs are not set to default values
    if (checkIn.value !== "" && checkOut.value !== "") {
        arrivalInput.classList.remove("hidden");
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
* @textContent: Total cost
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
reset.addEventListener("click", function () { document.querySelector("#total").textContent = "0";} );


