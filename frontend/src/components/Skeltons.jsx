import { Skeleton } from '@nextui-org/react'
import React from 'react'

const ProfileSkelton = () => {
  return (
    <div className=" md:w-[400px] flex flex-col gap-2">
    <Skeleton className="h-10 w-3/5 rounded-lg" />
    <Skeleton className="h-10 w-5/5 rounded-lg" />
    <Skeleton className="h-10 w-4/5 rounded-lg" />
    <Skeleton className="h-10 w-3/5 rounded-lg" />
    <Skeleton className="h-10 w-2/5 rounded-lg" />
  </div>
  )
}

export default ProfileSkelton