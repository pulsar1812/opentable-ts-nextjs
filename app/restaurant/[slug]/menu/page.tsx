import Menu from '../components/Menu'
import RestaurantNavbar from '../components/RestaurantNavbar'

type Props = {}

export default function RestaurantMenu({}: Props) {
  return (
    <>
      <div className='bg-white w-[100%] rounded p-3 shadow'>
        <RestaurantNavbar />
        <Menu />
      </div>
    </>
  )
}
