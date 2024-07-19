import { rsv, roseComponent } from "../roseview/core.js";

/** CSS Code Made By ChatGPT */

const TonalButton = class extends roseComponent {
	constructor(parent) {
		super();
		this.element = rsv.AddHtmlEl(parent, "button");

		this.element.css`
        border: 2px solid #6200ea; /* Material design purple */
        color: #6200ea; /* Text color matching the border */
        background-color: transparent; /* Transparent background */
        font-family: "Archivo", sans-serif;
        font-weight: 500; /* Slightly bolder text for material design */
        font-size: 1rem;
        text-align: center;
        cursor: pointer;
        padding: 0.5rem 1rem; /* Padding for a better appearance */
        transition: background-color 0.3s, color 0.3s; /* Smooth transitions */

        &:hover {
            background-color: #6200ea; /* Purple background on hover */
            color: white; /* White text on hover */
        }

        &:active {
            background-color: #3700b3; /* Darker purple on click */
            border-color: #3700b3; /* Match border to background on click */
        }
        `;

		this.El = this.element.style;
	}
	/* Set props Method Into Your Custom Ui */
	props(textContent, width, height) {
		textContent ? (this.element.textContent = textContent) : null;
		width ? (this.El.width = width) : "fit-content";
		height ? (this.El.height = height) : "fit-content";
	}
};

export default TonalButton;
