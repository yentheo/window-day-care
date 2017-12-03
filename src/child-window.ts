import { Observable } from 'rxjs/Observable';

export interface ChildWindow {
    message$: Observable<any>;
    sendMessage(message: any): void;
    remove(): void;
    setLocation(uri: string): void;
}

export function isChildWindow(): boolean {
    return window.parent !== window;
}

export class ChildWindowHost {
    public sendMessage(message: any, targetOrigin: string = "*") {
        window.parent.postMessage(message, targetOrigin);
    }
}

export function getChildWindowHost(): ChildWindowHost {
    if (!isChildWindow()) {
        throw new Error("Can't create iframe-host in a window without parent");
    }
    return new ChildWindowHost();
}
