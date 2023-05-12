import { PrismaClient, Cuisine, Location, PRICE } from '@prisma/client'

import Header from './components/Header'
import RestaurantCard from './components/RestaurantCard'

export interface RestaurantCardType {
  id: number
  name: string
  main_image: string
  slug: string
  cuisine: Cuisine
  location: Location
  price: PRICE
}

const prisma = new PrismaClient()

const fetchRestaurants = async (): Promise<RestaurantCardType[]> => {
  const restaurants = await prisma.restaurant.findMany({
    select: {
      id: true,
      name: true,
      main_image: true,
      slug: true,
      cuisine: true,
      location: true,
      price: true,
    },
  })

  return restaurants
}

export default async function Home({}: RestaurantCardType) {
  const restaurants = await fetchRestaurants()

  console.log(restaurants[0])

  return (
    <main>
      <Header />
      {/* Cards */}
      <div className='py-3 px-36 mt-10 flex flex-wrap justify-center'>
        {restaurants.map((restaurant) => (
          <RestaurantCard restaurant={restaurant} />
        ))}
      </div>
    </main>
  )
}
