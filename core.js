/**
 * roseView a framework for building ui and promoting developer
 * productivity and maintainability.
 * 
 * @license 
 * MIT
 */

/* roseView Global Variables Here */

export const DW = window.innerWidth;
export const DH = window.innerHeight;

export const roseConfig = {
    get Landscape() {
        lockOrientation('landscape')
    },

    get Portrait() {
        lockOrientation('portrait')
    },

    set Title(title) {
        document.title = title;
    }
}

const lockOrientation = (orient) => {
    try {
        screen.orientation.lock(orient)
    } catch (err) {
        console.info(err)
    }
}

export const $Q = a => document.querySelector(a);

export const $T = (text, langId) => {
    //TODO
    /**
     * Translation Function
     */
}

export const $STL = document.getElementById('main')

export const $UId = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let uid = '';
    for (let i = 0; i < 7; i++) {
        uid += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return uid;
};


const css = (strings, ...values) => {
    let cssString = strings.reduce((result, str, i) => {
        return result + str + (values[i] || "")
    }, "");
    return cssString;
}


/* roseView Component Class */

export const roseComponent = class {
    constructor() {
        this.element = null;
        this.elementUid = null;
    }

    /* roseView Methods Can Be Inherited */

    addChild(child) {
        if (child instanceof roseComponent) {
            this.element.appendChild(child.element)
        } else {
            console.error('Mounted Child Is Not A roseComponent')
        }
    }
    removeChild(child) {
        if (child instanceof roseComponent) {
            child.element.remove();
        } else {
            console.error('Child Is Not A roseComponent')
        }
    }

    hideElement() {
        this.element.style = this.css`
        visibility : hidden;`
    }

    showElement() {
        this.element.style = this.css`
        visibility : visible;`
    }

    goneElemenet() {
        this.element.style = this.css`
        display : none;`
    }

    css(strings, ...values) {
        let cssString = strings.reduce((result, str, i) => {
            return result + str + (values[i] || "")
        }, "");

        /* classname is equal to some random id */
        let uid;
        uid = $UId(); 
        
        let classSTYLE = `.${uid} {
            ${cssString}
        }`
    
        $STL.innerHTML += classSTYLE;
        this.element.classList.add(`${uid}`)
    }

    html(strings, ...values) {
        let htmlString = strings.reduce((result, str, i) => {
            return result + str + (values[i] || "");
        }, "");
        this.element.innerHtml = htmlString;
    }
}

/* roseView Global Object */

export const rsv = new function () {
    this.CreateLayout = (type, options) => {
        return new rsvLAYOUT(type, options)
    }

    this.AddHtmlEl = (parent, element, options, width, height) => {
        return new rsvHTMLELEMENT(parent, element, options, width, height)
    }

    this.RenderApplication = (main) => {
        main.css`
        width: 100%;
        height: 100%;
        `
        document.body.appendChild(main.element)
    }
}

const rsvLAYOUT = class extends roseComponent {
    constructor(type = 'linear', options = 'center') {
        super()

        this.element = document.createElement('div');

        type ? layoutFitApi(this.element, type, options) : null
        
    }
}

const rsvHTMLELEMENT = class extends roseComponent {
    constructor(parent, element, options, width, height) {
        super()

        this.element = document.createElement(element);

        parent ? parent.addChild(this) : null
        options ? optionsApi(this.element, options) : null
        
        width ? this.element.style.width = width : null
        height ? this.element.style.height = height : null
        
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
            },
        });
    }
}

let viewOptions = [
    "top",
    "bottom",
    "left",
    "right",
    "horizontal",
    "vertical",
    "vcenter",
    "center"
];

const optionsApi = (element, options) => {
    const functions = {
        left: () => {
            let cssString = css`
            display: flex;
            justify-content: flex-start;
            `;
            let classname = $UId();
            let classSTYLE = `.${classname} { ${cssString} }`;
            $STL.innerHTML += classSTYLE;
            element.classList.add(classname);
        },
        right: () => {
            let cssString = css`
            display: flex;
            justify-content: flex-end;
            `;
            let classname = $UId();
            let classSTYLE = `.${classname} { ${cssString} }`;
            $STL.innerHTML += classSTYLE;
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
            $STL.innerHTML += classSTYLE;
            element.classList.add(classname);
        },
        vcenter: () => {
            let cssString = css`
            display: flex;
            justify-content: center;
            vertical-align: center;
            `;
            let classname = $UId();
            let classSTYLE = `.${classname} { ${cssString} }`;
            $STL.innerHTML += classSTYLE;
            element.classList.add(classname);
        },
        bottom: () => {
            let cssString = css`
            display: flex;
            align-items: flex-end;
            `;
            let classname = $UId();
            let classSTYLE = `.${classname} { ${cssString} }`;
            $STL.innerHTML += classSTYLE;
            element.classList.add(classname);
        },
        top: () => {
            let cssString = css`
            display: flex;
            align-items: flex-start;
            `;
            let classname = $UId();
            let classSTYLE = `.${classname} { ${cssString} }`;
            $STL.innerHTML += classSTYLE;
            element.classList.add(classname);
        },
        horizontal: () => {
            let cssString = css`
            display: flex;
            flex-direction: row;
            `;
            let classname = $UId();
            let classSTYLE = `.${classname} { ${cssString} }`;
            $STL.innerHTML += classSTYLE;
            element.classList.add(classname);
        },
        vertical: () => {
            let cssString = css`
            display: flex;
            flex-direction: column;
            `;
            let classname = $UId();
            let classSTYLE = `.${classname} { ${cssString} }`;
            $STL.innerHTML += classSTYLE;
            element.classList.add(classname);
        }
    };

    options.split(",").forEach((el) => {
        if (viewOptions.includes(el)) {
            functions[el]();
        } else {
            console.error(`Unknown option: ${el}`);
        }
    });
};

function layoutFitApi(layout, type, options) {

    options ? optionsApi(layout, options) : null
    
    let layoutTYPE = type.toLowerCase();

    if (layoutTYPE == "linear") {
        layout.style = css`
        display : flex;`
    } 
    else if (layoutTYPE == "card") {
        layout.style.padding = "10px";
        layout.style.borderRadius = "5px";
    } 

    else if (layoutTYPE == "frame") {
        layout.style.position = "relative";
    } 

    else if (layoutTYPE == "absolute") {
        layout.style.position = "absolute";
    } 

    else console.error("Unknown Layout ", layout);

}
