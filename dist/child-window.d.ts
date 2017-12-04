import 'rxjs/add/operator/filter';
import { Observable } from 'rxjs/Observable';
/** Represents an instance of child window like an iframe or a pop-up */
export declare abstract class ChildWindow {
    protected _window: Window;
    private _message$;
    readonly message$: Observable<any>;
    private _messageListener;
    protected constructor(_window: Window);
    /**
     * Sends a message to the parent window
     * @param message A simple JSON-object
     */
    sendMessage(message: any): void;
    /** Closes the window */
    close(): void;
    /**
     * Sets the new location of the child window. Returns a promise that is resolved when the page is loaded.
     * @param uri the location the child window will go to
     */
    setLocation(uri: string): Promise<void>;
    protected abstract _cleanUp(): void;
}
/** Checks whether we're in an iframe at the moment. */
export declare function isIframe(): boolean;
/** Checks whether we're in a pop up at the moment. */
export declare function isPopUp(): boolean;
/** Checks whether we're in a child window at the moment. */
export declare function isChildWindow(): boolean;
/** Helps you communicating from inside a child window */
export declare class ChildWindowHost {
    private readonly _parent;
    /** Sends a message to this child window */
    sendMessage(message: any, targetOrigin?: string): void;
}
/**
 * Returns the current child window host. This method should only be called when you are in a child window.
 * Use the {@link isChildWindow}-method to check whether this is the case.
 */
export declare function getChildWindowHost(): ChildWindowHost;
export declare enum ChildWindowMessageType {
    None = 0,
    Loaded = 1,
}
