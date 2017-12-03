import { ChildWindow } from './child-window';
export declare class Iframe extends ChildWindow {
    private _iframeElement;
    constructor(_iframeElement: HTMLIFrameElement);
    protected _cleanUp(): void;
}
