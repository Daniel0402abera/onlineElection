import { lazy, Suspense } from 'react';
import { Outlet, useRoutes } from 'react-router-dom';

import PositionPage from 'src/pages/position';
import { useAuth } from 'src/context/AuthContext';
import DashboardLayout from 'src/layouts/dashboard';

export const IndexPage = lazy(() => import('src/pages/app'));
export const BlogPage = lazy(() => import('src/pages/blog'));
export const UserPage = lazy(() => import('src/pages/user'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const ProductsPage = lazy(() => import('src/pages/products'));
export const VotePage = lazy(() => import('src/pages/vote'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));

// ----------------------------------------------------------------------

export default function Router() {
  const { user } = useAuth();

  const isAuthenticated = !!user;
  const userRole = localStorage.getItem('role');

  const routes = useRoutes([
    {
      path: '/',
      element: <LoginPage />,
      index: true,
    },
    {
      element:
        isAuthenticated && userRole === 'ADMIN' ? (
          <DashboardLayout>
            <Suspense>
              <Outlet />
            </Suspense>
          </DashboardLayout>
        ) : (
          <LoginPage />
        ),
      children: [
        { path: '/dashboard', element: <IndexPage /> },
        { path: '/dashboard/position', element: <PositionPage /> },
        { path: '/dashboard/Voting_list', element: <VotePage /> },
        { path: '/dashboard/user', element: <UserPage /> },
      ],
    },

    // {
    //   path: '/Voting_Sheet',
    //   element: isAuthenticated && userRole === 'USER' ? (
    //     <VotePage />
    //   ) : (
    //     <Page404 />
    //   ),
    //   index: true,
    // },
    {
      element:
        isAuthenticated && userRole === 'USER' ? (
          <DashboardLayout>
            <Suspense>
              <Outlet />
            </Suspense>
          </DashboardLayout>
        ) : (
          <LoginPage />
        ),
      children: [{ path: '/dashboard/Voting_list', element: <VotePage /> }],
    },

    {
      path: '404',
      element: <Page404 />,
    },
  ]);

  return routes;
}