import { IMerchant } from '@/types/merchant'
import { IUser } from '@/types/user'

interface Props {
  sender: IUser
  receiver: IUser
}
export const ChatBox = ({ sender, receiver }: Props) => {
  console.table('RERENDER')
  return (
    <div>
      <pre>{JSON.stringify(sender, null, 4)}</pre>
      <pre>{JSON.stringify(receiver, null, 4)}</pre>
    </div>
  )
}
