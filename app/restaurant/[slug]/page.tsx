import Link from 'next/link'
import { PrismaClient } from '@prisma/client'

import Description from './components/Description'
import Images from './components/Images'
import Rating from './components/Rating'
import ReservationCard from './components/ReservationCard'
import RestaurantNavbar from './components/RestaurantNavbar'
import Reviews from './components/Reviews'
import Title from './components/Title'

interface Restaurant {
  id: number
  name: string
  images: string[]
  description: string
  slug: string
}

const prisma = new PrismaClient()

const fetchRestaurantBySlug = async (slug: string): Promise<Restaurant> => {
  const restaurant = await prisma.restaurant.findUnique({
    where: {
      slug,
    },
    select: {
      id: true,
      name: true,
      images: true,
      description: true,
      slug: true,
    },
  })

  if (!restaurant) {
    throw new Error()
  }

  return restaurant
}

export default async function RestaurantDetails({
  params,
}: {
  params: { slug: string }
}) {
  const restaurant = await fetchRestaurantBySlug(params.slug)

  const { slug, name, description, images } = restaurant

  return (
    <>
      <div className='bg-white w-[70%] rounded p-3 shadow'>
        <RestaurantNavbar slug={slug} />
        <Title name={name} />
        <Rating />
        <Description description={description} />
        <Images images={images} />
        <Reviews />
      </div>
      <div className='w-[27%] relative text-reg'>
        <ReservationCard />
      </div>
    </>
  )
}
