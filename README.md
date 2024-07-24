![](src/images/roseviewTransparent.png)

[![license](https://img.shields.io/npm/l/svelte.svg)](LICENSE.md)

# roseview Framework

A small framework that is all batteries included while maintaining ease of use and maintainability.

roseview.js aims to provide the same amount of usefullness as other big dogs like React and Vue.

The main aim is to do everything differently and still be fast, the first thing is we do not use a VDOM.

Moreover we will ditch any warnings about separation of concerns, everything will be done from the javascript side.

## Getting Started

To get started run this command :

> npx create-roseview-app your-app-name

A folder containing important stuff will be created,

Your main.js file  will look something like this :

```javascript
import { createLayout, createApplication } from "./roseviewsdk/roseview.core.js";


let layout = createLayout("linear", "top,vertical");

createApplication(layout);

```

### Explaining everything >3

The `roseview.core.js` file exports the following :

```javascript
DW /* access device height */
DW /* access device width */

$Q /* query selector */
$El /* getElementById */

roseConfig
createLayout 
createElement
createApplication
```

#### roseConfig

Allows you to set that pages configuration :

```javascript
roseConfig.Title /* Sets Doc Title */
roseConfig.Icon /* Sets Doc Icon */
roseConfig.Landscape , roseConfig.Portrait
```

#### createLayout

A layout is a special div, instead of creating a div its advised you prefer to use createLayout.

createLayout function has these parameters :

```javascript
createLayout(type, options)
```

There are 2 types of layouts ( linear, frame )

A linear layout aligns its children normally, while an absolute one relies on the setPosition method.
These are the ones you will use mostly.

The options parameter, allows you to specify the direction of your children, here are available options :

```console
left, right
top, bottom
center
vcenter,
hcenter,
horizontal, vertical
```

#### createElement

createElement allows you to add any html element, into your layout.

It has the following params :

```javascript
createElement(parent, element, options, width, height)
```

The parent is the layout your element must attach to

The element is an HtmlElement ( nav, button, img )

The options uses the same optionsApi you experienced with createLayout, useful if you want to specify children direction without adding any css.

width and height are self explanatory.

createElement returns a proxy, a proxy allows us to emulate the roseComponent object and access default setters and getters in javascript, this means you can do this (just as using document.createElement)

```javascript
import { createLayout, createElement, createApplication, roseConfig } from "./roseviewsdk/roseview.core.js";


let layout = createLayout("linear", "top,vertical");

let navbar = createElement(layout, "nav", "vcenter, left");

/* We can also do this btw */
navbar.style.marginTop = '15px'
  
/* But its not recommended so try using batchDOMUpdates */

navbar.batchDOMUpdates(() => {
navbar.style.backgroundColor = "green";
 });
  /**
   * However its not recommended for styling like using
   * the marginTop example
   * 
   * Why Though ?
   * 
   * Doing this causes a reflow and redraw so as parsing
   * CSS, thus slowing your app down, 
   * 
   * Instead
   * 
   * Use the setStyle method it uses insertRule which is 
   * faster
   */
  createApplication(layout);
  roseConfig.Title = "roseview Framework";
```

#### createApplication

This is a mounting function similar to mithrils and vue's mount functions.

It takes these params :

```javascript
createApplication(mainLayout, appRoutes)
```

Specify the main layout to be attached to the body.

appRoutes is a feature being worked on, ignore for now.

### Our Styling Solution

The `setStyle` method of createElement allows you to add styles that are scoped to that element

It doesnt add the css by looping over the object keys and values and adding it using js nor does it use .innerHtml

Instead it uses insertRule, in which the browser doesnt have to parse the css nor reflow making it optimal.

In use it looks like this :

```javascript
let btn = createElement(parent, "button", null, width, height);

 btn.setStyle({
  border: "2px solid #6200ea",
  color: "#6200ea",
  backgroundColor: "transparent",
  fontFamily: "'Archivo', sans-serif",
  fontWeight: 500,
  fontSize: "1rem",
  textAlign: "center",
  cursor: "pointer",
  padding: "0.5rem 1rem",
  fontFamily: "'Playfair Display', serif",
  fontWeight: 700,
  transition: "background-color 0.3s, color 0.3s",

  ":hover": {
   backgroundColor: "#6200ea",
   color: "white"
  },
  ":active": {
   backgroundColor: "#3700b3",
   borderColor: "#3700b3"
  },
  "@media (max-width: 600px)": {
   fontSize: "0.8rem",
   padding: "0.4rem 0.8rem"
  },
  " > span": {
   /* Demo Of Element Selector */
   color: "red"
  }
 });
```

## Custom Components

These allow for better code, and we advise only to use functional components !

Here is how to implement one :

```javascript
import { createElement } from "../roseviewsdk/roseview.core.js";

const outlinedButton = function (parent, text, width, height) {
 let btn = createElement(parent, "button", null, width, height);

  /* Do not use document.createElement, parent will fail to attach ! */
 text ? (btn.textContent = text) : null;
 btn.setStyle({
  border: "2px solid #6200ea",
  color: "#6200ea",
  backgroundColor: "transparent",
  fontFamily: "'Archivo', sans-serif",
  fontWeight: 500,
  fontSize: "1rem",
  textAlign: "center",
  cursor: "pointer",
  padding: "0.5rem 1rem",
  fontFamily: "'Playfair Display', serif",
  fontWeight: 700,
  transition: "background-color 0.3s, color 0.3s",

  ":hover": {
   backgroundColor: "#6200ea",
   color: "white"
  },
  ":active": {
   backgroundColor: "#3700b3",
   borderColor: "#3700b3"
  },
  "@media (max-width: 600px)": {
   fontSize: "0.8rem",
   padding: "0.4rem 0.8rem"
  },
  " > span": {
   color: "red"
  }
 });
 return btn;
};

export default outlinedButton;
```

## Roadmap

There is alot to be added in roseview.js since we aim to make this an all batteries included framework we need to implement the following :

- [ ] createImage
- [ ] createSuspense
- [ ] createRouter
- [ ] createSignal & bindSignal method
- [ ] createState & bindState method

## Contributing

Before you contribute i advise you read the code and follow that code style while following the roseview syntax and simplicity.

- If you find an issue you would like to fix, [open a pull request](#pull-requests).

### Triaging issues and pull requests

One great way you can contribute to the project without writing any code is to help triage issues and pull requests as they come in.

- Ask for more information if you believe the issue does not provide all the details required to solve it.
- Flag issues that are stale or that should be closed.
- Ask for test plans and review code.

You must provide a test for your code all tests are located in `/test` folder.

Remember small pull requests are much easier to review and more likely to get merged.

Only Oarabile Koore can write code and reproduce no tests !
