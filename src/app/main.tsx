import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { SnackbarProvider } from 'notistack'
import { Provider } from 'react-redux'
import { store } from './store.ts'

const theme = createTheme({
	colorSchemes: {
		dark: true,
	},
})

createRoot(document.getElementById('root')!).render(
	<Provider store={store}>
		<SnackbarProvider>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<App />
			</ThemeProvider>
		</SnackbarProvider>
	</Provider>
)
