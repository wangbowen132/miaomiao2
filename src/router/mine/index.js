export default {
  path: '/mine',
  component: () => import('@/views/Mine'),
  children: [
    {
      path: 'center',
      component: () => import('@/views/Mine/Center')
    },
    {
      path: 'register',
      component: () => import('@/views/Mine/Register')
    },
    {
      path: 'login',
      component: () => import('@/views/Mine/Login')
    },
    {
      path: 'findPassword',
      component: () => import('@/views/Mine/FindPassword')
    },
    {
      path: '/mine',
      redirect: 'center'
    },
  ]
}