import * as React from "react";
import * as ReactDOM from "react-dom";
import { Route, Switch } from "react-router";
import { BrowserRouter } from "react-router-dom";
import Page from "./components/page";

/**
 * Create the root node
 */
const root: HTMLElement = document.createElement("div");
root.setAttribute("id", "root");
document.body.appendChild(root);

const render: any = (): void => {
    ReactDOM.render(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact={true} component={Page} />
            </Switch>
        </BrowserRouter>,
        document.getElementById("root"),
    );
};

render();
