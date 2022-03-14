import { Divider } from '@mantine/core'
import { NavLink } from 'remix'

import { useSideBarStyles } from './side-bar.styles'

export const SideBar = () => {
	const { classes } = useSideBarStyles()
	return (
		<nav className={classes.nav}>
			<img src='/images/logo.png' alt='Digihub Logo' className={classes.logo} />
			<Divider my='lg' />
			<ul className={classes.container}>
				{sidebarLinks.map(sidebarLink => (
					<li key={sidebarLink.name}>
						<NavLink
							className={({ isActive }) =>
								`${classes.sidebarLink} ${isActive ? 'active' : ''}`
							}
							to={sidebarLink.path}
						>
							{sidebarLink.name}
						</NavLink>
					</li>
				))}
			</ul>
		</nav>
	)
}
const sidebarLinks = [
	{
		name: 'Users',
		path: '/users',
	},
	{
		name: 'Merchants',
		path: '/merchants',
	},
	{
		name: 'Products',
		path: '/products',
	},
	{
		name: 'Orders',
		path: '/orders',
	},
]
