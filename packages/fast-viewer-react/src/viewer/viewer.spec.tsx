import * as React from "react";
import * as Adapter from "enzyme-adapter-react-16";
import { configure, mount, shallow } from "enzyme";

/*
 * Configure Enzyme
 */
configure({adapter: new Adapter()});

describe("viewer", (): void => {
    test("should create an iframe", () => {
        console.log("tests");
    });
});
