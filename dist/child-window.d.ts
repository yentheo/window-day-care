import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/filter';
export declare abstract class ChildWindow {
    protected _window: Window;
    private _message$;
    readonly message$: Observable<any>;
    private _messageListener;
    protected constructor(_window: Window);
    sendMessage(message: any): void;
    close(): void;
    protected abstract _cleanUp(): void;
    setLocation(uri: string): Promise<void>;
}
export declare function isChildWindow(): boolean;
export declare class ChildWindowHost {
    sendMessage(message: any, targetOrigin?: string): void;
}
export declare function getChildWindowHost(): ChildWindowHost;
export declare enum ChildWindowMessageType {
    None = 0,
    Loaded = 1,
}
