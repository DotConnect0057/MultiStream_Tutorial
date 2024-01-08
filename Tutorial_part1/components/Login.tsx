"use client"
import { signIn, signOut, useSession } from "next-auth/react"
import React, { useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Moon, Sun } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubTrigger,
    DropdownMenuSubContent,
    DropdownMenuPortal,
} from "@/components/ui/dropdown-menu"
//   import Image from 'next/image'
import { useTheme } from "next-themes";
import { TbPlugConnected } from "react-icons/tb";
import { PiPlugsConnectedBold } from "react-icons/pi";

import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { saveLoginSession, saveTwitchSession, saveYoutubeSession, twitchChannels, youtubeChannels } from "../lib/ducs/slice"
import { persistor } from "../lib/ducs/store"


export const Login = () => {
    const {data: session, status} = useSession()
    const { setTheme } = useTheme();
    // console.log(session.accessToken)
    const dispatch = useDispatch();
    const loginSession = useSelector((state) => state.counter.loginSession);
    const twitchSession = useSelector((state) => state.counter.twitchSession);
    const youtubeSession = useSelector((state) => state.counter.youtubeSession);

    const handleSignIn = () => {
        signIn();
    }
    const handleSignOut = () => {
        persistor.purge()
        signOut()
    }

    useEffect(() => {
        dispatch(saveLoginSession(session))
        if (session?.provider === "twitch") {
            dispatch(saveTwitchSession(session))
        }
        if (session?.provider === "google") {
            dispatch(saveYoutubeSession(session))
        }
    }, [session])
    // console.log('login'+loginSession?.accessToken)
    // console.log('twitch'+twitchSession?.accessToken)
    // console.log('youtube'+youtubeSession?.accessToken)
    

    if(session?.user?.image) {
        return (
            <>
                <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <Avatar>
                            <AvatarImage src={session.user.image} />
                            <AvatarFallback>UN</AvatarFallback>
                        </Avatar>
                    <span className="sr-only">Toggle theme</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>My Account: {session?.user?.name}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => handleSignOut()}>
                    <span>Sign-out</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => signIn("twitch")}>
                        {twitchSession?.accessToken !== undefined ?
                            <>
                                <span>Connect Twitch</span><span className="ml-2 text-green-500"><PiPlugsConnectedBold /></span>
                            </>
                        :
                            <>
                                <span>Connect Twitch</span><span className="ml-2"><TbPlugConnected /></span>
                            </>
                        }
                    </DropdownMenuItem>

                    <DropdownMenuItem onClick={() => signIn("google")}>
                        {youtubeSession?.accessToken !== undefined ?
                            <>
                                <span>Connect Youtube</span><span className="ml-2 text-green-500"><PiPlugsConnectedBold /></span>
                            </>
                        :
                            <>
                                <span>Connect Youtube</span><span className="ml-2"><TbPlugConnected /></span>
                            </>
                        }
                    </DropdownMenuItem>

                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger>
                        <Moon className="mr-2 h-4 w-4" />
                        <span>Design</span>
                        </DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                        <DropdownMenuSubContent>
                            <DropdownMenuItem onClick={() => setTheme("dark")}>
                            <Moon className="mr-2 h-4 w-4" />
                            <span>Dark Mode</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setTheme("light")}>
                            <Sun className="mr-2 h-4 w-4" />
                            <span>Light Mode</span>
                            </DropdownMenuItem>
                        </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                    </DropdownMenuSub>
                </DropdownMenuContent>
                </DropdownMenu>
            </>
        )
    } else {
        return (
            <>
                <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon">
                        <Avatar>
                            <AvatarFallback>UN</AvatarFallback>
                        </Avatar>
                    <span className="sr-only">Toggle theme</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Guest</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => handleSignIn()}>
                    <span>Sign-In</span>
                    </DropdownMenuItem>

                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger>
                        <Moon className="mr-2 h-4 w-4" />
                        <span>Design</span>
                        </DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                        <DropdownMenuSubContent>
                            <DropdownMenuItem onClick={() => setTheme("dark")}>
                            <Moon className="mr-2 h-4 w-4" />
                            <span>Dark Mode</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setTheme("light")}>
                            <Sun className="mr-2 h-4 w-4" />
                            <span>Light Mode</span>
                            </DropdownMenuItem>
                        </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                    </DropdownMenuSub>
                </DropdownMenuContent>
                </DropdownMenu>
            </>
        )
    }}
