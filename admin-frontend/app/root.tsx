import { Global, MantineProvider } from '@mantine/core'
import { NotificationsProvider } from '@mantine/notifications'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import type { MetaFunction } from 'remix'
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from 'remix'

export const meta: MetaFunction = () => {
	return { title: 'New Remix App' }
}

const client = new QueryClient()

export default function App() {
	return (
		<html lang='en'>
			<head>
				<meta charSet='utf-8' />
				<meta name='viewport' content='width=device-width,initial-scale=1' />
				<Meta />
				<Links />
			</head>
			<body>
				<MantineProvider
					theme={{ colorScheme: 'dark' }}
					withNormalizeCSS
					withGlobalStyles
				>
					<NotificationsProvider>
						<Global
							styles={theme => ({
								'*,*::before,*::after': {
									margin: 0,
									padding: 0,
									boxSizing: 'border-box',
								},
							})}
						/>
						<QueryClientProvider client={client}>
							<ReactQueryDevtools />
							<Outlet />
						</QueryClientProvider>
					</NotificationsProvider>
				</MantineProvider>
				<ScrollRestoration />
				<Scripts />
				<LiveReload />
			</body>
		</html>
	)
}
