# jQuery.simplepopup

Simple popup plugin based on Bootstrap Modal plugin. Links and form submissions within the popup will load within the popup itself.


## Usage


```js
$('<div>This is a sample message. <a href="message.html">Load Another Message</a>.</div>').simplepopup({title: 'Hello'});
```

Add `data-skip` to links and forms within the modal content to prevent Ajax loading of the request.

### Demo
[View Demo](http://ennexa.github.io/jQuery.simplepopup/demo/demo.html)


### Options

Option | Default Value | Description
-------|---------------|------------
title | `<empty>` | Title for the modal window. If content loaded via Ajax has an `h1` element, it will be automatically loaded into the modal window title.
show | `true` | Open the window upon initialization.
backdrop | `true`| Show the translucent backdrop.
keyboard | `true`| Allow closing the modal window with escape key.
footerAction | `true`| If set to true, the submit and reset buttons within `.footer-action` element will be moved to Modal window's footer.
extraClass | `fade`| Additional class to be added to modal window.
width | `null` | Width for the modal window. It can be a number or one of the constants `modal-lg`, `modal-sm` or `modal-xs`.

## Credits

This plugin was created for [Prokerala.com](http://www.prokerala.com).