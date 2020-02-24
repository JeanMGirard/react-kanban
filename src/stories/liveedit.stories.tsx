import React from 'react';
import { storiesOf, setAddon } from '@storybook/react';
import LiveEdit, { withLiveEditScope } from 'storybook-addon-react-live-edit';

import { EnvoyWrapper } from "..";

setAddon(LiveEdit);

storiesOf('Envoy - React2', module)
    .addDecorator(withLiveEditScope({
        React,
        EnvoyWrapper,
        scopeTest: 'Passed!'
    }))

    // @ts-ignore
    .addLiveSource('Demo', `return <div style={{ padding: '10px', border: '1px solid red', margin: 10 }}>demo</div>;`)
    .addLiveSource('Demo 2', `return <EnvoyWrapper text={localScopeTest}>{scopeTest}</EnvoyWrapper>`, {
        localScopeTest: 'Passed as well!'
    })
    .add('Static source', () => <EnvoyWrapper text="s" />);
