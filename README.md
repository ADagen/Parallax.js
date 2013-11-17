Parallax.js
===========

Allow programming parallax effects in a declarative style.
Using plain object config to describe animations.
Provide smooth scrolling and compatibility with MacOS-like inertial scrolling.

VanillaJS powered; does not depend on any JavaScript libraries.

In gh-pages branch you can find example of use config files and simple realtime editor.

Support
===========
Internet Explorer 9+
Safari 5.1.4+
Opera 12+ (probably 11.60+)
Firefox 4+
Chrome 7+

In older browsers try to use ES5 polyfills.

Usage
============

    parallax = new Parallax({
        cfg             : {Object},
        auto            : {boolean},
        root            : {window|HTMLElement},
        beforeRender    : {Function},
        afterRender     : {Function},
        onElementCreate : {Function},
        onElementShow   : {Function},
        onWindowResize  : {Function}
    });

cfg - object containing information about how animation and positions of html element correlate to scrolling progress.

auto - set true to autostart parallax

root - describe root element for parallax's DOM tree. Currently supports only window as root element.

beforeRender and afterRender - functions calls every time parallax core want to render something.
Callback arguments:
progress {number} current scroll progress
speed {number} current scrolling speed.

onElementCreate - calls on creating of element, once for element.
Callback arguments:
element {Parallax.Element} created element, contains its DOM at 'html' property
progress {number} current scroll progress

onElementShow - calls every time on showing of element (when 'display' switched from 'none' to something truthy).
Callback arguments:
element {Parallax.Element} created element, contains its DOM at 'html' property
progress {number} current scroll progress


API
===========

    parallax.setProgress({number})

manually set progress.

    parallax.start()

use this if you set autostart to false.

    parallax.stop()

stops the parallax reflows and rendering

Feel free to use under MIT license.