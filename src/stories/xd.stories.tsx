import React from 'react';
import { storiesOf } from '@storybook/react';
import { withXD  } from 'storybook-addon-xd-designs'

// import test from "../components/wrapper/"
import { EnvoyWrapper } from "..";

/*
export default {
    title: 'XD',
    component: EnvoyWrapper,
    decorators: [withXD ]
}

export const myStory = () => <EnvoyWrapper text={"fdg"}>Hello, World!</EnvoyWrapper>;

myStory.story = {
    name: 'XD',
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/LKQ4FJ4bTnCSjedbRpk931/Sample-File'
        }
    }
};
*/
storiesOf('My stories', module)
    .addDecorator(withXD)
    .add('My awesome story', () => <EnvoyWrapper text={"test"}>Hello, World!</EnvoyWrapper>, {
        design: {
            specUrl: 'https://xd.adobe.com/spec/181eaf80-9e7a-4ea6-7dc8-e21dfd9b2d80-6e2f/screen/58270c9e-502b-4737-be32-a5dfe9523bb5/Color/',
            reviewUrl: 'https://xd.adobe.com/view/813cbece-c467-47ce-67e3-b60caacc2ff8-f70d/',
        }
    });
