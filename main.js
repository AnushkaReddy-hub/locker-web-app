/** 
 * main.js 
 * This file contains the following functions :
 * displayLockers(data)
 * addNewLocker()
 * view(index)
 * displayDeleteButton(index)
 * deleteThisLocker(index)
 * the code that runs on load here
 * This file contains code that runs on load for index.html
 */

"use strict";

//displayLockers(data)
//
//Lines 40 to 54 contained some HTML code for a single locker in the index.html file. I've used JS to generate this HTML code for every locker in the global LockerList
//instance variable, lockers. The HTML generated is displayed in the div with ID lockerDisplay. Also, the locker status (locked vs unlocked) is shown visually using the
//appropriate material design icons lock and unlock/lock_open by using a if statement and checking the locked attribute status. I have begin by creating an output variable, 
//and looping over all the lockers in the LockerList instance (which is passed to this function as a parameter), and generated the appropriate HTML with the values from each locker,
//then display it on the page using the innerHTML property of the lockerDisplay div. I've used the concatenation operator += to append to the output variable and only set the innerHTML
//property once outside the loop. Before doing this I have calculated R, G and B value of the background color of that particular locker and stored it in variables, R, G and B respectively.
//I have made seperate functions to change from hex value of the background color to R, G and B value to simplify the code. Then, I have calculated the brightness using this formula of brightness  
//equal to sqrt( .299 R^2 + .587 G^2 + .114 B^2 ). Then we have a textColorDeciderPoint which is equal to 128, since it's deciding whether the textColor should be black or white. I have initialised
//a variable textColor to set to black or white according to the condition that if brightness > textColorDeciderPoint then it will be black or else white.
//
//returns: This function returns nothing.
function displayLockers(data) {
    let resultAreaRef = document.getElementById("lockerDisplay")
    let markup = "";
    //I have calculated this first because I want to change the color before writing anything into the cards
    for (let i = 0; i < data.count; i++) {
        let R = hexToR(data.lockers[i]._color);
        let G = hexToG(data.lockers[i]._color);
        let B = hexToB(data.lockers[i]._color);
        function hexToR(h) { return parseInt((cutHex(h)).substring(0, 2), 16) }
        function hexToG(h) { return parseInt((cutHex(h)).substring(2, 4), 16) }
        function hexToB(h) { return parseInt((cutHex(h)).substring(4, 6), 16) }
        function cutHex(h) { return (h.charAt(0) == "#") ? h.substring(1, 7) : h }
        let brightness = Math.sqrt(((Math.pow(R, 2)) * 0.299) + ((Math.pow(G, 2)) * 0.587) + ((Math.pow(B, 2)) * 0.114));
        let textColorDeciderPoint = 128;
        let textColor = (brightness > textColorDeciderPoint) ? 'black' : 'white';
        markup +=
            ` 
        <div class="mdl-cell mdl-cell--4-col" >
        <div class="mdl-card mdl-shadow--2dp locker" style="background-color:${data.lockers[i].color}">
        <div class="mdl-card__title mdl-card--expand">
            <h2 style="color:${textColor}">${data.lockers[i].id}</h2>
            <h4 style="color:${textColor}">&nbsp;${data.lockers[i].label}</h4>
            <span style="padding-left:54%;padding-bottom:35%">
                <button  class="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab" onClick="deleteThisLocker(${i})">
                     <i class="material-icons">delete_forever</i>
                </button>
            </span>
                </div>
        <div class="mdl-card__actions mdl-card--border">
        <a style="color:${textColor}" class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" onClick="view(${i})">Open Locker</a>
        <div class="mdl-layouht-spacer"></div>
        `;
        if (data.lockers[i]._locked === true) { //lock close if locked attribute is true
            markup += `<i style="color:${textColor}" class="material-icons">lock_close</i>
                </div>
            </div>
        </div>
                    `;
        }
        else if (data.lockers[i]._locked === false) { //lock open if locked attribute is false
            markup += `<i style="color:${textColor}" class="material-icons">lock_open</i>
                </div>
             </div> 
        </div>
                    `;
        }

    }
    resultAreaRef.innerHTML = markup; //at the end of the for loop as I am appending everything to the marker variable
}

//addNewLocker()
//
//This function is responsible for the interaction with the user to create a new locker using the addLocker method in the LockerList class.
//If the lockers array count is 0, it will add a locker with the id A001. Then, I have update the local storage and displayed the locker card
//by calling the previous function's that do these above mentioned work.
//If this isn't the first locker then I have made a effort to find the last id, so I can increment it and finally added a new locker by calling the function addLocker of the class.
//
//Returns: This function returns nothing
function addNewLocker() {
    if (lockers.count == 0) {
        //confirm here should be LockerList
        lockers.addLocker("A001");
        //confirm the parameter inside the updateLocalStorage and displayLockers
        updateLocalStorage(lockers);
        displayLockers(lockers);
    }
    else {
        let forConverting = JSON.parse(localStorage.getItem(LOCKER_DATA_KEY)); //starting from retrieving the locker using LOCKER_DATA_KEY
        let arrayValue = forConverting._lockers; //for it's array
        let lengthOfArray = arrayValue.length; //finding the length of the present array of lockers
        let lastValue = arrayValue[lengthOfArray - 1]; //For finding the last value. As array starts from 0, we have to subtract 1 for the last locker
        let id = lastValue._id; //finding the id of the last value
        let forSplitting = id.split("A"); //for incrementing we have to split it A as JavaScript cannot increment a variable which has a character and a number together.I've done this using in-built split method. 
        let actualValue = forSplitting[1]; //This gives us the 1st element of the forSplitting array, considering that array's actual first element is the 0th element which here is just a blank string because of the split method used.
        let result = parseInt(actualValue) + 1; //Used parseInt for converting the string to an integer and then adding 1 for incrementing the id. It will ignore the 0 infront as that doesn't matter in case of integers.
        // here I've calculated the number of digits by converting the result variable to a string and calculating it's length.
        if (result.toString().length === 1) {
            let finalResult = "A00" + result; //for example if the number of digits is just 1 then we are appending A00 to a new variable, finalresult
            lockers.addLocker(finalResult); //adding the locker with this id to our locker's array.
        }
        else if (result.toString().length === 2) { //used else if to check if the digit is 2 and not else as their was a condition
            let finalResult = "A0" + result; //appended A0 as 2 digits are already coming from result
            lockers.addLocker(finalResult);
        }
        else {
            let finalResult = "A" + result; //used else for every other id as the digit is more than 2 and can take care of itself while incrementing. Therefore, appended only A.
            lockers.addLocker(finalResult);
        }
        updateLocalStorage(lockers);
        displayLockers(lockers);
    }
}

//view(index)
//
//This function has one parameter, index. When the user clicks on 'open locker', the function view runs, with the pre-populated parameter of the locker's index. It stores index in
//local storage using key LOCKER_INDEX_KEY and then redirects the user to the next page which is view.html for viewing the complete information of the locker.
//
// returns: This function doesn't return anything.
function view(index) {
    localStorage.setItem(LOCKER_INDEX_KEY, index);
    window.location = "view.html"; //done by using window.location
}

//displayDeleteButton(index)
//
//This function is created for displaying the delete button in the index.html page. I have passed index to this as I wanted it to display for every specific locker card.
//On clicking this function the below function deleteThisLocker is called. This funciton is not the exact copy of the delete locker function in view.js as I wanted to try by doing it with passing the index. But I have made it as
//similar as it was possible. I have displayed using the deleteButton id and set in the HTML the exact place of it. Then using the innerHTML, I have displayed it. Also, for writing HTML in JavaScript, I've made use of temperate literal.
//I had to use this because there was some logic associated with those buttons.
//
//returns: This function returns nothing.
function displayDeleteButton(index) {
    let outputRef = document.getElementById("deleteButton");
    //a variable to store the output string
    let output = `<button class="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored" id="deleteLocker" onclick="deleteThisLocker(${index})"><i class="material-icons">delete_forever</i></button>`;
    // display it to the user
    outputRef.innerHTML = output;
    //let buttonRef = document.getElementById("deleteLocker");
    //buttonRef.addEventListener("click", deleteThisLocker());
}

//deleteThisLocker(index)
//
//This function takes one parameter index, it will prompt the user for confirming delete locker and if clicked yes it will delete this locker. I have used the id as it will be taken by remove locker function of the LockerList class.
//Then after removing the locker, I am updating the Local Storage followed by redirecting the user to the main page which is index.html.
//
//returns: This function returns nothing.
function deleteThisLocker(index) {
    if (confirm("Confirm delete locker?") == true) {
        let id = lockers.lockers[index].id; //it stores the id of that locker
        lockers.removeLocker(id); //calls the function remove locker function of the class with that id
        updateLocalStorage(lockers); //for updating the local storage
        alert("The locker has been deleted");
        window.location = "index.html"; //it reloads so that displayLockers(lockers) runs
    }
}

//the code that runs on load here
displayLockers(lockers); //This line because after refreshing, I want the lockers to be displayed of the latest Local storage.