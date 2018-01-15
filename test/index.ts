import { injectIntoBody, openPopUp, openTab } from '../src';
import { getChildWindowHost, isChildWindow } from '../src/child-window';
import { inject } from '../src/iframe.creator';

// make sure our document is loaded
window.addEventListener('load', () => {
    // check if we're in a child window
    if (!isChildWindow()) { // if not...
        // lets inject an iframe into the body
        const iframe = injectIntoBody();
        // subscribe to the messages of the newly created iframe
        // tslint:disable-next-line:no-console
        iframe.message$.subscribe(x => console.log(x));
        // set the iframe's location to our current application
        iframe.setLocation(window.location.href);
    } else { // if we're in a child window
        const childWindowHost = getChildWindowHost();
        // use the child window host to send a message to the parent
        childWindowHost.sendMessage('message from iframe');
    }
});
