# roseview Engine

roseView Engine is a framework that allows you to write ui declarativley.

roseview Engine borrows concepts from Android development and mixes them with the power of web development concepts like css.

To get started create this html file :

```html
<!DOCTYPE html>
<html lang="en">
 <head>
  <style>
   html,
   body {
    margin: 0;
    width: 100%;
    height: 100%;
    overflow-x: hidden;
   }
  </style>
  <style id="style"></style>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
 <body>
  <script type="module">
   import { OnStart } from "./main.js";

   document.addEventListener("DOMContentLoaded", () => {
    OnStart();
   });
  </script>
 </body>
</html>

```

In your main.js file :

```javascript
import { createLayout, renderApplication, $Q, roseConfig } from "./roseviewsdk/roseview.core.js";

export function OnStart() {
 let layout = createLayout("linear", "top,vertical");

 renderApplication(layout);
}
```

I havent added more docs, the main.js file is the best to view roseview.js concepts.
