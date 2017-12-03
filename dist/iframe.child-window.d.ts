import { Observable } from 'rxjs/Observable';
import { ChildWindow } from './child-window';
export declare class Iframe implements ChildWindow {
    private _iframeElement;
    private _message$;
    readonly message$: Observable<any>;
    private _messageListener;
    constructor(_iframeElement: HTMLIFrameElement);
    sendMessage(message: any): void;
    remove(): void;
    setLocation(uri: string): void;
}
