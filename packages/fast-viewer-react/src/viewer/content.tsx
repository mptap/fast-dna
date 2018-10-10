import * as React from "react";
import * as ReactDOM from "react-dom";

export interface ContentProps {
    DOMNode: HTMLDivElement;
}

class Content extends React.PureComponent<ContentProps, {}> {
    public render(): JSX.Element {
        if (this.props.children && this.props.DOMNode) {
            return ReactDOM.createPortal(
                this.props.children,
                this.props.DOMNode,
            );
        }

        return null;
    }
}

export default Content;
