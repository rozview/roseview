import { rsv, DW, roseConfig } from "./roseviewsdk/roseview.core.js";

export function OnStart() {
	let layout = rsv.CreateLayout("linear", "top, vertical");

	let taglineDiv = rsv.HtmlEl(layout, "div", "center", DW, "fit-content");
	let tagline = rsv.HtmlEl(taglineDiv, "p");
	tagline.css`
    font-family: 'Archivo', sans-serif;
    
    font-style: normal;
    font-weight: 500;

    color: #213547;
    `;
	tagline.textContent = "The Framework For Staying In The Flow";
	rsv.AddLayout(layout);
	roseConfig.Title = "roseview Framework";
}
