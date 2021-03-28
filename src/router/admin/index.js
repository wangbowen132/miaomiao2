export default {
  path: '/admin',
  component: () => import('@/views/Admin'),
  children: [
    {
      path: 'users',
      component: () => import('@/views/Admin/Users')
    },
    {
      path: 'movie',
      component: () => import('@/views/Admin/Movie')
    },
    {
      path: 'cinema',
      component: () => import('@/views/Admin/Cinema')
    },
    {
      path: '/admin',
      redirect: 'users'
    },

  ]
}