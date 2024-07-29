/**
 * roseview is a the framework that allows you to write ui functionaly, logically and in a simple manner.
 *
 * @license
 * MIT
 *
 * @version
 * 0.1.5
 */

let languageFilePromise = null;
let currentLang = null;

const $T = async (id, lang) => {
	if (window.languageFile) {
		return window.languageFile.translations[id][lang];
	} else if (languageFilePromise) {
		await languageFilePromise;
		return window.languageFile.translations[id][lang];
	} else {
		languageFilePromise = fetch("./lang.json")
			.then((response) => {
				if (!response.ok) {
					throw new Error("Cannot Load Translation Utility: " + response.status);
				}
				return response.json();
			})
			.then((json) => {
				window.languageFile = json;
				currentLang = window.languageFile.default;
				return json.translations[id][lang];
			})
			.catch((error) => {
				console.error("Error fetching the language file:", error);
				throw error;
			});

		return languageFilePromise;
	}
};

const lockOrientation = async (orient) => {
	try {
		await screen.orientation.lock(orient);
	} catch (err) {
		console.info(err);
	}
};

const roseComponent = class {
	constructor() {
		this.mounted = false;
		this.element = null;
		this.elementUid = null;
		this.eventListeners = [];
		this.elementProps = {
			IsVisible: true,
			IsAlive: true
		};
	}
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
			child.eventListeners.forEach((el) => {
				let [event, Fn] = el;
				child.element.removeEventListener(event, Fn);
			});

			child.element.remove();
			this.elementProps.IsAlive = false;
		} else {
			console.error("Child Is Not A roseComponent");
		}
	}

	set onContextMenu(Fn) {
		this.element.addEventListener("contextmenu", (event) => {
			this.eventListeners.push(["contextmenu", Fn]);
			event.preventDefault();
			Fn();
		});
	}

	set onTouch(Fn) {
		this.element.addEventListener("click", Fn);
		this.eventListeners.push(["click", Fn]);
	}

	set onLongTouch(Fn) {
		let touchTimeout;
		this.element.addEventListener("touchstart", (event) => {
			if (event.touches.length === 1) {
				touchTimeout = setTimeout(() => Fn(event), 600);
			}
		});

		this.element.addEventListener("touchend", () => {
			clearTimeout(touchTimeout);
		});

		this.eventListeners.push(["touchstart", Fn]);
		this.eventListeners.push(["touchend", Fn]);
	}

	batchDOMUpdates(updatesAsObject) {
		Object.entries(updatesAsObject).forEach(([key, value]) => {
			requestAnimationFrame(() => {
				this.element[key] = value;
			});
		});
	}

	style(styles) {
		const className = cssObjectParser(styles);
		this.element.classList.add(className);
	}

	hide() {
		this.style({
			visibility: "hidden"
		});
		this.elementProps.IsVisible = false;
	}

	show() {
		this.style({
			visibility: "visible"
		});
		this.elementProps.IsVisible = true;
	}

	gone() {
		this.style({
			display: "none"
		});
		this.elementProps.IsVisible = false;
	}

	async setTranslation(id, lang) {
		this.element.setAttribute("data-translate-id", id);
		const translation = await $T(id, lang);
		this.element.textContent = translation;
	}
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
				} else if (key.startsWith("&:")) {
					// Handle pseudo-classes prefixed with "&:"
					const pseudoClass = key.replace("&", selector);
					nestedCssRules.push({ selector: pseudoClass, styles: value });
				} else {
					// Handle other nested selectors
					nestedCssRules.push({ selector: `${selector} ${key}`, styles: value });
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

const htmlContainer = (type, options) => {
	return new Container(type, options);
};

const Container = class extends roseComponent {
	constructor(type = "linear", options = "center") {
		super();

		this.element = document.createElement("div");

		type ? layoutFitApi(this.element, type, options) : null;
	}

	setChildMargins(left, top, right, bottom) {
		this.style({
			" *": {
				marginLeft: left,
				marginTop: top,
				marginRight: right,
				marginBottom: bottom
			}
		});
	}

	setMargins(left, top, right, bottom) {
		this.style({
			marginLeft: left,
			marginRight: right,
			marginTop: top,
			marginBottom: bottom
		});
	}
};

const htmlElement = (parent, element, options, props) => {
	return new Element(parent, element, options, props);
};

const Element = class extends roseComponent {
	constructor(parent, element, options, props = {}) {
		super();

		this.element = document.createElement(element);

		parent ? parent.addChild(this) : null;
		this.mounted = true;
		options ? optionsApi(this.element, options) : null;

		Object.entries(props).forEach(([key, value]) => {
			requestAnimationFrame(() => {
				this.element[key] = value;
			});
		});

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

const htmlPage = {
	App(mainLayout, routes) {
		window.pathHistory = [];
		document.addEventListener("DOMContentLoaded", () => {
			mainLayout.style({
				width: "100%",
				height: "100%"
			});
			let fragment = document.createDocumentFragment();
			fragment.appendChild(mainLayout.element);
			document.body.appendChild(fragment);
		});
	},

	OpenPage(path) {
		const script = document.htmlElement("script");
		script.src = `./routes/${path}.js`;
		script.type = "module";

		document.body.replaceChildren();
		document.body.appendChild(script);
	},

	async SwitchLang(lang) {
		currentLang = lang;
		const elements = document.querySelectorAll("[data-translate-id]");
		for (let element of elements) {
			const id = element.getAttribute("data-translate-id");
			$T(id, lang)
				.then((translation) => {
					element.textContent = translation;
				})
				.catch((error) => {
					element.textContent = "Error loading translation";
				});
		}
	},

	get Landscape() {
		lockOrientation("landscape");
		88;
		return "landscape";
	},
	get Portrait() {
		lockOrientation("portrait");
		return "portrait";
	},

	/**
	 * @param {string} title
	 */
	set Title(title) {
		document.title = title;
	},

	/**
	 * @param {any} path
	 */
	set Icon(path) {
		const link = document.querySelector("link[rel*='icon']") || document.htmlElement("link");
		link.type = "image/x-icon";
		link.rel = "shortcut icon";
		link.href = path;
		document.getElementsByTagName("head")[0].appendChild(link);
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
		.toLowerCase()
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
	} else if (layoutTYPE == "frame") {
		//TODO
	} else console.error("Unknown Layout ", layout);
}

const createSignal = function (defaultValue = null, subscriberFunc) {
	let internalValue = defaultValue;
	let subscription = [];

	if (!subscriberFunc) {
		console.error(`You have not specified a subscriber function`);
	} else {
		if (typeof subscriberFunc === "function") {
			subscription.push(subscriberFunc);
		} else {
			console.error(`The subscriber you have given is not a function`);
		}
	}

	const notify = () => {
		subscription.forEach((subscriber) => subscriber(internalValue));
	};

	const getValue = () => {
		return internalValue;
	};

	const setValue = (setterValue) => {
		internalValue = setterValue;
		notify();
	};

	return [getValue, setValue];
};

const showIf = (restingVal, child, fallback) => {
	if (typeof restingVal === "boolean") {
		if (restingVal) {
			child.show();
			fallback.gone();
		} else {
			child.gone();
			fallback.show();
		}
	} else {
		console.error(`showIf bound to a typeof value not boolean`);
	}
};

export { htmlPage, htmlContainer, htmlElement };
export { createSignal, showIf };
