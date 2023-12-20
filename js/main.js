var request = new XMLHttpRequest();
request.open("GET", "../json/main.json");
request.responseType = "json";
request.send();

request.onload = function () {
	var anekdotes = request.response;

	let anekGridElem = document.querySelector(".anek-grid");
	for (let i = 0; i < anekdotes.length; i++)
	{
		let div = `
		<div class="anek">
			<div class="name">
				${anekdotes[i].name}
			</div>
			<div class="content">
				${anekdotes[i].content}
			</div>
		</div>
		`;
		anekGridElem.insertAdjacentHTML("beforeend", div) 
	}

	console.log("Сохранённые данные:")
	console.log(localStorage.getItem("login"))
	console.log(localStorage.getItem("email"))
	console.log(localStorage.getItem("password"))
}

function accountVisibility(appear) {
	if (appear) {
		document.querySelector(".registration.window").style.display = "flex";
		document.querySelector(".registration.close").style.display = "block";
	} else {
		document.querySelector(".registration.window").style.display = "none";
		document.querySelector(".registration.close").style.display = "none";
	}
}

function sendMail() {
	var body = "Значаение";

	window.location.href = "mailto:ibw2003@mail.ru?subject=Happy New Year&body=" + body;
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

form.addEventListener("submit", (e) => {
	e.preventDefault();
	
	var areas = document.querySelectorAll(".fill-area")
	// console.log(areas.length)
	let password = areas[2].querySelector("input").value
	for (let i = areas.length - 1; i >= 0; i--)
	{

		// console.log(areas[i].querySelector("input").value.trim().length);
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
		localStorage.setItem("login", document.querySelector("input#user-name").value);
		localStorage.setItem("email", document.querySelector("input#Email").value);
		localStorage.setItem("password", document.querySelector("input#Password").value);
	}
});