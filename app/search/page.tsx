import { PRICE, PrismaClient } from '@prisma/client'
import RestaurantCard from './components/RestaurantCard'
import SearchHeader from './components/SearchHeader'
import SearchSidebar from './components/SearchSidebar'

const prisma = new PrismaClient()

interface SearchParams {
  city?: string
  cuisine?: string
  price?: PRICE
}

const fetchRestaurantsByCity = (searchParams: SearchParams) => {
  const where: any = {}

  if (searchParams.city) {
    const location = {
      name: {
        equals: searchParams.city.toLowerCase(),
      },
    }
    where.location = location
  }
  if (searchParams.cuisine) {
    const cuisine = {
      name: {
        equals: searchParams.cuisine.toLowerCase(),
      },
    }
    where.cuisine = cuisine
  }
  if (searchParams.price) {
    const price = {
      equals: searchParams.price,
    }
    where.price = price
  }

  const select = {
    id: true,
    name: true,
    main_image: true,
    price: true,
    cuisine: true,
    location: true,
    slug: true,
  }

  return prisma.restaurant.findMany({
    where,
    select,
  })
}

export default async function Search({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  const restaurants = await fetchRestaurantsByCity(searchParams)

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
