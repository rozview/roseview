# roseview Engine

roseView Engine is the web version of DroidScript Native Engine

It allows you to write DroidScript native code and build apps, just change the app call to rsv.

To get started create a DroidScript Html App (roseview Engine is DroidScript native code but instead of using the app object you reference the rsv object)

The next step is to add the roseview.core.js file as a script tag :

```html
<script src="https://unpkg.com/browse/roseview@0.0.3/roseview.core.js"></script>
```

The final step is to add the script tag where your main code will be located and get started.

roseview is not different from DroidScript native so you literally do not have to learn anything new, just replace what you would call as app to rsv.

i.e:

```javascript
function OnStart() {
 lay = rsv.CreateLayout("linear", "center");
 lay.SetBackColor("white");

 rsv.AddLayout(lay);
}
```

roseview Engine is in beta so most things available in DroidScript will not be available, you can contribute to the project though : ).
