import { createElement } from "../roseviewsdk/roseview.core.js";

const OutlinedButton = function (parent, text, width, height) {
	let btn = createElement(parent, "button", null, width, height);
	text ? (btn.textContent = text) : null;
	btn.setStyle({
		border: "2px solid #6200ea",
		color: "#6200ea",
		backgroundColor: "transparent",
		fontFamily: "'Archivo', sans-serif",
		fontWeight: 500,
		fontSize: "1rem",
		textAlign: "center",
		cursor: "pointer",
		padding: "0.5rem 1rem",
		transition: "background-color 0.3s, color 0.3s",

		":hover": {
			backgroundColor: "#6200ea",
			color: "white"
		},
		":active": {
			backgroundColor: "#3700b3",
			borderColor: "#3700b3"
		}
	});
	return btn;
};

export default OutlinedButton;
