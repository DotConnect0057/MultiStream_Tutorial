import React, { useEffect } from 'react'
import { useSelector } from "react-redux"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useDispatch } from "react-redux"
import { selected } from "../lib/ducs/slice"

interface SideProps {
    width: number
}

interface chnInfo {
    name: string,
    id: string,
    platform: string,
}

export const Sidebar = ( {width}: SideProps ) => {
    const tchannels:any = useSelector((state) => state.counter.tchannels)
    const ychannels:any = useSelector((state) => state.counter.ychannels)
    // console.log(tchannels)
    const dispatch = useDispatch();
    const handleClick = (name:string, id:string, platform:string) => {
        const chnInfo:chnInfo = {
            name: name,
            id: id,
            platform: platform
        }
        dispatch(selected(chnInfo))
    }

  return (
    <div className="text-xs">
        {tchannels.data !== undefined && (
            tchannels.data.map((link:any) => (
                <button key={link.id} className="flex m-2 space-x-2" onClick={() => handleClick(link.display_name, link.login, tchannels.platform)}>
                    <Avatar className="h-[24px] w-[24px]">
                        <AvatarImage src={link.profile_image_url} />
                        <AvatarFallback>UN</AvatarFallback>
                    </Avatar>
                    {width >= 10 && (
                        <div>{link.display_name}</div>
                    )}
                    
                </button>
                
            ))
        )}
    </div>
  )
}