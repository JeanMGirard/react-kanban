import React from 'react';
import { storiesOf } from '@storybook/react';
import { withDesign } from 'storybook-addon-designs'

import { ContactCard } from "..";

storiesOf('designs', module)
    .addDecorator(withDesign)
    .add('iframe', () => <ContactCard/>, {
        design: {
            type: 'iframe',
            url: 'http://agb.mwstudio.ca'
        }
    });
