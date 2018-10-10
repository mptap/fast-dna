import { DesignSystem } from "./design-system";
import { ComponentStyles, ComponentStyleSheet, CSSRules } from "@microsoft/fast-jss-manager";
import { DesktopClassNameContract } from "./desktop.class-name-contract";

/* tslint:disable:max-line-length */
const styles: ComponentStyles<DesktopClassNameContract, DesignSystem> = (config: DesignSystem): ComponentStyleSheet<DesktopClassNameContract, DesignSystem> => {
    const grey1: string = "rgb(225,225,225)";
    const grey2: string = "rgb(230,230,230)";
    const grey3: string = "rgb(240,240,240)";
    const grey4: string = "rgb(245,245,245)";

    return {
        desktop: {
            background: grey4,
            height: "100%",
            borderRadius: "0 0 5px 5px"
        },
        window: {
            display: "flex",
            borderRadius: "5px 5px 0 0",
            height: "50px",
            background: grey1,
            textAlign: "right"
        },
        window_tab: {
            borderRadius: "5px 5px 0 0",
            width: "200px",
            margin: "10px 0 0 10px",
            background: grey3
        },
        window_title: {
            flexGrow: "1",
            textAlign: "center",
            lineHeight: "30px",
            marginTop: "10px",
            fontFamily: "Arial, sans-serif"
        },
        window_control: {
        },
        window_control_item: {
            display: "inline-block",
            borderRadius: "5px",
            height: "25px",
            width: "25px",
            margin: "10px 10px 10px 0",
            background: grey3
        },
        navigation: {
            height: "40px",
            background: grey3
        },
        navigation_address: {
            display: "inline-block",
            borderRadius: "5px",
            height: "30px",
            width: "calc(100% - 140px)",
            margin: "5px 10px",
            background: grey2
        },
        navigation_control: {
            display: "inline-block",
            borderRadius: "5px",
            height: "30px",
            width: "30px",
            margin: "5px 0 5px 10px",
            background: grey2
        }
    };
};

export default styles;
