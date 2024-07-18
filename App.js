import { rsv, roseConfig } from "./roseview/core.js";

import TonalButton from "./compFolder/tonalButton.js";

roseConfig.Title = "roseView Framework";

export function OnStart() {
	let lay = rsv.CreateLayout("linear", "center");

	let btn = rsv.AddHtmlEl(lay, TonalButton);
	rsv.AddLayout(lay);
}
