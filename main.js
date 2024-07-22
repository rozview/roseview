import { createLayout, createElement, createApplication, roseConfig } from "./roseviewsdk/roseview.core.js";

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
		marginLeft: "80px"
	});

	let contentLay = createLayout("linear", "top, vcenter");
	layout.addChild(contentLay);

	contentLay.setStyle({
		width: "100%",
		height: "fit-content"
	});

	let taglineDiv = createElement(contentLay, "div", "center,vertical");
	taglineDiv.id = "taglineDiv";
	taglineDiv.setStyle({
		width: "100%",
		height: "fit-content"
	});

	let tagline = createElement(taglineDiv, "h1");
	tagline.id = "tagline";
	tagline.textContent = "The Framework For Staying In The Flow";
	tagline.setStyle({
		fontFamily: "'Archivo', sans-serif",
		fontSize: "48px",
		fontWeight: 500,
		color: "#213547"
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

	createApplication(layout);

	roseConfig.globalStyle`
        @media (max-width: 794px) {
            #navTitle {
                margin-left: 25px;
            }
            #taglineDiv {
                width: 80%;
            }
            #tagline { 
                font-size: 48px;
                letter-spacing: -.5px;
            }
        }
    `;

	roseConfig.Title = "roseview Framework";
}
