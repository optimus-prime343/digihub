import { Button, Divider, PasswordInput, TextInput, Title } from '@mantine/core'
import { useNotifications } from '@mantine/notifications'
import { useFormik } from 'formik'
import { FaUser } from 'react-icons/fa'
import { MdPassword } from 'react-icons/md'

import { useLogin } from '~/hooks/auth'
import { loginSchema } from '~/schemas/login-schema'

import { useLoginFormStyles } from './login-form.styles'

export const LoginForm = () => {
	const { showNotification } = useNotifications()
	const login = useLogin()

	const { classes } = useLoginFormStyles()

	const { handleSubmit, errors, touched, getFieldProps } = useFormik({
		initialValues: {
			username: '',
			password: '',
		},
		validationSchema: loginSchema,
		onSubmit: async values => {
			try {
				await login(values)
			} catch (error: any) {
				showNotification({
					color: 'red',
					title: 'Login Failed',
					message: error.message,
				})
			}
		},
	})
	const getFieldError = (fieldName: keyof typeof errors) =>
		errors[fieldName] && touched[fieldName] ? errors[fieldName] : undefined
	return (
		<div className={classes.formContainer}>
			<form onSubmit={handleSubmit} className={classes.form}>
				<Title
					order={2}
					mb='lg'
					align='center'
					sx={() => ({ textTransform: 'uppercase' })}
				>
					Admin login
				</Title>
				<Divider my='xs' />
				<TextInput
					icon={<FaUser />}
					width={'100%'}
					label='username'
					placeholder='JohnDoe'
					error={getFieldError('username')}
					{...getFieldProps('username')}
				/>
				<PasswordInput
					icon={<MdPassword />}
					label='password'
					placeholder='********'
					error={getFieldError('password')}
					{...getFieldProps('password')}
				/>
				<Button mt='md' fullWidth type='submit'>
					Login
				</Button>
			</form>
		</div>
	)
}
