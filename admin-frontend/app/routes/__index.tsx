import { Alert, createStyles } from '@mantine/core'
import { Outlet } from 'remix'

import { Loading } from '~/components/loading'
import { LoginForm } from '~/components/login-form'
import { SideBar } from '~/components/side-bar'
import { useUser } from '~/hooks/auth'
import { UserRole } from '~/typings/user'

const AdminPageLayout = () => {
	const { data: user, isLoading } = useUser()
	const { classes } = useStyles()
	if (isLoading) return <Loading />
	if (!user) return <LoginForm />
	if (user.role !== UserRole.ADMIN)
		return (
			<Alert variant='filled' color='red' title='Unauthorized!'>
				You are not authorized to view this page
			</Alert>
		)
	return (
		<div className={classes.container}>
			<SideBar />
			<Outlet />
		</div>
	)
}
const useStyles = createStyles(theme => ({
	container: {
		padding: theme.spacing.lg,
		display: 'flex',
		gap: theme.spacing.lg,
		alignItems: 'flex-start',
	},
}))

export default AdminPageLayout
