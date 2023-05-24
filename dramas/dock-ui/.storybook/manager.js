import { addons } from '@storybook/addons';
import { create } from '@storybook/theming';

addons.setConfig({
  theme: create({
    base: 'light',
    brandTitle: 'NARA Way',
    brandUrl: 'http://nextree.io',
    brandImage: 'https://www.nextree.io/content/images/2021/01/nextree_logo.svg',
    brandTarget: '_blank',
  }),
});
