import * as React from "react";
import * as ReactDOM from "react-dom";
import Foundation, { HandledProps } from "../foundation";
import { IContextMenuClassNameContract } from "@microsoft/fast-components-class-name-contracts";
import {
    ContextMenuProps,
    IContextMenuHandledProps,
    IContextMenuManagedClasses,
    IContextMenuUnhandledProps,
} from "./context-menu.props";
import {ContextMenuItemProps} from "../context-menu-item";
import KeyCodes from "../utilities/keycodes";
import {get, isFunction, clamp} from "lodash-es";
import {MenuItemRole} from "../utilities/aria";

export interface IContextMenuState {
    activeDescendant: string;
}


class ContextMenu extends Foundation<IContextMenuHandledProps & IContextMenuManagedClasses, IContextMenuUnhandledProps, IContextMenuState> {
    constructor(props: ContextMenuProps) {
        super(props);

        this.state = {
            activeDescendant: ""
        };
    }

    public static defaultProps: IContextMenuHandledProps = {
        open: false
    };

    protected handledProps: HandledProps<IContextMenuHandledProps & IContextMenuManagedClasses> = {
        children: void 0,
        managedClasses: void 0,
        open: void 0
    };

    /**
     * Renders the component
     */
    public render(): React.ReactElement<HTMLUListElement> {
        return (
            <ul
                {...this.unhandledProps()}
                role="menu"
                aria-activedescendant={this.state.activeDescendant}
                aria-hidden={!this.props.open}
                className={this.generateClassNames()}
                tabIndex={this.props.open ? 0 : -1}
                onFocus={this.handleMenuFocus}
                onBlur={this.handleMenuBlur}
                onKeyDown={this.handleMenuKeyDown}
            >
                {this.renderChildren()}
            </ul>
        );
    }

    /**
     * Create class-names
     */
    protected generateClassNames(): string {
        return super.generateClassNames(this.props.managedClasses.contextMenu);
    }

    /**
     * Render all child elements
     */
    private renderChildren(): React.ReactChild[] {
        return React.Children.map(this.props.children, this.renderChild);
    }

    /**
     * Render a single child
     */
    private renderChild = (child: React.ReactElement<ContextMenuItemProps>): React.ReactChild => {
        return React.cloneElement(child, {ref: this.setRef(child.props.id)} as any);
    }

    /**
     * get the ID props of all child menu items
     */
    private get childIds(): string[] {
        return React.Children.map(this.props.children, (child: React.ReactElement<ContextMenuItemProps>): string => child.props.id) || [];
    }

    /**
     * The HTML element associated with the current activedescendent
     */
    private get activeDescendantNode(): HTMLElement {
        return ReactDOM.findDOMNode(this.getRef(this.state.activeDescendant));
    }

    /**
     * Handles the focus event on the root menu
     */
    private handleMenuFocus = (e: React.FocusEvent<HTMLUListElement>): void => {
        this.setState({
            activeDescendant: this.childIds[0] || ""
        });
    }

    /**
     * Handle blurring the root menu
     */
    private handleMenuBlur = (e: React.FocusEvent<HTMLUListElement>): void => {
        // TODO: we'll only want to change this & close of the focus is still inside the root element
        this.setState({
            activeDescendant: null
        });
    }

    /**
     * Manually fire click events on the activeDescendant - needed because document focus isn't
     * actually on that element
     */
    private clickActiveDescendant(): void {
        const activeNode = ReactDOM.findDOMNode(this.getRef(this.state.activeDescendant));

        if (isFunction(get(activeNode, "click"))) {
            activeNode.click();
        }
    }
    
    /**
     * Inform integrations that the menu should be closed
     */
    private close(): void {
        if (isFunction(this.props.onClose)) {
            this.props.onClose();
        }
    }

    /**
     * Shift the activedescendant by a given number
     */
    private shiftActiveDescendant(delta: number): void {
        this.setState({
            activeDescendant: this.childIds[
                clamp(this.childIds.indexOf(this.state.activeDescendant) + delta, 0, this.childIds.length - 1)
            ] || ""
        });
    }

    /**
     * Handle the keydown event of the root menu
     */
    private handleMenuKeyDown = (e: React.KeyboardEvent<HTMLUListElement>): void => {
        switch (e.keyCode) {
            case KeyCodes.ArrowDown:
            case KeyCodes.ArrowRight:
                this.shiftActiveDescendant(1);
                break;

            case KeyCodes.ArrowUp:
            case KeyCodes.ArrowLeft:
                this.shiftActiveDescendant(-1);
                break;

            case KeyCodes.Enter:
                this.clickActiveDescendant();
                this.close();
                break;

            case KeyCodes.Space:
                this.clickActiveDescendant();

                if (this.activeDescendantNode && this.activeDescendantNode.getAttribute("role") === MenuItemRole.menuitem) {
                    this.close();
                }

                // TODO: When menuitemcheckbox, change state without closing menu
                // TODO: when menuitemradio, changes the state of all radios accordingly - don't close menu
                break;

            case KeyCodes.End:
                this.shiftActiveDescendant(this.childIds.length - 1 - this.childIds.indexOf(this.state.activeDescendant))
                break;
              
            case KeyCodes.Home:  
                this.shiftActiveDescendant(this.childIds.indexOf(this.state.activeDescendant) * -1)
                break;
                
            case KeyCodes.Escape:
                this.close();
                break;
        }
    }

}


export default ContextMenu;
export * from "./context-menu.props";
export {IContextMenuClassNameContract};
