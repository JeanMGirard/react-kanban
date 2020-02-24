import * as React from "react";
import { EnvoyWrapper } from "..";
import * as renderer from "react-test-renderer";

test("Component should show 'red' text 'Hello World'", () => {
    const component = renderer.create(<EnvoyWrapper text="World" />);
    const testInstance = component.root;

    expect(testInstance.findByType(EnvoyWrapper).props.text).toBe("World");

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
