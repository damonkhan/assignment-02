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




