# roseview Engine

roseView Engine is a framework that allows you to write ui declarativley.

roseview Engine borrows concepts from Android development and mixes them with the power of web development concepts like css.

To get started import `rsv` object from the roseview.core.js
The next step is to create this html file :

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
import { rsv, $Q, roseConfig } from "./roseviewsdk/roseview.core.js";

import { annotate } from "https://unpkg.com/rough-notation?module";

export function OnStart() {
 let layout = rsv.CreateLayout("linear", "top,vertical");

 rsv.AddLayout(layout);
}
```

I havent added more docs, the main.js file is the best to view roseview.js concepts.
