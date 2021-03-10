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
      path: '/movie',
      redirect: '/movie/nowPlaying'
    }
  ]
}