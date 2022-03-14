import { createStyles } from '@mantine/core'

export const useLoginFormStyles = createStyles(theme => ({
	formContainer: {
		minHeight: '100vh',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	form: {
		maxWidth: '25rem',
		width: '100%',
		backgroundColor: theme.colors.dark[6],
		padding: theme.spacing.md,
		borderRadius: theme.radius.md,
		boxShadow: theme.shadows.sm,
	},
}))
