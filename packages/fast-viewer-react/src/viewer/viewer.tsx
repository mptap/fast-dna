import BaseViewer from "./viewer.base";
import {
    Device,
    ViewerHandledProps as BaseViewerHandledProps,
    ViewerManagedClasses,
    ViewerProps as BaseViewerProps,
    ViewerSlot,
    ViewerUnhandledProps
} from "./viewer.props";
import { ViewerClassNameContract } from "./viewer.class-name-contract";
import { DesignSystem } from "./design-system";

import manageJss, { ManagedJSSProps } from "@microsoft/fast-jss-manager-react";
import ViewerStyles from "./viewer.style";
import { Subtract } from "utility-types";

/*
 * The type returned by manageJss type is very complicated so we'll let the
 * compiler infer the type instead of re-declaring just for the package export
 */
/* tslint:disable-next-line:typedef */
const Viewer = manageJss(ViewerStyles)(BaseViewer);
type Viewer = typeof Viewer;

interface ViewerHandledProps extends Subtract<BaseViewerHandledProps, ViewerManagedClasses> {}
type ViewerProps = ManagedJSSProps<BaseViewerProps, ViewerClassNameContract, DesignSystem>;

export default Viewer;
export {
    Device,
    ViewerProps,
    ViewerClassNameContract,
    ViewerHandledProps,
    ViewerUnhandledProps,
    ViewerSlot
};
