import React from 'react';
import { storiesOf } from '@storybook/react';

// import test from "../components/wrapper/"
import { EnvoyWrapper, ContactCard } from "..";


storiesOf('Envoy - React', module)
    .add(
        'Wrapper',
        () => <EnvoyWrapper text="test"> <ContactCard/></EnvoyWrapper>,
        { info: { inline: true } }
    );
