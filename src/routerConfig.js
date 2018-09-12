// 以下文件格式为描述路由的协议格式
// 你可以调整 routerConfig 里的内容
// 变量名 routerConfig 为 iceworks 检测关键字，请不要修改名称

import AsideLayout from './layouts/AsideLayout';
import TablePage1 from './pages/TablePage1';
import TablePage1G from './pages/TablePage1G';
import TablePage2G from './pages/TablePage2G';
import TablePage3G from './pages/TablePage3G';
import TablePage2 from './pages/TablePage2';
import TablePage3 from './pages/TablePage3';
import TablePage12 from './pages/TablePage12G';
import TablePage22 from './pages/TablePage22G';
import TablePage32 from './pages/TablePage32G';
import HomePage from './pages/HomePage';
import NotFound from './pages/NotFound';

const routerConfig = [
  {
    path: '/',
    layout: AsideLayout,
    component: HomePage,
  },
  {
    path: '/tablePage1',
    layout: AsideLayout,
    component: TablePage1,
  },
  {
    path: '/TablePage2',
    layout: AsideLayout,
    component: TablePage2,
  },
  {
    path: '/TablePage3',
    layout: AsideLayout,
    component: TablePage3,
  },
  {
    path: '/HomePage',
    layout: AsideLayout,
    component: HomePage,
  },
  {
    path: '/TablePage12',
    layout: AsideLayout,
    component: TablePage12,
  },
  {
    path: '/TablePage22',
    layout: AsideLayout,
    component: TablePage22,
  },
  {
    path: '/TablePage32',
    layout: AsideLayout,
    component: TablePage32,
  },
  {
    path: '/tablePage1G',
    layout: AsideLayout,
    component: TablePage1G,
  },
  {
    path: '/tablePage2G',
    layout: AsideLayout,
    component: TablePage2G,
  },
  {
    path: '/tablePage3G',
    layout: AsideLayout,
    component: TablePage3G,
  },
  {
    path: '*',
    layout: AsideLayout,
    component: NotFound,
  },
];

export default routerConfig;
