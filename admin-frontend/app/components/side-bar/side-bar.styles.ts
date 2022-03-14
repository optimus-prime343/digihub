import { createStyles } from '@mantine/core'

export const useSideBarStyles = createStyles(theme => ({
	nav: {
		backgroundColor: theme.colors.dark['6'],
		paddingInline: theme.spacing.md,
		paddingBlock: theme.spacing.xs,
		borderRadius: theme.radius.md,
		boxShadow: theme.shadows.sm,
		maxWidth: '20rem',
		width: '100%',
	},
	logo: {
		height: '75px',
		width: '100%',
		objectFit: 'cover',
		borderRadius: theme.radius.md,
	},
	container: {
		listStyle: 'none',
	},
	sidebarLink: {
		display: 'block',
		textDecoration: 'none',
		color: theme.colors.gray[1],
		padding: theme.spacing.md,
		borderRadius: theme.radius.md,
		fontSize: theme.fontSizes.lg,
		'&:not(first-child)': {
			marginTop: theme.spacing.xs,
		},
		'&:hover': {
			backgroundColor: theme.colors.dark[5],
			cursor: 'pointer',
		},
		'&.active': {
			background: theme.colors.indigo[6],
			color: theme.colors.gray[0],
			boxShadow: theme.shadows.md,
		},
	},
}))
