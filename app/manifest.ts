import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'TextUtils',
    short_name: 'TextUtils',
    description:
      'Distraction-Free Text Tools for Writers & Students - word counters, case converters, diff checker and more.',
    start_url: '/',
    display: 'standalone',
    background_color: '#FAF8F5',
    theme_color: '#1c1917',
    icons: [
      { src: '/icon', sizes: '192x192', type: 'image/png' },
      { src: '/apple-icon', sizes: '180x180', type: 'image/png' },
    ],
  };
}
