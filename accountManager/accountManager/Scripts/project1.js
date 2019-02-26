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

}

//profile.html
//deleates user from DB
function deleteAccount() {

}

//createEvent.html
//empties all values and set date, time to current and accessibility to public
function defaultValues() {
    var today, now, month, day, time, hour, minute;

    document.getElementById("eName").value = "";
    document.getElementById("eType").value = "";
    document.getElementById("eCity").value = "";
    document.getElementById("eState").value = "";
    document.getElementById("eZip").value = "";
    document.getElementById("eAddress").value = "";
    document.getElementById("eDate").value = "";
    document.getElementById("eTime").value = "";
    document.getElementById("public").checked = true;
    document.getElementById("eDescription").value = "";
    document.getElementById("eCapacity").value = "";
    document.getElementById("eHost").value = "";

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

    hour = now.getHours() + 1;
    minute = now.getMinutes();
    if (hour < 10) {
        hour = "0" + hour;
    }
    if (hour === 24) {
        hour = "00";
    }
    if (minute < 10) {
        minute = "0" + minute;
    }
    time = hour + ":" + minute;

    //console.log(time);
    document.getElementById("eTime").value = time;
}

//createEvent.html
//stores event information from html
function storeEventInfo() {

    //altert text needs to be changes

    var eventName, eventType, city, state, zip, address, date, time, eAccessibility, accessibility, description, eventCapacity, eventHost;

    eventName = document.getElementById("eName").value;
    eventType = document.getElementById("eType").value;
    city = document.getElementById("eCity").value;
    state = document.getElementById("eState").value;
    zip = document.getElementById("eZip").value;
    address = document.getElementById("eAddress").value;
    date = document.getElementById("eDate").value;
    time = document.getElementById("eTime").value;
    eAccessibility = document.getElementsByName("eAccessibility");
    if (eAccessibility[0].checked) {
        accessibility = "0";
    }
    else if (eAccessibility[1].checked) {
        accessibility = "1";
    }
    description = document.getElementById("eDescription").value;
    eventCapacity = document.getElementById("eCapacity").value;
    eventHost = document.getElementById("eHost").value;

    if (eventName === "" ||
        eventType === "" ||
        city === "" ||
        state === "" ||
        address === "" ||
        date === "" ||
        time === "" ||
        accessibility === "" ||
        description === "" ||
        eventCapacity === "" ||
        eventHost === "") {
        alert("Please fill in all feilds");
    }
    else {
        addEventToDB(eventName, eventType, city, state, zip, address, date, time, accessibility, description, eventCapacity, eventHost);
        defaultValues();
    }
    /*
    //Test
    console.log("eventName: " + eventName);
    console.log("eventType: " + eventType);
    console.log("city: " + city);
    console.log("state: " + state);
    console.log("zip: " + zip);
    console.log("address: " + address);
    console.log("date: " + date);
    console.log("time: " + time);
    console.log("accessibility: " + accessibility);
    console.log("description: " + description);
    console.log("eventCapacity: " + eventCapacity);
    console.log("eventHost: " + eventHost);
    */
}

//createEvent.html
//add Event to DB with info from html
function addEventToDB(eventName, eventType, city, state, zip, address, date, time, accessibility, description, eventCapacity, eventHost) {

    //altert text needs to be changes

    var storedParam = localStorage.getItem("userId");

    var webMethod = "../AccountServices.asmx/NewEvent";
    var parameters = "{\"userId\":\"" + encodeURI(storedParam) +
        "\",\"eName\":\"" + encodeURI(eventName) +
        "\",\"eType\":\"" + encodeURI(eventType) +
        "\",\"eCity\":\"" + encodeURI(city) +
        "\",\"eState\":\"" + encodeURI(state) +
        "\",\"eZip\":\"" + encodeURI(zip) +
        "\",\"eAddress\":\"" + encodeURI(address) +
        "\",\"eDate\":\"" + encodeURI(date) +
        "\",\"eTime\":\"" + encodeURI(time) +
        "\",\"eAccessibility\":\"" + encodeURI(accessibility) +
        "\",\"eDescription\":\"" + encodeURI(description) +
        "\",\"eCapacity\":\"" + encodeURI(eventCapacity) +
        "\",\"eHost\":\"" + encodeURI(eventHost) + "\"}";

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
function SignOut() {
    var webMethod = "../AccountServices.asmx/SignOut";
    $.ajax({
        type: "POST",
        url: webMethod,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            if (msg.d) {
                window.open("../html/index.html", "_self");
            }
        },
        error: function (e) {
            alert("Sign Out Failed.");
        }
    });
}