import * as React from "react";
import { ViewerClassNameContract } from "./viewer.class-name-contract";
import { ManagedClasses } from "@microsoft/fast-components-class-name-contracts-base";

export enum Device {
    desktop = "desktop"
}

export enum ViewerSlot {
    head = "head",
    body = "body"
}

export interface ViewerManagedClasses extends ManagedClasses<ViewerClassNameContract> {}
export interface ViewerUnhandledProps extends React.AllHTMLAttributes<HTMLElement> {}
export interface ViewerHandledProps extends ViewerManagedClasses {
    metadata?: any;
    device?: Device;
    minHeight?: number;
    maxHeight?: number;
    autoHeight?: number;
}

export type ViewerProps = ViewerUnhandledProps & ViewerHandledProps;
