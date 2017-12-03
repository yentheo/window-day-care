# window-day-care

window-day-care is an npm package for easily creating pop-up windows and iframe-elements and communicating between parent and child window.

## Getting started
1. Install the npm-package.

    ```> npm install @spectra/window-day-care```

1. Try out this snippet
    ```js
        import { injectIntoBody, openPopUp, openTab } from "../src";
        import { isChildWindow, getChildWindowHost } from "../src/child-window";

        // make sure our document is loaded
        window.addEventListener('load', () => {
            // check if we're in a child window
            if (!isChildWindow()) { // if not...
                // lets inject an iframe into the body
                const iframe = injectIntoBody();
                // subscribe to the messages of the newly created iframe
                iframe.message$.subscribe(x => console.log(x));
                // set the iframe's location to our current application
                iframe.setLocation(window.location.href);
            } else { // if we're in a child window
                const childWindowHost = getChildWindowHost();
                // use the child window host to send a message to the parent
                childWindowHost.sendMessage('message from iframe');
            }
        });

    ```
