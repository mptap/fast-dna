import * as React from "react";
import Foundation, { HandledProps } from "@microsoft/fast-components-foundation-react";
import Desktop from "./desktop";
import IFrame from "./iframe";
import Content from "./content";
import Metadata from "./metadata";
import {
    Device,
    ViewerHandledProps,
    ViewerSlot,
    ViewerUnhandledProps
} from "./viewer.props";

export interface ViewerState {
    iframeHeight: string;
    contentRoot: HTMLDivElement;
    metadataRoot: HTMLHeadElement;
}

export default class Viewer extends Foundation<ViewerHandledProps, ViewerUnhandledProps, ViewerState> {

    public static displayName: string = "Viewer";

    protected handledProps: HandledProps<ViewerHandledProps> = {
        device: void 0,
        managedClasses: void 0,
        metadata: void 0,
        minHeight: void 0,
        maxHeight: void 0,
        autoHeight: void 0
    };

    private iframeRef: React.RefObject<HTMLIFrameElement>;

    constructor(props: ViewerHandledProps) {
        super(props);

        this.state = {
            iframeHeight: "0px",
            contentRoot: undefined,
            metadataRoot: undefined
        };

        this.iframeRef = React.createRef();
    }

    public componentDidMount(): void {
        const contentRoot: HTMLDivElement = document.createElement("div");
        contentRoot.setAttribute("style", "height: 100%");

        if (this.iframeRef && !this.state.contentRoot && !this.state.metadataRoot) {
            this.iframeRef.current.contentWindow.document.body.appendChild(contentRoot);

            this.setState({ contentRoot, metadataRoot: this.iframeRef.current.contentWindow.document.head });
        }
    }

    public render(): JSX.Element {
        return (
            <div className={this.props.managedClasses.viewer}>
                {this.renderEnvironment()}
            </div>
        );
    }

    private renderEnvironment(): JSX.Element {
        switch (this.props.device) {
            case Device.desktop:
                return this.renderDesktop();
            case undefined:
            default:
                return this.renderIFrame();
        }
    }

    private renderDesktop(): JSX.Element {
        return (
            <Desktop>
                {this.renderIFrame()}
            </Desktop>
        );
    }

    private renderIFrame(): JSX.Element {
        return (
            <React.Fragment>
                <IFrame ref={this.iframeRef} />
                {this.renderContent()}
                {this.renderMetadata()}
            </React.Fragment>
        );
    }

    private renderMetadata(): JSX.Element {
        return (
            <Metadata DOMNode={this.state.metadataRoot}>
                {this.withSlot(ViewerSlot.head)}
            </Metadata>
        );
    }

    private renderContent(): JSX.Element {
        return (
            <Content DOMNode={this.state.contentRoot}>
                {this.withSlot(ViewerSlot.body)}
            </Content>
        );
    }
}
