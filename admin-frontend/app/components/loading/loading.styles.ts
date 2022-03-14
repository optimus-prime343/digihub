import { createStyles } from '@mantine/core'

export const useLoadingStyles = createStyles(theme => ({
	container: {
		position: 'fixed',
		inset: 0,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
}))
