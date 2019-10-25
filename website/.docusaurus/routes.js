
import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  
{
  path: '/help',
  component: ComponentCreator('/help'),
  exact: true,
  
},
{
  path: '/',
  component: ComponentCreator('/'),
  exact: true,
  
},
{
  path: '/users',
  component: ComponentCreator('/users'),
  exact: true,
  
},
{
  path: '/blog/2018/10/22/hello-world',
  component: ComponentCreator('/blog/2018/10/22/hello-world'),
  exact: true,
  
},
{
  path: '/blog/2018/01/14/rust-2018-a-neon-wish-list',
  component: ComponentCreator('/blog/2018/01/14/rust-2018-a-neon-wish-list'),
  exact: true,
  
},
{
  path: '/blog/2017/09/25/neon-wants-your-help',
  component: ComponentCreator('/blog/2017/09/25/neon-wants-your-help'),
  exact: true,
  
},
{
  path: '/blog/2016/04/01/native-js-classes-in-neon',
  component: ComponentCreator('/blog/2016/04/01/native-js-classes-in-neon'),
  exact: true,
  
},
{
  path: '/blog/2015/12/23/neon-node-rust',
  component: ComponentCreator('/blog/2015/12/23/neon-node-rust'),
  exact: true,
  
},
{
  path: '/blog',
  component: ComponentCreator('/blog'),
  exact: true,
  
},
{
  path: '/docs',
  component: ComponentCreator('/docs'),
  
  routes: [
{
  path: '/docs/async',
  component: ComponentCreator('/docs/async'),
  exact: true,
  
},
{
  path: '/docs/arguments',
  component: ComponentCreator('/docs/arguments'),
  exact: true,
  
},
{
  path: '/docs/arrays',
  component: ComponentCreator('/docs/arrays'),
  exact: true,
  
},
{
  path: '/docs/electron-apps',
  component: ComponentCreator('/docs/electron-apps'),
  exact: true,
  
},
{
  path: '/docs/cli',
  component: ComponentCreator('/docs/cli'),
  exact: true,
  
},
{
  path: '/docs/example-projects',
  component: ComponentCreator('/docs/example-projects'),
  exact: true,
  
},
{
  path: '/docs/errors',
  component: ComponentCreator('/docs/errors'),
  exact: true,
  
},
{
  path: '/docs/functions',
  component: ComponentCreator('/docs/functions'),
  exact: true,
  
},
{
  path: '/docs/getting-started',
  component: ComponentCreator('/docs/getting-started'),
  exact: true,
  
},
{
  path: '/docs/intro',
  component: ComponentCreator('/docs/intro'),
  exact: true,
  
},
{
  path: '/docs/hello-world',
  component: ComponentCreator('/docs/hello-world'),
  exact: true,
  
},
{
  path: '/docs/guides',
  component: ComponentCreator('/docs/guides'),
  exact: true,
  
},
{
  path: '/docs/json',
  component: ComponentCreator('/docs/json'),
  exact: true,
  
},
{
  path: '/docs/learning-resources',
  component: ComponentCreator('/docs/learning-resources'),
  exact: true,
  
},
{
  path: '/docs/modules',
  component: ComponentCreator('/docs/modules'),
  exact: true,
  
},
{
  path: '/docs/parallelism',
  component: ComponentCreator('/docs/parallelism'),
  exact: true,
  
},
{
  path: '/docs/publishing',
  component: ComponentCreator('/docs/publishing'),
  exact: true,
  
},
{
  path: '/docs/classes',
  component: ComponentCreator('/docs/classes'),
  exact: true,
  
},
{
  path: '/docs/roadmap',
  component: ComponentCreator('/docs/roadmap'),
  exact: true,
  
},
{
  path: '/docs/sdl2-guide',
  component: ComponentCreator('/docs/sdl2-guide'),
  exact: true,
  
},
{
  path: '/docs/objects',
  component: ComponentCreator('/docs/objects'),
  exact: true,
  
},
{
  path: '/docs/type-checking',
  component: ComponentCreator('/docs/type-checking'),
  exact: true,
  
},
{
  path: '/docs/primitives',
  component: ComponentCreator('/docs/primitives'),
  exact: true,
  
},
{
  path: '/docs/word-counting-example',
  component: ComponentCreator('/docs/word-counting-example'),
  exact: true,
  
},
{
  path: '/docs/tooling',
  component: ComponentCreator('/docs/tooling'),
  exact: true,
  
}],
},
  
  {
    path: '*',
    component: ComponentCreator('*')
  }
];
