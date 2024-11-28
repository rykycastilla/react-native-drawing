import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { join } from 'node:path'

// https://vitejs.dev/config/
export default defineConfig( {
  plugins: [react()],
  resolve: {
    alias: {
      'react': join( __dirname, '../libs/react@18.2.0' ),
      '@components': join( __dirname, 'src/components' ),
      '@hooks': join( __dirname, 'src/hooks' ),
      '@utils': join( __dirname, 'src/utils' ),
      '@draw': join( __dirname, 'src/modules/draw' ),
      '@grid': join( __dirname, 'src/modules/grid' ),
      '@tools': join( __dirname, 'src/modules/tools' ),
      '@touch': join( __dirname, 'src/modules/touch' ),
    },
  },
} )
