import { PrismaClient } from '@prisma/client'
import RestaurantCard from './components/RestaurantCard'
import SearchHeader from './components/SearchHeader'
import SearchSidebar from './components/SearchSidebar'

const prisma = new PrismaClient()

const fetchRestaurantsByCity = async (city: string | undefined) => {
  if (!city) return await prisma.restaurant.findMany()

  const restaurants = await prisma.restaurant.findMany({
    where: {
      location: {
        name: {
          equals: city.toLowerCase(),
        },
      },
    },
    select: {
      id: true,
      name: true,
      main_image: true,
      slug: true,
      price: true,
      cuisine: true,
      location: true,
    },
  })

  return restaurants
}

export default async function Search({
  searchParams,
}: {
  searchParams: { city: string }
}) {
  const restaurants = await fetchRestaurantsByCity(searchParams.city)

  return (
    <>
      <SearchHeader />
      <div className='flex py-4 m-auto w-2/3 justify-between items-start'>
        <SearchSidebar />
        <div className='w-5/6'>
          {restaurants.length ? (
            <>
              {restaurants.map((restaurant) => (
                <RestaurantCard key={restaurant.id} restaurant={restaurant} />
              ))}
            </>
          ) : (
            <p>No restaurants found</p>
          )}
        </div>
      </div>
    </>
  )
}
