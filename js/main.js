var anekdotesObj;

fetch("../json/anekdots.json")
	.then(function (response) {
		return response.json();
	})
	.then(function (json) {
		anekdotesObj = json;
	})
	.catch(function (err) {
		console.log('error: ' + err);
    })

function sendMail() {
    var link = "mailto:me@example.com"
             + "?cc=myCCaddress@example.com"
             + "&subject=" + encodeURIComponent("This is my subject")
             + "&body=" + 'myText'
    ;
    
    window.location.href = link;
}


function burgerOpen() {
	document.querySelector(".burger-button").classList.toggle("active");
	document.querySelectorAll(".registration")[0].classList.toggle("active");
	document.querySelectorAll(".registration")[1].classList.toggle("active");
}

function loadCat(cat)
{
	let sectionGridElem = document.querySelector(".section.grid");
	sectionGridElem.innerHTML = "";
	for (let i = 0; i < anekdotesObj.length; i++)
	{
		var div
		if (cat == anekdotesObj[i].category){
			div = `
			<div class="anek">
				<div class="name">
					${anekdotesObj[i].name}
				</div>
				<div class="content">
					${anekdotesObj[i].content}
				</div>
			</div>
			`;
			sectionGridElem.insertAdjacentHTML("beforeend", div)
		}
		 
	}
}



let form = document.querySelector("form");

var errorLog = (areaElement, errorText = "") => {
	let input = areaElement.querySelector("input");
	if (errorText.length == "")
	{
		areaElement.querySelector(".error").innerHTML = errorText;
		input.style = "border: solid #0A5;";
	} else {
		areaElement.querySelector(".error").innerHTML = errorText;
		input.style = "border: solid #E00;";
	}
}

var userdata = [];

form.addEventListener("submit", (e) => {
	e.preventDefault();
	
	var areas = document.querySelectorAll(".fill-area")
	let password = areas[2].querySelector("input").value
	
	var counter = 0;
	
	if (areas[0].querySelector("input").value.trim().length < 4){
		errorLog(areas[0], "Минимум 4 символа");
	} else {
		errorLog(areas[0]);
		localStorage.setItem("login", document.querySelector("input#user-name").value);
		counter ++;
	}
	
	if (areas[1].querySelector("input").value.trim().length < 4){
		errorLog(areas[1], "Минимум 4 символа");
	} else {
		errorLog(areas[1]);
		localStorage.setItem("email", document.querySelector("input#Email").value);
		counter ++;
	}

	if (password.trim().length < 8)	//Длина пароля
	{
		errorLog(areas[2], "Ваш пароль недостаточно длинный");
	} else if (password == password.toLowerCase()){
		errorLog(areas[2], "Добавьте буквы верхнего регистра")
	} else if (password == password.toUpperCase()){
		errorLog(areas[2], "Добавьте буквы нижнего регистра")
	} else if (!(/[0-9]/.test(password))){
		errorLog(areas[2], "Добавьте цифры")
	} else {
		errorLog(areas[2])
		localStorage.setItem("password", document.querySelector("input#Password").value);
		counter ++;
	}
	if (counter == 3) {
		document.querySelector(".registration.window").innerHTML = `
		<div> Добро пожаловать!
		<h3>${localStorage.getItem("login")}</h3>
		В скором времени на вашу почту 
		<wa style="color: #059; font-weight: bold;">${localStorage.getItem("email")}</wa>
		будет выслано письмо для подтверждения аккаунта </div>`;
		// sendMail();
	}

});

