﻿//
//createAccount.js
//
function storeAccountInfo() {

    //altert text needs to be changes

    var screenName, userName, fName, lName, email, password;

    screenName = document.getElementById("screenName").value;
    userName = document.getElementById("email").value;
    fName = document.getElementById("fName").value;
    lName = document.getElementById("lName").value;
    email = document.getElementById("email").value;

    if (document.getElementById("password").value ===
        document.getElementById("passwordRepeat").value) {
        password = document.getElementById("password").value;
    }

    //more validation should be done before calling 'addUserToDB' funcrion
    //email format
    //handle empty string different than undefined - allert message

    if (screenName === "" ||
        userName === "" ||
        fName === "" ||
        lName === "" ||
        email === "" ||
        password === "" ||
        password === undefined) {
        document.getElementById("password").value = "";
        document.getElementById("passwordRepeat").value = "";
        alert("No");
    }
    else {
        addUserToDB(screenName, userName, fName, lName, email, password);
        document.getElementById("screenName").value = "";
        document.getElementById("fName").value = "";
        document.getElementById("lName").value = "";
        document.getElementById("email").value = "";
        document.getElementById("password").value = "";
        document.getElementById("passwordRepeat").value = "";
    }
    /*
    //Test
    console.log("screenName: " + screenName);
    console.log("userName: " + userName);
    console.log("fName: " + fName);
    console.log("lName: " + lName);
    console.log("email: " + email);
    console.log("password: " + password);
    */
	/*
	var screenName = screenName.text;
  	var userName = email.text;
  	var fName = fName.text;
  	var lName = lName.text;
  	var email = email.text;
  
  	if (password.text == passwordRepeat.text){
    	var password = password.text;
  	}
	*/
}

function addUserToDB(screenName, userName, fName, lName, email, password) {

    //altert text needs to be changes

    var webMethod = "AccountServices.asmx/NewUserAccount";
    var parameters = "{\"screenName\":\"" + encodeURI(screenName) +
        "\",\"email\":\"" + encodeURI(email) +
        "\",\"firstName\":\"" + encodeURI(fName) +
        "\",\"lastName\":\"" + encodeURI(lName) +
        "\",\"password\":\"" + encodeURI(password) + "\"}";

    $.ajax({
        type: "POST",
        url: webMethod,
        data: parameters,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            alert("Might of worked! :)");
            //console.log(parameters);
        },
        error: function (e) {
            alert("Probably didn't work :(");
            //console.log(parameters);
        }
    });
}

//
//index.js
//
var accountArray;

function signIn(email, password) {

    if (email === "" ||
        password === "") {
        alert("Please fill in all text boxes");
        document.getElementById("password").value = "";

    }
    else {
        var webMethod = "../AccountServices.asmx/SignIn";
        var parameters = "{\"email\":\"" + encodeURI(email) + "\",\"password\":\"" + encodeURI(password) + "\"}";

        $.ajax({
            type: "POST",
            url: webMethod,
            data: parameters,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {
                if (msg.d.length > 0) {
                    accountArray = msg.d;
                    alert(accountArray.length);
                    //this will change
                    //need to load user information 
                    document.getElementById("email").value = "";
                    document.getElementById("password").value = "";
                    
                    window.open("../html/homePage.html", "_self");
                }
                else {
                    alert("Sign In Failed");
                    document.getElementById("password").value = "";
                }
            }
        });
    }
}


//
//map.js
//


//
//profile.js
//
/*
var currentAccount;

function loadAccountInfo(userId) {
    currentAccount = null;
    for (var i = 0; i < accountArray.length; i++) {}
}

function editAccountInfo() {

}

function deleteAccount() {

}

window.onload = loadAccountInfo();
*/

//
//homePage.js
//
//document.getElementById("name").innerHTML = homeArray[1];
