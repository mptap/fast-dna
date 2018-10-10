import * as React from "react";
import { DesktopClassNameContract } from "./desktop.class-name-contract";
import { ManagedClasses } from "@microsoft/fast-components-class-name-contracts-base";

export interface DesktopManagedClasses extends ManagedClasses<DesktopClassNameContract> {}
export interface DesktopUnhandledProps extends React.AllHTMLAttributes<HTMLElement> {}
export interface DesktopHandledProps extends DesktopManagedClasses {
    /**
     * The title
     */
    title?: string;
}

export type DesktopProps = DesktopUnhandledProps & DesktopHandledProps;
