import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import 'vuetify/styles'

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        colors: {
          primary: '#0066cc',
          secondary: '#6c757d',
          accent: '#17a2b8',
          error: '#dc3545',
          success: '#155724',
          info: '#0c5460',
          warning: '#856404',
        }
      }
    }
  }
})

export default vuetify
