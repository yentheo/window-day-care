import { IframeCreator } from "../src";
import { isChildWindow, getChildWindowHost } from "../src/child-window";

window.addEventListener('load', () => {
    if (!isChildWindow()) {
        const creator = new IframeCreator();
        const iframe = creator.injectIntoBody();
        iframe.message$.subscribe(x => console.log(x));
        iframe.setLocation(window.location.href);
    } else {
        const childWindowHost = getChildWindowHost();
        childWindowHost.sendMessage('message from iframe');
    }
});