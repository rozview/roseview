import { rsv, roseConfig } from "./roseview/core.js";

roseConfig.Title = "roseView Framework";

export function OnStart() {
	let lay = rsv.CreateLayout("linear", "top,vertical");

	rsv.AddLayout(lay);
}
