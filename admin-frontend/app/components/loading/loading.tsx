import { Loader } from '@mantine/core'

import { useLoadingStyles } from './loading.styles'

export const Loading = () => {
	const { classes } = useLoadingStyles()
	return (
		<div className={classes.container}>
			<Loader size={75} />
		</div>
	)
}
