
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/f1-challenge/',
  locale: undefined,
  routes: [
  {
    "renderMode": 1,
    "route": "/f1-challenge"
  },
  {
    "renderMode": 1,
    "route": "/f1-challenge/teams/*/drivers"
  },
  {
    "renderMode": 1,
    "route": "/f1-challenge/drivers"
  },
  {
    "renderMode": 1,
    "route": "/f1-challenge/standings"
  },
  {
    "renderMode": 1,
    "redirectTo": "/f1-challenge",
    "route": "/f1-challenge/**"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 1628, hash: 'dcf3e868f3c1f070c878610aabd0e8cd91d437c6e9f650335ee804d131d3eb50', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1072, hash: 'ffafafa7100b07e1de971a2e30473e56e6314ac405e732aa3ac7b1597c347643', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'styles-GBPTRQYP.css': {size: 826177, hash: 'OKTCWM/wp7o', text: () => import('./assets-chunks/styles-GBPTRQYP_css.mjs').then(m => m.default)}
  },
};
