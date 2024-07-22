/**
 * roseView Engine is a framework that allows you
 * to write ui declarativley.
 *
 *@author
 * Oarabile Koore
 *
 * @license
 * MIT
 */

const DW = window.innerWidth + "px";
const DH = window.innerHeight + "px";

const $Q = (a) => document.querySelector(a);

const $T = (id, lang) => {};

const $El = (a) => document.getElementById(a);

let animatelib = document.createElement("link");
animatelib.href = "./animate.min.css";
animatelib.rel = "text/stylesheet";

let tweenlib = document.createElement("script");
tweenlib.type = "script";
tweenlib.src = "./tween.min.js";
$Q("head").appendChild(animatelib);
$Q("head").appendChild(tweenlib);

const roseConfig = {
	get Landscape() {
		lockOrientation("landscape");
	},

	get Portrait() {
		lockOrientation("portrait");
	},

	set Title(title) {
		document.title = title;
	},

	set Icon(path) {}
};

const lockOrientation = (orient) => {
	try {
		screen.orientation.lock(orient);
	} catch (err) {
		console.info(err);
	}
};

const roseComponent = class {
	constructor() {
		this.mounted = false;
		this.element = null;
		this.elementUid = null;
		this.elementProps = {
			IsVisible: true,
			IsAlive: true
		};
	}

	/* ============= roseComponent Global Methods ===============*/

	/**
	 * Add a child to that element
	 * @param {InstanceType<roseComponent>} child
	 */
	addChild(child) {
		if (child instanceof roseComponent) {
			this.element.appendChild(child.element);
		} else {
			console.error("Mounted Child Is Not A roseComponent");
		}
	}

	/**
	 * Remove The Child
	 * @param {Object<roseComponent>} child
	 */
	removeChild(child) {
		if (child instanceof roseComponent) {
			child.element.remove();
			this.elementProps.IsAlive = false;
		} else {
			console.error("Child Is Not A roseComponent");
		}
	}

	/**
	 * Hide The Element
	 */
	hide() {
		this.element.style = this.css`
        visibility : hidden;`;
		this.elementProps.IsVisible = false;
	}

	/**
	 * Show The Element
	 */
	show() {
		this.element.style = this.css`
        visibility : visible;`;
		this.elementProps.IsVisible = true;
	}

	/**
	 * Set the visibility of this element
	 * so it takes no space in the layout
	 * and is hidden from view
	 */
	gone() {
		this.element.style = this.css`
        display : none;`;
		this.elementProps.IsVisible = false;
	}

	/**
	 * @returns boolean
	 */
	isVisible() {
		return Boolean(this.elementProps.IsVisible);
	}

	/**
	 * @returns boolean
	 */
	isAlive() {
		return Boolean(this.elementProps.IsAlive);
	}

	/**
	 * Add The InnerHTML Of That Element
	 * @param {htmlString} strings
	 */
	setHtml(strings, ...values) {
		let htmlString = strings.reduce((result, str, i) => {
			return result + str + (values[i] || "");
		}, "");
		this.element.innerHtml = htmlString;
	}

	/**
	 * Add Css Rules To That Element
	 * @param {object} styles
	 */
	setStyle(styles) {
		const className = cssObjectParser(styles);
		this.element.classList.add(className);
	}

	/** ====================== COMPONENT LIFECYCLE METHODS ======================  */
	onMount(Fn) {}

	onDismount(Fn) {}
};

const generateClassName = (() => {
	let counter = 0;
	return () => `rsv-class-${counter++}`;
})();

const cssObjectParser = (styles) => {
	const className = generateClassName();
	const styleSheet = document.styleSheets[0] || document.head.appendChild(document.createElement("style")).sheet;

	let cssString = "";
	let nestedCssRules = [];
	let mediaQueryRules = [];

	const parseStyles = (styles, selector) => {
		let baseStyles = "";
		Object.entries(styles).forEach(([key, value]) => {
			if (typeof value === "object") {
				if (key.startsWith("@")) {
					mediaQueryRules.push({ media: key, selector, styles: value });
				} else {
					/* For  pseudo-classes and nested selectors  */
					nestedCssRules.push({ selector: `${selector}${key}`, styles: value });
				}
			} else {
				baseStyles += `${key.replace(/([A-Z])/g, "-$1").toLowerCase()}: ${value}; `;
			}
		});
		return baseStyles;
	};

	cssString = parseStyles(styles, `.${className}`);

	if (cssString) {
		styleSheet.insertRule(`.${className} { ${cssString} }`, styleSheet.cssRules.length);
	}

	nestedCssRules.forEach(({ selector, styles }) => {
		const nestedCssString = parseStyles(styles, selector);
		if (nestedCssString) {
			const rule = `${selector} { ${nestedCssString} }`;
			styleSheet.insertRule(rule, styleSheet.cssRules.length);
		}
	});

	mediaQueryRules.forEach(({ media, selector, styles }) => {
		const nestedCssString = parseStyles(styles, selector);
		if (nestedCssString) {
			const rule = `${media} { ${selector} { ${nestedCssString} } }`;
			styleSheet.insertRule(rule, styleSheet.cssRules.length);
		}
	});

	return className;
};

/* =============== roseView Engine Exports  =============== */

const createLayout = (type, options) => {
	return new rsvLAYOUT(type, options);
};

const createElement = (parent, element, options, width, height) => {
	return new rsvHTMLELEMENT(parent, element, options, width, height);
};

const createApplication = (mainLayout, appRoutes) => {
	mainLayout.setStyle({
		width: "100%",
		height: "100%"
	});
	document.body.appendChild(mainLayout.element);
};

const rsvLAYOUT = class extends roseComponent {
	constructor(type = "linear", options = "center") {
		super();

		this.element = document.createElement("div");

		type ? layoutFitApi(this.element, type, options) : null;
	}
};

const rsvHTMLELEMENT = class extends roseComponent {
	constructor(parent, element, options, width, height) {
		super();

		this.element = document.createElement(element);

		parent ? parent.addChild(this) : null;
		this.mounted = true;
		options ? optionsApi(this.element, options) : null;

		width ? (this.element.style.width = width) : null;
		height ? (this.element.style.height = height) : null;

		return new Proxy(this, {
			get(target, prop) {
				if (prop in target) {
					return target[prop];
				} else {
					return target.element[prop];
				}
			},

			set(target, prop, value) {
				if (prop in target) {
					target[prop] = value;
				} else {
					target.element[prop] = value;
				}
				return true;
			}
		});
	}
};

let viewOptions = ["top", "bottom", "left", "right", "horizontal", "vertical", "vcenter", "center"];

const optionsApi = (element, options) => {
	const functions = {
		left: () => {
			let className = cssObjectParser({
				display: "flex",
				justifyContent: "flex-start"
			});
			element.classList.add(className);
		},
		right: () => {
			let className = cssObjectParser({
				display: "flex",
				justifyContent: "flex-end"
			});
			element.classList.add(className);
		},
		center: () => {
			let className = cssObjectParser({
				display: "flex",
				alignItems: "center",
				justifyContent: "center"
			});
			element.classList.add(className);
		},
		vcenter: () => {
			let className = cssObjectParser({
				display: "flex",
				justifyContent: "center",
				alignItems: "center"
			});
			element.classList.add(className);
		},
		bottom: () => {
			let className = cssObjectParser({
				display: "flex",
				alignItems: "flex-end"
			});
			element.classList.add(className);
		},
		top: () => {
			let className = cssObjectParser({
				display: "flex",
				alignItems: "flex-start"
			});
			element.classList.add(className);
		},
		horizontal: () => {
			let className = cssObjectParser({
				display: "flex",
				flexDirection: "row"
			});
			element.classList.add(className);
		},
		vertical: () => {
			let className = cssObjectParser({
				display: "flex",
				flexDirection: "column"
			});
			element.classList.add(className);
		}
	};

	options
		.toLocaleLowerCase()
		.replace(/\s/g, "")
		.split(",")
		.forEach((el) => {
			if (viewOptions.includes(el)) {
				functions[el]();
			} else {
				console.error(`Unknown option: ${el}`);
			}
		});
};

function layoutFitApi(layout, type, options) {
	options ? optionsApi(layout, options) : null;

	let layoutTYPE = type.toLowerCase();

	if (layoutTYPE == "linear") {
		let className = cssObjectParser({
			display: "flex"
		});
		layout.classList.add(className);
	} else console.error("Unknown Layout ", layout);
}

export { DW, DH, $Q, $T, $El, roseConfig, createLayout, createElement, createApplication };
