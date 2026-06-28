import { UserMenuWithSession } from '@/features/auth/components/user-menu'

const Dashboard = () => {
  return (
    <div>
      <div>Dashboard</div>
      <UserMenuWithSession variant='compact' />
    </div>
  )
}

export default Dashboard