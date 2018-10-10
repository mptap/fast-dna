import * as React from "react";
import { stylesheetRegistry } from "@microsoft/fast-jss-manager-react";
import jss from "jss";
import Viewer, { Device, ViewerSlot } from "../../src";
import { theme } from "../utilities/style-manager";
import Example from "./example";

export interface PageState {
    width: number;
    componentProps: any;
    exampleStyles: any;
    device: Device;
    minHeight: number;
}

class Page extends React.Component<{}, PageState> {
    constructor(props: {}) {
        super(props);

        this.state = {
            componentProps: {
                onChange: this.handleTextUpdate,
                textValue: "",
            },
            exampleStyles: null,
            device: Device.desktop,
            minHeight: 200,
            width: 100
        };
    }

    public componentDidMount(): void {
        window.setTimeout(() => {
            this.forceUpdate();
        }, 0);
    }

    public render(): JSX.Element {
        return (
            <div style={{ width: `${this.state.width}%` }}>
                {this.state.componentProps.textValue}
                <div>
                    {`width: ${this.state.width}%`}
                    <input type="range" min={0} max={100} value={this.state.width} onChange={this.handleRangeUpdate} />
                    <input type="text" onChange={this.handleTextUpdate} value={this.state.componentProps.textValue} />
                </div>
                <Viewer
                    minHeight={this.state.minHeight}
                    device={this.state.device}
                >
                    <title slot={ViewerSlot.head}>test meta data title</title>
                    {this.getStyles()}
                    <Example
                        slot={ViewerSlot.body}
                        textValue={this.state.componentProps.textValue}
                        onChange={this.handleTextUpdate}
                    />
                </Viewer>
            </div>
        );
    }

    private getStyles = (): JSX.Element => {
        return (
            <style slot={ViewerSlot.head} type="text/css">
                {stylesheetRegistry.toString()}
            </style>
        );
    }

    private handleRangeUpdate = ({ target: { value }}: any): void => {
        theme.width = `${value}%`;
        this.setState({ width: value });
    }

    private handleTextUpdate = (value: any): void => {
        if (typeof value === "object" && value.target) {
            this.setState(
                {
                    componentProps: {
                        getStyles: this.onGetStyles,
                        onChange: this.handleTextUpdate,
                        textValue: value.target.value,
                    }
                },
            );
        } else {
            this.setState(
                {
                    componentProps: {
                        getStyles: this.onGetStyles,
                        onChange: this.handleTextUpdate,
                        textValue: value,
                    }
                },
            );
        }
    }

    private onGetStyles = (style: string): void => {
        this.setState({exampleStyles: <style type={"text/css"}>{style}</style>});
    }
}

export default Page;
