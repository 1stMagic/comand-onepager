import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from "unplugin-vue-components/vite"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), Components({resolvers: [(componentName) => {
      if(componentName.startsWith("Cmd")) {
        return {
          name: componentName,
          from: "comand-component-library"
        }
      }
    }]})]
})
