import BaseDesktop from "./desktop.base";
import {
    DesktopHandledProps as BaseDesktopHandledProps,
    DesktopManagedClasses,
    DesktopProps as BaseDesktopProps,
    DesktopUnhandledProps
} from "./desktop.props";
import { DesktopClassNameContract } from "./desktop.class-name-contract";
import { DesignSystem } from "./design-system";

import manageJss, { ManagedJSSProps } from "@microsoft/fast-jss-manager-react";
import DesktopStyles from "./desktop.style";
import { Subtract } from "utility-types";

/*
 * The type returned by manageJss type is very complicated so we'll let the
 * compiler infer the type instead of re-declaring just for the package export
 */
/* tslint:disable-next-line:typedef */
const Desktop = manageJss(DesktopStyles)(BaseDesktop);
type Desktop = typeof Desktop;

interface DesktopHandledProps extends Subtract<BaseDesktopHandledProps, DesktopManagedClasses> {}
type DesktopProps = ManagedJSSProps<BaseDesktopProps, DesktopClassNameContract, DesignSystem>;

export default Desktop;
export {
    DesktopProps,
    DesktopClassNameContract,
    DesktopHandledProps,
    DesktopUnhandledProps
};
