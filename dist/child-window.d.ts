import { Observable } from 'rxjs/Observable';
export interface ChildWindow {
    message$: Observable<any>;
    sendMessage(message: any): void;
    remove(): void;
    setLocation(uri: string): void;
}
export declare function isChildWindow(): boolean;
export declare class ChildWindowHost {
    sendMessage(message: any, targetOrigin?: string): void;
}
export declare function getChildWindowHost(): ChildWindowHost;
