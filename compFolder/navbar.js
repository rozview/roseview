import { rsv, roseComponent } from "../roseview/core.js";

const navbar = class extends roseComponent {
	constructor(parent) {
		super();

		this.element = rsv.AddHtmlEl(parent, "nav", "horizontal");

		this.element.css`
        background-color: #00000000;
        backdrop-filter: blur(1.5rem);
        width: 100%;
        height: 59px;
        top: 0;
        left: 0;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
        display: flex;
        z-index: 1000;
        position: fixed;
        flex-direction: row;
        align-items: center;
        padding: 0 20px; /* Add some padding for spacing */
        `;

		this.title = rsv.AddHtmlEl(this.element, "span");
		this.title.textContent = "viewml.js";
		this.title.css`
        font-family: "Archivo", sans-serif;
        font-weight: 700;
        font-size: 18px;
        text-decoration : uppercase;
        `;
	}
};

export default navbar;
