import type { RouteObject } from 'react-router';
import RoleListing from './pages/applicant/RoleListing';

const routes: RouteObject[] = [
    {
      path: 'role-listing',
      element: <RoleListing/>,
    },
  ];
  
  export default routes;