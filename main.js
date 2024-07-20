import { rsv, $Q, roseConfig } from "./roseviewsdk/roseview.core.js";

import { annotate } from "https://unpkg.com/rough-notation?module";

export function OnStart() {
	let layout = rsv.CreateLayout("linear", "top,vertical");

	let navbar = rsv.HtmlEl(layout, "nav", "vcenter, left");

	navbar.css`
    background-color: rgb(255 255 255 / 75%);
    border-bottom-color: rgb(226, 232, 240);
    border-bottom-width: 0.8px;
    border-bottom-style: solid;
    backdrop-filter: blur(8px);
    position: sticky;
    z-index: 50;
    width: 100%;
    height: 64px;
    top: 0;
    `;

	let navTitle = rsv.HtmlEl(navbar, "span", null);
	navTitle.textContent = "roseView";
	navTitle.id = "navTitle";
	navTitle.css`
    font-family: 'Playfair Display', serif;
    letter-spacing: 0.8px;
    font-size: 1.2rem;
    font-style: normal;
    font-weight: 700;
    margin-left: 80px;
    `;

	let contentLay = rsv.CreateLayout("linear", "top, vcenter");
	layout.AddChild(contentLay);

	contentLay.css`
    width: 100%;
    height: fit-content;`;

	let taglineDiv = rsv.HtmlEl(contentLay, "div", "center,vertical");
	taglineDiv.id = "taglineDiv";
	taglineDiv.css`
    width: 100%;
    height: fit-content;`;

	let tagline = rsv.HtmlEl(taglineDiv, "h1");
	tagline.id = "tagline";
	tagline.css`
    font-family: 'Archivo', sans-serif;
    font-size: 48px;
    font-style: normal;
    font-weight: 500;
    color: #213547;
    `;

	tagline.textContent = "The Framework For Staying In The Flow";

	let miniTagline = rsv.HtmlEl(taglineDiv, "p");
	miniTagline.id = "miniTagline";

	miniTagline.textContent = `A framework built for the best developer experience, for the best maintainability and predictability.`;
	miniTagline.css`
    font-family: 'Archivo', sans-serif;
    font-size: 1.2rem;
    font-style: normal;
    font-weight: 500;
    color: #213547;
    `;
	setTimeout(() => {
		let annotation = annotate($Q("#miniTagline"), { type: "underline" });
		annotation.show();
	}, 1500);

	rsv.AddLayout(layout);

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
    }`;

	roseConfig.Title = "roseview Framework";
}
