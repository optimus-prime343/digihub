import { Button } from '@mantine/core'
import Image from 'next/image'
import { ChangeEvent, FC, useState } from 'react'

import { IUser } from '@/types/user'
import { getProfileImageUrl } from '@/utils/getImageUrl'

interface UpdateProfileImageFormProperties {
  user: IUser
}

const ProfileImageForm: FC<UpdateProfileImageFormProperties> = ({ user }) => {
  const [image, setImage] = useState<File | undefined>()
  const [imageUrl, setImageUrl] = useState<string | undefined>()
  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      setImageUrl(URL.createObjectURL(files[0]))
      setImage(files[0])
    }
  }
  const handleProfileChange = () => {
    console.log(image)
    if (image) {
      alert('TODO: UPDATE PROFILE IMAGE ON THE SERVER')
    }
  }
  return (
    <div className='flex flex-col items-center gap-2'>
      <input
        accept='image/*'
        className='hidden'
        id='profile-image'
        onChange={handleFileUpload}
        type='file'
      />
      <label htmlFor='profile-image'>
        <Image
          alt={`${user.username} Profile`}
          className='h-24 w-24 rounded-full border border-red-600'
          height={100}
          objectFit='cover'
          src={imageUrl ?? getProfileImageUrl(user.image)}
          width={100}
        />
      </label>
      {imageUrl && (
        <Button
          className='mb-4 bg-indigo-600'
          onClick={handleProfileChange}
          type='submit'
        >
          Change Profile Image
        </Button>
      )}
    </div>
  )
}

export default ProfileImageForm
