import { Iframe } from "./iframe.child-window";
import { ChildWindow } from "./child-window";

export class IframeCreator {
    public constructor() { }

    public inject(target: HTMLElement): ChildWindow {
        const iframe = document.createElement("iframe");
        iframe.style.display = 'none';
        target.appendChild(iframe);
        return new Iframe(iframe);
    }

    public injectIntoBody(): ChildWindow {
        return this.inject(document.body);
    }
}
