import { Iframe } from "./iframe.child-window";
import { ChildWindow } from "./child-window";

export function inject(target: HTMLElement): ChildWindow {
    const iframe = document.createElement("iframe");
    iframe.style.display = 'none';
    target.appendChild(iframe);
    return new Iframe(iframe);
}

export function injectIntoBody(): ChildWindow {
    return inject(document.body);
}
