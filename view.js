//not written the documentation of deleteThisLocker
/** 
 * view.js 
 * This file contains the following functions :
 * displayLockerInfo(locker)
 * unlock(locker)
 * lockLocker()
 * closeLocker()
 * deleteThisLocker()
 * code that runs on load for view.html
 *  This file contains shared code that runs on view.html
 */

"use strict";

//displayLockerInfo(locker)
//
//This function takes one parameter, locker. It is responsible for displaying/populating the locker information into the HTML page (using DOM Manipulation) in view.html page.
//I have assigned a particular id (as said in the task) to a variable by document.getElementById and using the innerHTML atttribute, I have displayed it in the desired area,
//the contents, label, color and the id. Also, I have implemented the delete locker button on view.html page in this function, which on click runs the deleteThisLocker function.
//
//returns: This function returns nothing.
function displayLockerInfo(locker) {
    let outputId = document.getElementById("lockerId")
    let outputOfId=`<h4>${locker._id}</h4>`;
    outputId.innerHTML = outputOfId;
    let outputContent = document.getElementById("lockerContents");
    let outputOfContent = locker._contents;
    outputContent.innerHTML = outputOfContent; //for displaying it to the user
    let outputLabel = document.getElementById("lockerLabel");
    let outputOfLabel = locker._label;
    outputLabel.innerHTML = outputOfLabel; //for displaying it to the user
    let outputColor = document.getElementById("lockerColor");
    let outputOfColor = locker._color;
    outputColor.innerHTML = outputOfColor; //for displaying it to the user
    let buttonRef = document.getElementById("deleteLocker"); //for the delete button on HTML page
    let deleteButton = "<button class='mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab-colored' onclick='deleteThisLocker()'><i class='material-icons'>delete_forever</i></button>";
    buttonRef.innerHTML = deleteButton;
}

//unlock(locker)
//
//This function takes one parameter, locker. It is responsible for unlocking the locker, if it is locked.  It will prompt for locker's pin, validate it. Also, I have implemented to check for the
//if the last pin is equal to the pin entered by the user.
//
//returns: This function returns nothing.
function unlock(locker) {
    //code for finding the index of the locker
    let index = localStorage.getItem(LOCKER_INDEX_KEY); //retrieving the index of the selected locker
    let forConverting = JSON.parse(localStorage.getItem(LOCKER_DATA_KEY)); //parsing the locker from the key LOCKER_DATA_KEY to convert it into an array
    let arrayValue = forConverting._lockers; //for finding the array value
    let lastValue = arrayValue[index]; //for the last value
    let pinEntered = prompt("Please enter the locker's PIN");
    if (pinEntered != null && pinEntered != "" && pinEntered != undefined) {
        if (pinEntered == lastValue._pin) {
            locker._locked = false; //setting the locked attribute to false
            locker._pin = ""; //clearing the pin
            displayLockerInfo(locker);
        }
        else {
            window.location = "index.html"; //back to the main page
        }
    }
}

//lockLocker()
//
//This function is responsible to lock the locker when we are done from the view.html page. This function will be called on click of the button lock locker.
//This function prompts to confirm once if the user wants to do so. For setting the locker it will then ask for pin and then the user will be asked to enter the pin again.
//I have used if else statement implementation to match both pin. This function is also updating color, label, pin and contents.
//
//returns: This function returns nothing
function lockLocker() {
    let index = localStorage.getItem(LOCKER_INDEX_KEY); //retrieves the index of the selected locker
    let forUpdatingLockerContents = document.getElementById("lockerContents").value; //assigning locker contents
    let forUpdatingLockerLabel = document.getElementById("lockerLabel").value; //assigning locker label
    let forUpdatingLockerColor = document.getElementById("lockerColor").value; //assigning locker color
    let forConverting = JSON.parse(localStorage.getItem(LOCKER_DATA_KEY));
    if (confirm("Confirm lock locker?") == true) { //prompt to confirm
        let pin1 = prompt("Enter the Locker's pin "); //1st pin enter
        let pin2 = prompt("Enter the Locker's pin again "); //2nd pin enter
        if (pin1 == pin2 && pin1 != null && pin2 != null && pin1 != "" && pin2 != "" && pin1 != undefined && pin2 != undefined) { //checking the validation of both the pins entered
            let array = { _lockers: [] }; //setting array to a blank lockers array
            //The map() method creates a new array with the results of calling a function for every array element.
            forConverting._lockers.map((val, i) => { //a loop
                if (index == i) { //if index and i matches
                    let locker = val; //locker is set to val
                    locker._locked = true; //changing the locked attribute
                    locker._pin = pin1; //setting the new pin
                    locker._contents = forUpdatingLockerContents; //for updating locker contents
                    locker._color = forUpdatingLockerColor; //for updating locker color
                    locker._label = forUpdatingLockerLabel; //for updating locker label
                    array._lockers.push(locker); //pushing it into the array of lockers
                }
                else { //pushes the val inside the array
                    array._lockers.push(val);
                }

            })
            updateLocalStorage(array); //updating the local storage with the array above which consists of all the updated items
            window.alert("Locker is now locked.");
            window.location = "index.html"; //redirecting to this page
        }
        //throwing appropriate errors if the 1st pin and 2nd pin isn't matched or any of the pin, in any sense is not validated.
        else if (pin1 == "" || pin2 == "" || pin1 == null || pin2 == null || pin1 == undefined || pin2 == undefined) {
            window.alert("Invalid Pin. Please try again.");
        }
        else {
            window.alert("Both the pins didn't match. Please try again.");
        }
    }
}

//closeLocker()
//
//This function runs when Close Locker button is clicked. On the view page, we can close the locker when we are done, without locking it.
//
//
//returns: This function returns nothing.
function closeLocker() {
    if (confirm("Confirm close locker without locking?") == true) { //Confirm locker prompt is generated
        //for updating the locker data (contents, label, color)
        let forUpdatingLockerContents = document.getElementById("lockerContents").value; //assigning locker contents
        let forUpdatingLockerLabel = document.getElementById("lockerLabel").value; //assigning locker label
        let forUpdatingLockerColor = document.getElementById("lockerColor").value; //assigning locker color
        let forConverting = JSON.parse(localStorage.getItem(LOCKER_DATA_KEY)); //getting the array inside the LOCKER_DATA_KEY
        let index = localStorage.getItem(LOCKER_INDEX_KEY); //retrieves the index of the selected locker
        let array = { _lockers: [] }; //setting array to a blank lockers array
        //The map() method creates a new array with the results of calling a function for every array element.
        forConverting._lockers.map((val, i) => { //a loop
            if (index == i) { //if index and i matches
                let locker = val; //locker is set to val
                locker._locked = false; //changing the locked attribute
                locker._contents = forUpdatingLockerContents; //for updating locker contents
                locker._color = forUpdatingLockerColor; //for updating locker color
                locker._label = forUpdatingLockerLabel; //for updating locker label
                array._lockers.push(locker); //pushing it into the array of lockers
            }
            else { //pushes the val inside the array
                array._lockers.push(val);
            }
        })
        let newstring = JSON.stringify(array);
        localStorage.setItem(LOCKER_DATA_KEY, newstring); //setting the local storage with the array above which consists of all the updated items
        window.alert("The locker is closed but not locked");
        window.location = "index.html"; //redirecting the user to this page
    }
}

//displayDeleteButton(index)
//
//This function is responsible for the functioning of the delete button on view.html. It prompts the user for confirmatiion if the user wants to still delete the locker.
//I have applied if statement if the user says yes to the prompt. It then calls the removeLocker method with the locker id and updates local storage with the new lockers array and gives the alert of the locker's deletion.
//
//returns: This function returns nothing
function deleteThisLocker() {
    if (confirm("Confirm delete locker?") == true) {
        let id = locker.id;
        lockers.removeLocker(id);
        updateLocalStorage(lockers);
        alert("The locker has been deleted");
        window.location = "index.html"; //for redirecting to the main page
    }
}

//Retrieve the stored index from local storage into index variable
let index = localStorage.getItem(LOCKER_INDEX_KEY);
//Using the getLocker method, we get the current Locker instance (of that particular instance)
let locker = lockers.getLocker(index);
//code that will run on load here
if (locker._locked) {
    unlock(locker); //unlocking if locked
}
else {
    displayLockerInfo(locker); //if it's not locked then displaying the info
}