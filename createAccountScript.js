
function storeAccountInfo()
{
	var screenName, userName, fName, lName, email, password;

	screenName = document.getElementById("screenName").value;
	userName = document.getElementById("email").value;
	fName = document.getElementById("fName").value;
	lName = document.getElementById("lName").value;
	email = document.getElementById("email").value;

	if (document.getElementById("password").value === 
		document.getElementById("passwordRepeat").value)
	{
			password = document.getElementById("password").value;
	}

	if (screenName != "" || 
		userName != "" ||
		fName != "" ||
		lName != "" ||
		email != "" ||
		password != "" ||
		password != undefined)
	{
		addUserToDB(screenName, userName, fName, lName, email, password)
	}

	//Test
 		console.log("screenName: "+screenName);
		console.log("userName: "+userName);
		console.log("fName: "+fName);
		console.log("lName: "+lName);
		console.log("email: "+email);
		console.log("password: "+password);
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

function addUserToDB(screenName, userName, fName, lName, email, password)
{
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
		dataTyle: "json",
		success: function (msg) {
			alert("Might of worked! :)")
		},
		error: function (e) {
			alert("Probably didn't work :(")
		}
	})
}