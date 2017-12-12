import 'rxjs/add/operator/filter';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

/** Represents an instance of child window like an iframe or a pop-up */
export abstract class ChildWindow {
    private _message$ = new Subject<any>();
    public get message$(): Observable<any> { return this._message$.filter(x => !x.childWindowMessageType); }

    private _messageListener = (e: any): void => this._message$.next(e.data);

    protected constructor(protected _window: Window) {
        window.addEventListener('message', this._messageListener);
    }

    /**
     * Sends a message to the parent window
     * @param message A simple JSON-object
     */
    public sendMessage(message: any): void {
        this._window.postMessage(message, window.location.origin);
    }

    /** Closes the window */
    public close(): void {
        this._message$.complete();
        this._window.removeEventListener('message', this._messageListener);
        this._cleanUp();
    }

    /**
     * Sets the new location of the child window. Returns a promise that is resolved when the page is loaded.
     * @param uri the location the child window will go to
     */
    public setLocation(uri: string): Promise<void> {
        return new Promise(resolve => {
            const subscription = this._message$.subscribe(x => {
                if (x.childWindowMessageType === ChildWindowMessageType.Loaded) {
                    subscription.unsubscribe();
                    resolve();
                }
            });
            this._window.location.href = uri;
        });
    }

    protected abstract _cleanUp(): void;
}

/** Checks whether we're in an iframe at the moment. */
export function isIframe(): boolean {
    return window.parent !== window;
}

/** Checks whether we're in a pop up at the moment. */
export function isPopUp(): boolean {
    return !!window.opener;
}

/** Checks whether we're in a child window at the moment. */
export function isChildWindow(): boolean {
    return isIframe() || isPopUp();
}

/** Helps you communicating from inside a child window */
export class ChildWindowHost {

    private get _parent(): Window {
        if (isIframe()) {
            return window.parent;
        } else if (isPopUp) {
            return window.opener;
        }
    }

    /** Sends a message to this child window */
    public sendMessage(message: any, targetOrigin: string = '*') {
        this._parent.postMessage(message, targetOrigin);
    }
}

/**
 * Returns the current child window host. This method should only be called when you are in a child window.
 * Use the {@link isChildWindow}-method to check whether this is the case.
 */
export function getChildWindowHost(): ChildWindowHost {
    if (!isIframe() && !isPopUp()) {
        throw new Error('Can\'t create iframe-host in a window without parent');
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
        window.parent.postMessage(message, '*');
        window.document.removeEventListener('DOMContentLoaded', domContentLoadedHandler);
    };
    window.document.addEventListener('DOMContentLoaded', domContentLoadedHandler);
}
