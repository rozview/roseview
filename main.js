import { htmlPage, htmlContainer, htmlElement } from "roseview";
import { createSignal } from "roseview";

let layout = htmlContainer("linear", "vertical, center");
layout.setChildMargins(null, "0.2rem");

let style = {
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
};
for (let i = 0; i < 10000; i++) {
	if (i === 0) {
		console.log("Adding A thousand Buttons Via insertAdjacentElement:)");
		console.time("Button Creation Time");
	}

	if (i === 999) {
		console.timeEnd("Button Creation Time");
	}

	let button = htmlElement(layout, "button", null, {
		textContent: `Button No : ${i}`
	});
	button.style(style);
}

htmlPage.App(layout);

htmlPage.Title = "roseview Framework";
