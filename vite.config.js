import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { createHtmlPlugin } from 'vite-plugin-html';


export default defineConfig({
  //DESCOMENTAR SOLO EL PRIMERO PARA PRODUCCION
  plugins: [react()
    , 
    createHtmlPlugin({
    inject: {
      injectData: {
        head: `
          <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">
        `,
      },
    },
  }),
],
// server: {
//   proxy: {
//     '/api': {
//       target: 'http://sheets.devcrackthecode.net', // URL base de tu servidor NocoDB
//       changeOrigin: true,
//       rewrite: (path) => path.replace(/^\/api/, '') // Ajusta según la estructura de tu API
//     }
//   }
// }
})
// EN LOCAL CORRER LA PROXY CON LA URL DEL API  lcp --proxyUrl http://sheets.devcrackthecode.net/api/v1/db/data/v1/crack_sheets/seguimiento_quincenal 