import { DesignSystem } from "./design-system";
import { ComponentStyles, ComponentStyleSheet, CSSRules } from "@microsoft/fast-jss-manager";
import { ViewerClassNameContract } from "./viewer.class-name-contract";

/* tslint:disable:max-line-length */
const styles: ComponentStyles<ViewerClassNameContract, DesignSystem> = (config: DesignSystem): ComponentStyleSheet<ViewerClassNameContract, DesignSystem> => {
    return {
        viewer: {
            minWidth: "500px",
            height: "100%"
        }
    };
};

export default styles;
