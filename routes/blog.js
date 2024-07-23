import { createPage, roseConfig, createElement, createLayout } from "../roseviewsdk/roseview.core.js";

const Page = function () {
	let main = createLayout("linear", "center");

	let helloTxt = createElement(main, "h1", null);
	helloTxt.textContent = "Hello, This Is Our Blog";
	helloTxt.onclick = function () {
		roseConfig.OpenPage("about");
	};
	createPage(main);
};
Page();
