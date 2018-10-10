import * as React from "react";

const IFrame: React.ComponentType<any> = React.forwardRef(
    (props: {}, ref: any): JSX.Element => (
        <React.Fragment>
            <base target="_blank" />
            <iframe ref={ref} style={{ border: "none", width: "100%", height: "100%" }}>
                Your browser does not support iframes.
            </iframe>
        </React.Fragment>
    )
);

export default IFrame;
