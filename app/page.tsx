import Link from 'next/link'

import Header from './components/Header'
import RestaurantCard from './components/RestaurantCard'

type Props = {}

export default function Home({}: Props) {
  return (
    <main>
      <Header />
      {/* Cards */}
      <div className='py-3 px-36 mt-10 flex flex-wrap justify-center'>
        <RestaurantCard />
      </div>
    </main>
  )
}
