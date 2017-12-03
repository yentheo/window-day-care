import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/filter';

export abstract class ChildWindow {
    private _message$ = new Subject<any>();
    public get message$(): Observable<any> { return this._message$.filter(x => !x['childWindowMessageType']); }

    private _messageListener = (e: any): void => {
        this._message$.next(e['data']);
    };

    protected constructor(protected _window: Window) {
        window.addEventListener('message', this._messageListener);
    }

    public sendMessage(message: any): void {
        this._window.postMessage(message, window.location.origin);
    }

    public close(): void {
        this._message$.complete();
        this._window.removeEventListener('message', this._messageListener);
        this._cleanUp();
    }

    protected abstract _cleanUp(): void;

    public setLocation(uri: string): Promise<void> {
        return new Promise(resolve => {
            const subscription = this._message$.subscribe(x => {
                if (x['childWindowMessageType'] === ChildWindowMessageType.Loaded) {
                    subscription.unsubscribe();
                    resolve();
                }
            });
            this._window.location.href = uri;
        });
    }
}

export function isIframe(): boolean {
    return window.parent !== window;
}

export function isPopUp(): boolean {
    return window.opener !== null;
}

export function isChildWindow(): boolean {
    return isIframe() || isPopUp();
}

export class ChildWindowHost {

    private get _parent(): Window {
        if (isIframe()) {
            return window.parent;
        } else if (isPopUp) {
            return window.opener;
        }
    }

    public sendMessage(message: any, targetOrigin: string = "*") {
        this._parent.postMessage(message, targetOrigin);
    }
}

export function getChildWindowHost(): ChildWindowHost {
    if (!isIframe() && !isPopUp()) {
        throw new Error("Can't create iframe-host in a window without parent");
    }
    return new ChildWindowHost();
}

export enum ChildWindowMessageType {
    None = 0,
    Loaded
}

if (isChildWindow()) {
    const domContentLoadedHandler = (e: Event) => {
        const message = {
            childWindowMessageType: ChildWindowMessageType.Loaded
        };
        window.parent.postMessage(message, "*");
        window.document.removeEventListener('DOMContentLoaded', domContentLoadedHandler);
    };
    window.document.addEventListener("DOMContentLoaded", domContentLoadedHandler);
}
