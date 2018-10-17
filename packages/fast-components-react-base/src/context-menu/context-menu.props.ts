import * as React from "react";
import { ContextMenuClassNameContract, ManagedClasses } from "@microsoft/fast-components-class-name-contracts-base";
import { ContextMenuItemProps } from "../context-menu-item";

export interface ContextMenuManagedClasses extends ManagedClasses<ContextMenuClassNameContract> {}
export interface ContextMenuUnhandledProps extends React.HTMLAttributes<HTMLUListElement> {}
export interface ContextMenuHandledProps extends ContextMenuManagedClasses {
    /**
     * The context-menu-item children
     */
    children?: React.ReactElement<ContextMenuItemProps>;
}

export type ContextMenuProps = ContextMenuHandledProps & ContextMenuUnhandledProps;
