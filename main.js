import { createLayout, createElement, createApplication, roseConfig } from "./roseviewsdk/roseview.core.js";

import outlinedButton from "./components/outlinedbtn.js";

export function OnStart() {
	let layout = createLayout("linear", "top,vertical");

	let navbar = createElement(layout, "nav", "vcenter, left");

	navbar.setStyle({
		backgroundColor: "rgba(255, 255, 255, 0.75)",
		borderBottom: "0.8px solid rgb(226, 232, 240)",
		backdropFilter: "blur(8px)",
		position: "sticky",
		zIndex: 50,
		width: "100%",
		height: "64px",
		top: 0
	});

	let navTitle = createElement(navbar, "span", null);
	navTitle.textContent = "roseView";
	navTitle.id = "navTitle";
	navTitle.setStyle({
		fontFamily: "'Playfair Display', serif",
		letterSpacing: "0.8px",
		fontSize: "1.2rem",
		fontWeight: 700,
		marginLeft: "80px",

		"@media (max-width: 794px)": {
			marginLeft: "25px"
		}
	});

	let contentLay = createLayout("linear", "top, vcenter, vertical");
	layout.addChild(contentLay);

	contentLay.setStyle({
		width: "100%",
		height: "fit-content"
	});

	let taglineDiv = createLayout("linear", "center,vertical");
	contentLay.addChild(taglineDiv);

	taglineDiv.id = "taglineDiv";
	taglineDiv.setStyle({
		width: "100%",
		height: "fit-content",

		"@media (max-width: 794px)": {
			width: "80%"
		}
	});

	let tagline = createElement(taglineDiv, "h1");
	tagline.id = "tagline";
	tagline.textContent = "The Framework For Staying In The Flow";
	tagline.setStyle({
		fontFamily: "'Archivo', sans-serif",
		fontSize: "48px",
		fontWeight: 500,
		color: "#213547",

		"@media (max-width: 794px)": {
			fontSize: "48px",
			letterSpacing: "-.5px"
		}
	});

	let miniTagline = createElement(taglineDiv, "p");
	miniTagline.id = "miniTagline";
	miniTagline.textContent = `A framework built for the best developer experience, for the best maintainability and predictability.`;
	miniTagline.setStyle({
		fontFamily: "'Archivo', sans-serif",
		fontSize: "1.2rem",
		fontWeight: 500,
		color: "#213547"
	});

	let whyRoseBtn = outlinedButton(contentLay, "why roseView ?", "180px", "auto");
	whyRoseBtn.setStyle({
		marginTop: "25px"
	});

	createApplication(layout);

	roseConfig.Title = "roseview Framework";
}
