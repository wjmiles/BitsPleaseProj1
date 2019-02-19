var accountArray;
var shit = "shit";

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
                    window.open("../html/homePage.html", "_self");
                    document.getElementById("email").value = "";
                    document.getElementById("password").value = "";
                }
                else {
                    alert("Sign In Failed");
                    document.getElementById("password").value = "";
                }
            }
        });
    }
}