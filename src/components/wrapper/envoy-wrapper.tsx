import React from "react";

export type IWrapperProps = { text: string };

/**
 * @class EnvoyWrapper
 */
export class EnvoyWrapper extends React.Component<IWrapperProps> {
    constructor(props: IWrapperProps) {
        super(props);
        this.state = {

        }
    }
    render() {
        const { text } = this.props;

        return <div style={{ color: "red" }}>Hello {text}</div>;
    }
}
