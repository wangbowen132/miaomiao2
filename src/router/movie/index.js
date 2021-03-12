export default {
  path: '/movie',
  component: () => import('@/views/Movie'),
  children: [
    {
      path: 'city',
      component: () => import('@/views/Movie/City')
    },
    {
      path: 'search',
      component: () => import('@/views/Movie/Search')
    },
    {
      path: 'nowPlaying',
      component: () => import('@/views/Movie/NowPlaying')
    },
    {
      path: 'comingSoon',
      component: () => import('@/views/Movie/ComingSoon')
    },
    {
      path: 'detail/1/:id',
      components: {
        default: () => import('@/views/Movie/NowPlaying'),
        detail: () => import('@/views/Movie/Detail')
      },
      props: {
        detail: true
      }
    },
    {
      path: 'detail/2/:id',
      components: {
        default: () => import('@/views/Movie/ComingSoon'),
        detail: () => import('@/views/Movie/Detail')
      },
      props: {
        detail: true
      }
    },
    {
      path: '/movie',
      redirect: '/movie/nowPlaying'
    }
  ]
}