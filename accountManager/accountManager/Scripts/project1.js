var accountArray;

//createAccount.html
//stores user information from html
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
}

//createAccount.html
//sends html user info to server to create new user in DB
function addUserToDB(screenName, userName, fName, lName, email, password) {

    //altert text needs to be changes

    var webMethod = "../AccountServices.asmx/NewUserAccount";
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

//index.html
//checks DB for email and password and stores userId in localStorage for reference on other html pages
function signIn(email, password) {

    if (email === "" ||
        password === "") {
        alert("Please fill in all text boxes");
        document.getElementById("password").value = "";
    }
    else {
        var webMethod = "../AccountServices.asmx/SignIn";
        var parameters = "{\"email\":\"" + encodeURI(email) +
            "\",\"password\":\"" + encodeURI(password) + "\"}";

        $.ajax({
            type: "POST",
            url: webMethod,
            data: parameters,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {
                if (msg.d.length > 0) {
                    accountArray = msg.d;
                    localStorage.setItem("userId", accountArray[0].userId);
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

//homePage.html
//retreives user info from DB to display screenName in the header
function LoadHomePage() {
    var storedParam = localStorage.getItem("userId");

    var webMethod = "../AccountServices.asmx/GetAccount";
    var parameters = "{\"userId\":\"" + encodeURI(storedParam) + "\"}";

    $.ajax({
        type: "POST",
        url: webMethod,
        data: parameters,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            if (msg.d.length > 0) {
                accountArray = msg.d;
                for (var i = 0; i < accountArray.length; i++) {
                    var acct;
                    if (accountArray[i].screenName !== null) {
                        document.getElementById("sName").innerHTML = accountArray[i].screenName;
                    }
                }
            }
        }
    });
}

//profile.html
//loads user info to edited
function loadAccountInfo() {
    var storedParam = localStorage.getItem("userId");
    var webMethod = "../AccountServices.asmx/GetAccount";
    var parameters = "{\"userId\":\"" + encodeURI(storedParam) + "\"}";

    $.ajax({
        type: "POST",
        url: webMethod,
        data: parameters,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            if (msg.d.length > 0) {
                accountArray = msg.d;
                for (var i = 0; i < accountArray.length; i++) {
                    var acct;
                    if (accountArray[i].screenName !== null) {
                        document.getElementById("fName").value = accountArray[i].firstName;
                        document.getElementById("lName").value = accountArray[i].lastName;
                        document.getElementById("screenName").value = accountArray[i].screenName;
                        document.getElementById("email").value = accountArray[i].email;
                        document.getElementById("password").value = accountArray[i].password;
                    }
                }
            }
        }
    });
}

//profile.html
//updates the user info in the DB
function editAccountInfo() {
    var fName, lName, screenName, email, password;

    fName = document.getElementById("fName").value;
    lName = document.getElementById("lName").value;
    screenName = document.getElementById("screenName").value;
    email = document.getElementById("email").value;
    password = document.getElementById("password").value;

    var storedParam = localStorage.getItem("userId");
    var webMethod = "../AccountServices.asmx/EditUser";
    var parameters = "{\"userId\":\"" + encodeURI(storedParam) +
                     "\",\"firstName\":\"" + encodeURI(fName) +
                     "\",\"lastName\":\"" + encodeURI(lName) +
                     "\",\"screenName\":\"" + encodeURI(screenName) +
                     "\",\"email\":\"" + encodeURI(email) +
                     "\",\"password\":\"" + encodeURI(password) + "\"}";

    $.ajax({
        type: "POST",
        url: webMethod,
        data: parameters,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            loadAccountInfo();
        }
    });
}

//profile.html
//deleates user from DB
function deleteAccount() {
    var storedParam = localStorage.getItem("userId");
    var webMethod = "../AccountServices.asmx/DeleateUser";
    var parameters = "{\"userId\":\"" + encodeURI(storedParam) + "\"}";

    $.ajax({
        type: "POST",
        url: webMethod,
        data: parameters,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            signOut();
        }
    });
}

//createEvent.html
//empties all values and set date, time to current and accessibility to public
function defaultValues() {
    var today, now, month, day;

    document.getElementById("eDate").value = "";
    document.getElementById("eDescription").value = "";

    now = new Date();
    month = now.getMonth() + 1;
    day = now.getDate();
    if (month < 10) {
        month = "0" + month;
    }
    if (day < 10) {
        day = "0" + day;
    }
    today = now.getFullYear() + "-" + month + "-" + day;

    //console.log(today);
    document.getElementById("eDate").value = today;
}

//createEvent.html
//stores event information from html
function storeEventInfo() {

    //altert text needs to be changes

    var date, description;

    date = document.getElementById("eDate").value;
    description = document.getElementById("eDescription").value;
    
    if (date === "" ||
        description === "" ){
        alert("Please fill in all feilds");
    }
    else {
        addEventToDB(date, description);
        defaultValues();
    }
    /*
    //Test
    console.log("date: " + date);
    console.log("description: " + description);
    */
}

//createEvent.html
//add Event to DB with info from html
function addEventToDB(date, description) {

    //altert text needs to be changes

    var webMethod = "../AccountServices.asmx/NewEvent";
    var parameters = "{\"eDate\":\"" + encodeURI(date) +
                     "\",\"eDescription\":\"" + encodeURI(description) + "\"}";

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

//index.html, homePage.html, profile.html
//signs user out
function signOut() {
    var storedParam = localStorage.getItem("userId");
    if (storedParam !== null) {
        var webMethod = "../AccountServices.asmx/SignOut";
        $.ajax({
            type: "POST",
            url: webMethod,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {
                if (msg.d) {
                    localStorage.clear();
                    window.open("../html/index.html", "_self");
                }
            },
            error: function (e) {
                alert("Sign Out Failed.");
            }
        });
    }
}