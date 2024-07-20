/**
 * roseView Engine is the web version of DroidScript
 * Native Engine
 *
 * It allows you to write DroidScript native code
 * and build apps, just change the app* call to
 * rsv*
 *
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

let mainstyle = document.createElement("style");
mainstyle.id = "styles";
$Q("head").appendChild(mainstyle);

const $Stl = document.getElementById("styles");

const roseConfig = {
	get Landscape() {
		lockOrientation("landscape");
	},

	get Portrait() {
		lockOrientation("portrait");
	},

	/**
	 * Sets Document Title
	 */
	set Title(title) {
		document.title = title;
	},

	/**
	 * Sets the global css great for media queries
	 * @param {*} strings
	 * @param  {...any} values
	 */
	globalStyle(strings, ...values) {
		let cssString = strings.reduce((result, str, i) => {
			return result + str + (values[i] || "");
		}, "");

		$Stl.innerHTML += cssString;
	}
};

const lockOrientation = (orient) => {
	try {
		screen.orientation.lock(orient);
	} catch (err) {
		console.info(err);
	}
};

const $UId = () => {
	const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
	let uid = "";
	for (let i = 0; i < 7; i++) {
		uid += chars.charAt(Math.floor(Math.random() * chars.length));
	}
	return uid;
};

const css = (strings, ...values) => {
	let cssString = strings.reduce((result, str, i) => {
		return result + str + (values[i] || "");
	}, "");
	return cssString;
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
	AddChild(child) {
		if (child instanceof roseComponent) {
			this.element.appendChild(child.element);
		} else {
			console.error("Mounted Child Is Not A roseComponent");
		}
	}

	/**
	 * Add Css To That Element
	 * @param {css} strings
	 */
	css(strings, ...values) {
		let cssString = strings.reduce((result, str, i) => {
			return result + str + (values[i] || "");
		}, "");

		/* classname is equal to some random id */
		let uid;
		uid = $UId();

		let classSTYLE = `.${uid} {
            ${cssString}
        }`;

		$Stl.innerHTML += classSTYLE;
		this.element.classList.add(`${uid}`);
	}

	/**
	 * Add The InnerHTML Of That Element
	 * @param {htmlString} strings
	 */
	SetHtml(strings, ...values) {
		let htmlString = strings.reduce((result, str, i) => {
			return result + str + (values[i] || "");
		}, "");
		this.element.innerHtml = htmlString;
	}

	/**
	 * Remove The Child
	 * @param {Object<roseComponent>} child
	 */
	RemoveChild(child) {
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
	Hide() {
		this.element.style = this.css`
        visibility : hidden;`;
		this.elementProps.IsVisible = false;
	}

	/**
	 * Show The Element
	 */
	Show() {
		this.element.style = this.css`
        visibility : visible;`;
		this.elementProps.IsVisible = true;
	}

	/**
	 * Set the visibility of this element
	 * so it takes no space in the layout
	 * and is hidden from view
	 */
	Gone() {
		this.element.style = this.css`
        display : none;`;
		this.elementProps.IsVisible = false;
	}

	/**
	 * Set the visibility of this element
	 * can be : visible or hidden
	 * @param {string} mode
	 */
	SetVisibility(mode) {
		if (mode.toLowerCase() == "show") {
			this.element.style = this.css`
			visibility : visible;`;
			this.elementProps.IsVisible = true;
		}
		if (mode.toLowerCase() == "hide") {
			this.element.style = this.css`
			visibility : hidden;`;
			this.elementProps.IsVisible = true;
		} else {
			this.element.style = this.css`
			display : none;`;
			this.elementProps.IsVisible = false;
		}
	}

	/**
	 * @returns boolean
	 */
	IsVisible() {
		return Boolean(this.elementProps.IsVisible);
	}

	/**
	 * @returns boolean
	 */
	IsAlive() {
		return Boolean(this.elementProps.IsAlive);
	}

	SetSize(width, height) {
		this.css`
		width: ${width};
		height: ${height};
		`;
	}

	SetMargins(left, top, right, bottom) {
		this.css`
		margin-left: ${left};
		margin-top: ${top};
		margin-right: ${right};
		margin-bottom: ${bottom};
		`;
	}

	SetChildMargins(left, top, right, bottom) {
		let cssString = css`
			margin-left: ${left};
			margin-top: ${top};
			margin-right: ${right};
			margin-bottom: ${bottom};
		`;
		let classname = $UId();
		let classSTYLE = `.${classname} * { ${cssString} }`;
		$Stl.innerHTML += classSTYLE;
		this.element.classList.add(classname);
	}

	SetPadding(left, top, right, bottom) {
		this.css`
		padding-left: ${left};
		padding-top: ${top};
		padding-right: ${right};
		padding-bottom: ${bottom};
		`;
	}

	SetBackColor(color) {
		this.css`
	    background-color : ${color}`;
	}

	OnMount(Fn) {
		this.mounted ? Fn() : null;
	}
};

/* =============== roseView Engine Global Object =============== */

const rsv = new (function () {
	this.CreateLayout = (type, options) => {
		return new rsvLAYOUT(type, options);
	};

	this.HtmlEl = (parent, element, options, width, height) => {
		if (typeof element === "function") {
			return new element(parent, options, width, height);
		} else {
			return new rsvHTMLELEMENT(parent, element, options, width, height);
		}
	};

	this.AddLayout = (layout, type, options) => {
		layout.css`
        width: 100%;
        height: 100%;
        `;
		document.body.appendChild(layout.element);
	};
})();

const rsvLAYOUT = class extends roseComponent {
	constructor(type = "linear", options = "center") {
		super();

		this.element = document.createElement("div");

		type ? layoutFitApi(this.element, type, options) : null;
	}

	SetPosition(left, top, width, height) {
		// TODO
	}
};

const rsvHTMLELEMENT = class extends roseComponent {
	constructor(parent, element, options, width, height) {
		super();

		this.element = document.createElement(element);

		parent ? parent.AddChild(this) : null;
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
			let cssString = css`
				display: flex;
				justify-content: flex-start;
			`;
			let classname = $UId();
			let classSTYLE = `.${classname} { ${cssString} }`;
			$Stl.innerHTML += classSTYLE;
			element.classList.add(classname);
		},
		right: () => {
			let cssString = css`
				display: flex;
				justify-content: flex-end;
			`;
			let classname = $UId();
			let classSTYLE = `.${classname} { ${cssString} }`;
			$Stl.innerHTML += classSTYLE;
			element.classList.add(classname);
		},
		center: () => {
			let cssString = css`
				display: flex;
				align-items: center;
				justify-content: center;
			`;
			let classname = $UId();
			let classSTYLE = `.${classname} { ${cssString} }`;
			$Stl.innerHTML += classSTYLE;
			element.classList.add(classname);
		},
		vcenter: () => {
			let cssString = css`
				display: flex;
				justify-content: center; /* Horizontal alignment */
				align-items: center; /* Vertical alignment */
			`;
			let classname = $UId();
			let classSTYLE = `.${classname} { ${cssString} }`;
			$Stl.innerHTML += classSTYLE;
			element.classList.add(classname);
		},
		bottom: () => {
			let cssString = css`
				display: flex;
				align-items: flex-end;
			`;
			let classname = $UId();
			let classSTYLE = `.${classname} { ${cssString} }`;
			$Stl.innerHTML += classSTYLE;
			element.classList.add(classname);
		},
		top: () => {
			let cssString = css`
				display: flex;
				align-items: flex-start;
			`;
			let classname = $UId();
			let classSTYLE = `.${classname} { ${cssString} }`;
			$Stl.innerHTML += classSTYLE;
			element.classList.add(classname);
		},
		horizontal: () => {
			let cssString = css`
				display: flex;
				flex-direction: row;
			`;
			let classname = $UId();
			let classSTYLE = `.${classname} { ${cssString} }`;
			$Stl.innerHTML += classSTYLE;
			element.classList.add(classname);
		},
		vertical: () => {
			let cssString = css`
				display: flex;
				flex-direction: column;
			`;
			let classname = $UId();
			let classSTYLE = `.${classname} { ${cssString} }`;
			$Stl.innerHTML += classSTYLE;
			element.classList.add(classname);
		}
	};

	options
		.toLocaleLowerCase()
		.replace(/\s/, "")
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
		layout.style = css`
			display: flex;
		`;
	} else if (layoutTYPE == "card") {
		layout.style.padding = "10px";
		layout.style.borderRadius = "5px";
	} else if (layoutTYPE == "frame") {
		layout.style.position = "relative";
	} else if (layoutTYPE == "absolute") {
		layout.style.position = "absolute";
	} else console.error("Unknown Layout ", layout);
}

export { DW, DH, $Q, $T, $El, $Stl, $UId, rsv, roseConfig, roseComponent };
