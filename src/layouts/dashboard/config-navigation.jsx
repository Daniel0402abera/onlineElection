import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard',
    icon: icon('ic_analytics'),
    roles: ['ADMIN'],
  },
  {
    title: 'Position List',
    path: '/dashboard/position',
    icon: icon('ic_user'),
    roles: ['ADMIN'],
  },
  {
    title: 'Voting sheet',
    path: '/dashboard/Voting_list',
    icon: icon('ic_user'),
    roles: ['ADMIN', 'USER'],
  },
  {
    title: 'user',
    path: '/dashboard/user',
    icon: icon('ic_user'),
    roles: ['ADMIN'],
  },
];

// eslint-disable-next-line no-shadow, no-unused-vars
function filterNavByRole(navConfig, userRole) {
  return navConfig.filter(route => route.roles.includes(userRole));
}
export default navConfig;
