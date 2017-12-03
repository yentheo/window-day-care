import { ChildWindow } from "./child-window";
export declare class IframeCreator {
    constructor();
    inject(target: HTMLElement): ChildWindow;
    injectIntoBody(): ChildWindow;
}
