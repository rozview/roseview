import { rsv, roseConfig } from "../roseview/core.js";

roseConfig.Title = "roseView About";

export function OnStart() {
	let lay = rsv.CreateLayout("linear", "center");

	let info = rsv.AddHtmlEl(lay, "h2", "center");
	info.textContent = "About Page";

	let navigateBtn = rsv.AddHtmlEl(lay, "button");
	navigateBtn.textContent = "Go To Main";
	navigateBtn.onclick = () => {
		rsv.NavigateTo("main");
	};

	rsv.RenderApplication(lay);
}
