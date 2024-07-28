import { htmlPage, htmlContainer, htmlElement } from "roseview";
import { createSignal, showIf } from "roseview";

let v = true;

let [getTheme, setTheme] = createSignal("light", (val) => {
	button.batchDOMUpdates({
		textContent: `The new theme is : ${getTheme()}`
	});
});

let layout = htmlContainer("linear", "center");

let button = htmlElement(layout, "button", null, {
	sumStupid: "hi",
	textContent: getTheme()
});

button.onTouch = () => {
	setTheme("dark");
};

let buttonB = htmlElement(layout, "button", null, {
	sumStupid: "hi",
	textContent: "Damn Some Is False"
});

showIf(v, button, buttonB);

button.style({
	width: "180px",
	height: "auto",
	backgroundColor: "coral",
	color: "white",
	border: "none",
	borderRadius: "4px",
	padding: "12px 24px",
	fontSize: "16px",
	cursor: "pointer",
	transition: "background-color 0.3s, box-shadow 0.3s",

	"&:hover": {
		backgroundColor: "darkorange",
		boxShadow: "0 6px 12px rgba(0, 0, 0, 0.2)"
	},

	"&:active": {
		transform: "translateY(2px)",
		backgroundColor: "#e07b5c",
		boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)"
	},

	"&:focus": {
		boxShadow: "0 0 0 2px rgba(255, 87, 34, 0.3)"
	}
});

console.log();
htmlPage.App(layout);

htmlPage.Title = "roseview Framework";
