import { configure, setAddon, addParameters } from '@storybook/react';
import { addons } from '@storybook/addons';
import LiveEdit, {setOptions} from 'storybook-addon-react-live-edit';
import theme from './theme';


addParameters({
  options: {
    theme,
  },
});

setOptions({ theme: "dracula", presets: ['react'] });

// automatically import all files ending in *.stories.tsx
configure([
  require.context('../src', true, /\.stories\.mdx$/),
  require.context('../src', true, /\.stories\.tsx$/)
  ],
  module
);

setAddon(LiveEdit);
