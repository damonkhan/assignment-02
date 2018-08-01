let checkIn = document.querySelector("#check-in");
let checkOut = document.querySelector("#check-out");
let arrivalInput = document.querySelector("#arrival");

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
function getNumDays() {
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


// Unobtrusive JavaScript
checkIn.addEventListener("change", setCheckOutDate);
checkIn.addEventListener("change", checkDates);
checkOut.addEventListener("change", checkDates);
checkOut.addEventListener("change", getNumDays);


