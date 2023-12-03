import {defineConfig} from 'vite';
import {VitePWA} from 'vite-plugin-pwa';

export default defineConfig({
  publicDir: 'src/assets',
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*'],
      },
      includeAssets: ['**/*'],
      manifest: {
        name: 'Tick-Tock',
        short_name: 'Tick-Tock',
        description: 'An app that is good in one thing: Ticking and Tocking.',
        theme_color: '#ffffff',
        background_color: '#000000',
        scope: '/',
        start_url: '/',
        display: 'standalone',
        display_override: ['window-controls-overlay'],
        categories: ['utilities'],
        orientation: 'any',
        icons: [
          {
            src: '/favicons/tick-tock.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: '/favicons/tick-tock.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
        screenshots: [
            {
                src: '/screenshots/desktop/desktop_1.png',
                sizes: '3840x2160',
                type: 'image/png',
                form_factor: 'wide',
                label: 'Tick'
            },
            {
                src: '/screenshots/desktop/desktop_2.png',
                sizes: '3840x2160',
                type: 'image/png',
                form_factor: 'wide',
                label: 'Tock'
            },
            {
                src: '/screenshots/mobile/mobile_1.png',
                sizes: '828x1792',
                type: 'image/png',
                form_factor: 'narrow',
                label: 'Tick'
            },
            {
                src: '/screenshots/mobile/mobile_2.png',
                sizes: '828x1792',
                type: 'image/png',
                form_factor: 'narrow',
                label: 'Tock',
            }
        ],
      },
    }),
  ],
});
