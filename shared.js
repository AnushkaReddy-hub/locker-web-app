/** 
 * shared.js 
 * This file contains the 2 major class which is the backbone of the app, which is Locker and LockerList.
 * This file contains the following functions :
 * checkIfDataExistsLocalStorage()
 * updateLocalStorage(data)
 * getDataLocalStorage()
 * code that will run on load here
 * This file contains shared code that runs on both view.html and index.html
 */

"use strict";

// Constants used as KEYS for LocalStorage
const LOCKER_INDEX_KEY = "selectedLockerIndex";
const LOCKER_DATA_KEY = "lockerLocalData";
//A class Locker to easily imagine every locker and it's attributes
class Locker {
    //constructor (id) 
    //
    //This function takes one parameter id. This will help to create a Locker class's Object.
    //Here _ means private attributes of the class. This means of this object. When defining a object, it will automatically set the _id to id, _label to a blank string,
    //_color to a function which returns random color, _contents to a blank string, _locked to false, as we want our locker to be initially not locked and the pin of the
    //locker to a blank string. We will set the pin when we are locking the locker.
    //
    //returns: This function does not return anything.
    constructor(id) {
        // private attributes
        this._id = id;
        this._label = "";
        this._color = this._forgeneratingrandomcolor();
        this._contents = "";
        this._locked = false;
        this._pin = "";
    }

    //get id(), get label(), get locked(), get pin(), get color(), get contents()
    //
    //These functions are called the accessors to access the containing elements of this class.
    //
    // returns: These functions returns the following respectively _id, _label, _locked, _pin, _color and _contents.
    get id() {
        return this._id;
    }
    get label() {
        return this._label;
    }
    get locked() {
        return this._locked;
    }
    get pin() {
        return this._pin;
    }
    get color() {
        return this._color;
    }
    get contents() {
        return this._contents;
    }

    // label(text), locked(state), pin(pin), color(color), contents(text)
    //
    //These functions are called mutators which allows to easily change the set label, the locked state, the pin, the color, the locked respectively of the particular
    //object, which is taken care of this.
    //
    //returns: These functions returns nothing.
    set label(text) {
        this._label = text;
    }
    set locked(state) {
        this._locked = state;
    }
    set pin(pin) {
        this._pin = pin;
    }
    set color(color) {
        this._color = color;
    }
    set contents(text) {
        this._locked = text;
    }

    // fromData(data)
    //
    // This function to ‘restore’ the data into a class instance. It takes one parameter data, which is going to be a object.
    // 
    // returns: This functions returns nothing.
    fromData(data) {
        this._id = data._id;
        this._label = data._label;
        this._locked = data._locked;
        this._pin = data._pin;
        this._color = data._color;
        this._contents = data._contents;
    }

    //_forgeneratingrandomcolor()
    //
    //This function to generate random colors for every card of locker. It takes no parameters. Here I have used for loop and first assigned 2 variables letters and color
    // to choose from. I'm appending to color as it is initialised with # from which a hex color starts from.
    //
    //returns: A random hex color value of 6 digits.
    _forgeneratingrandomcolor() {
        let letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)]; //Math.floor to round it off, Math.random to choose a random number and multiplied by 16 as their are only 16 elemts in letters.
        }
        return color;
    }
}

//second class named LockerList to store the Lockers instance of the above class, basically to keep all the objects of the Locker class as a array.
class LockerList {
    constructor() {
        this._lockers = [];
    }

    //get lockers() and get count()
    //
    //These functions are called the accessors to access the containing elements of this class.
    //
    // returns: These functions returns the following respectively _lockers and _lockers.length as lockers is an array which will store the objects of the first class, Locker in an array. 
    get lockers() {
        return this._lockers;
    }
    get count() {
        return this._lockers.length;
    }

    //addLocker(id)
    //
    //This function is for adding any new locker with the id as it's parameter. It creates a new Locker class instance with that particular id which is passed and  stored inside a variable locker.
    //Then it pushes this object into the _lockers array of this class.
    //
    //returns: This function returns nothing.
    addLocker(id) {
        let locker = new Locker(id);
        this._lockers.push(locker);
    }

    //getLocker(index)
    //
    //This function is for getting the locker whose index is passed.
    //
    //returns: This function returns the locker whose index is passed.
    getLocker(index) {
        return this._lockers[index];
    }

    //removeLocker(id)
    //
    //This function is for removing the locker whose id is passed. I have used a for loop to find that locker whose id is as passed. When that locker is found, I'm using splice for removing the
    //locker of that index whose id is equal to the passed id and there is only 1 item to remove from lockers array.
    //
    //returns: This function returns nothing.
    removeLocker(id) {
        for (let i = 0; i < this.count; i++) {
            if (this._lockers[i].id == id) {
                this._lockers.splice(i, 1);
            }
        }
    }

    // fromData(data)
    //
    //This function to do the following:
    //Empty out the array of lockers in the Lockerlist instance. For each item (Locker instance) in the array, making a new Locker instance to hold the data.
    //Calling the fromData method and pass it the data for this item. Add the newly made Locker to the array, lockers.
    //
    // returns: This functions returns nothing.
    fromData(data) {
        //a variable to hold just the array
        let dataObject = data._lockers; //storing the array of lockers into a variable dataObject
        this._lockers = [];
        for (let i = 0; i < dataObject.length; i++) {
            let newLocker = new Locker();
            newLocker.fromData(dataObject[i]); // the data for this locker is dataObject[i]
            this._lockers.push(newLocker); // using array push method to add to array
        }
    }
}

// checkIfDataExistsLocalStorage()
//
//This function is responsible for checking to see if data exists in local storage at the defined key.I have first retrieved the data at the key LOCKER_DATA_KEY and then check to see if it:
//exists, contains null, contains undefined, contains a blank string.
//
//returns: This functions return true if it exists and doesn't contain any of the above. Otherwise, it returns false.
function checkIfDataExistsLocalStorage() {
    if (typeof (Storage) !== "undefined") {
        let locker_data_key_retrieve = localStorage.getItem(LOCKER_DATA_KEY);
        if (typeof locker_data_key_retrieve != "undefined" && locker_data_key_retrieve != "" && locker_data_key_retrieve != null) {
            return true;
        }
        else {
            return false;
        }
    }
}

//updateLocalStorage(data)
//
//This function to call whenever we make any changes to the data, and will use it to update the 'backup' in local storage. I have done this  by stringifying the data, then storing it in localstorage
//using the key LOCKER_DATA_KEY and setting the new string into localstorage's LOCKER_DATA_KEY.
//
//returns: This function returns nothing.
function updateLocalStorage(data) {
    let convertingObject = JSON.stringify(data);
    localStorage.setItem(LOCKER_DATA_KEY, convertingObject);
}

//getDataLocalStorage()
//
//This function is responsible for retrieving data from local storage at the key LOCKER_DATA_KEY and storing it in a variable locker_data_key_retrieve. 
//I have done this by retrieving the data using the key LOCKER_DATA_KEY, parsing it back into an object, then returning it.
//
//returns: the parsed object, Locker.
function getDataLocalStorage() {
    let locker_data_key_retrieve = localStorage.getItem(LOCKER_DATA_KEY);
    if (checkIfDataExistsLocalStorage()) {
        let Locker = JSON.parse(locker_data_key_retrieve);
        return Locker;
    }
}

// Global LockerList instance variable
let lockers = new LockerList();

// code that will run on load here
// When the page loads, I have checked if data exists at the key LOCKER_DATA_KEY in local storage.
// If data exists, I have retrieved it using getDataLocalStorage and restore the data into the global LockerList instance variable lockers.
// If it doesn't exist, then add a single locker with the ID "A001", and update local storage with the LockerList.
if (checkIfDataExistsLocalStorage()) {
    let locker = getDataLocalStorage();
    lockers.fromData(locker);
}
else {
    lockers.addLocker("A001");
    updateLocalStorage(lockers);
}