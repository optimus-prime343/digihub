import { CreateAdminForm } from '../components/create-admin-form'
import { Sidebar } from '../components/sidebar'

const CreateAdmin = () => {
  return (
    <Sidebar>
      <div className='max-w-md rounded-md bg-gray-600 p-4 shadow-sm'>
        <CreateAdminForm />
      </div>
    </Sidebar>
  )
}

export default CreateAdmin
