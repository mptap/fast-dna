import * as React from "react";
import Foundation from "@microsoft/fast-components-foundation-react";
import { DesktopHandledProps, DesktopUnhandledProps } from "./desktop.props";

class Desktop extends Foundation<DesktopHandledProps, DesktopUnhandledProps, {}> {
    public render(): JSX.Element {
        return (
            <div className={this.props.managedClasses.desktop}>
                <div className={this.props.managedClasses.window}>
                    <div className={this.props.managedClasses.window_tab} />
                    <div className={this.props.managedClasses.window_title}>
                        {this.props.title || "Desktop"}
                    </div>
                    <div className={this.props.managedClasses.window_control}>
                        <div className={this.props.managedClasses.window_control_item} />
                        <div className={this.props.managedClasses.window_control_item} />
                        <div className={this.props.managedClasses.window_control_item} />
                    </div>
                </div>
                <div className={this.props.managedClasses.navigation}>
                    <div className={this.props.managedClasses.navigation_control} />
                    <div className={this.props.managedClasses.navigation_control} />
                    <div className={this.props.managedClasses.navigation_control} />
                    <div className={this.props.managedClasses.navigation_address} />
                </div>
                {this.props.children}
            </div>
        );
    }
}

export default Desktop;
