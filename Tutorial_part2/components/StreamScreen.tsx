import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux"
import { StreamBox } from "./StreamBox"

export const StreamScreen = () => {
    const screen = useSelector((state) => state.counter.screen)
    const view = useSelector((state) => state.counter.view)
    const selectId = useSelector((state) => state.counter.chnId)
    const selectPlt = useSelector((state) => state.counter.platform)
    const [screen1Info, setScreen1Info] = useState({id: "", plt: "twitch"})
    const [screen2Info, setScreen2Info] = useState({id: "", plt: ""})
    const [screen3Info, setScreen3Info] = useState({id: "", plt: ""})
    const [screen4Info, setScreen4Info] = useState({id: "", plt: ""})

    useEffect(() => {
        console.log(screen1Info.id)
        // setScreen1Info({id: selectId, plt:selectPlt})
        switch (screen) {
            case "1":
                setScreen1Info({id: selectId, plt:selectPlt})
                break;
            case "2":
                setScreen2Info({id: selectId, plt:selectPlt})
                break;
            case "3":
                setScreen3Info({id: selectId, plt:selectPlt})
                break;
            case "4":
                setScreen4Info({id: selectId, plt:selectPlt})
                break;
            default:
                setScreen1Info({id: selectId, plt:selectPlt})
                break;
        }    
    },[selectId, screen])

    return (
        <div className="w-full h-full">
            {selectId == "" ? <>Loading</> 
            :
            <div className="w-full h-full">
                { view === "single" &&
                    <div className="aspect-video max-w-[98%]">
                        <StreamBox streamId={screen1Info.id} platform={screen1Info.plt} chat={false} />
                    </div>
                }
        
                { view === "double" &&
                    <div className="grid grid-cols-2 gap-2 max-w-[98%]">
                        <div className="aspect-video">
                            <StreamBox streamId={screen1Info.id} platform={screen1Info.plt} chat={false} />
                        </div>
                        <div className="aspect-video">
                            <StreamBox streamId={screen2Info.id} platform={screen2Info.plt} chat={false} />
                        </div>
                    </div>
                }
        
                { view === "triple" &&
                    <div className="h-max">
                        <div className="mx-auto max-w-[1600px] py-24 sm:px-2 sm:py-4 lg:px-4">
                            <div className="mx-auto max-w-2xl px-4 lg:max-w-none">
                                <div key="1" className="grid grid-cols-1 items-center lg:grid-cols-1">
                                    <StreamBox streamId={screen1Info.id} platform={screen1Info.plt} chat={false} />
                                </div>
                                <div className="mt-2 grid grid-cols-1 gap-x-2 gap-y-2 lg:grid-cols-2">
                                    <div key="2" className="sm:flex lg:block">
                                        <StreamBox streamId={screen2Info.id} platform={screen2Info.plt} chat={false} />
                                    </div>
                                    <div key="3" className="sm:flex lg:block">
                                        <StreamBox streamId={screen3Info.id} platform={screen3Info.plt} chat={false} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
        
                { view === "quad" &&
                    <div className="grid grid-rows-2 max-w-[98%]">
                        <div className="grid grid-cols-2 gap-2 mb-2">
                            <div className="aspect-video">
                                <StreamBox streamId={screen1Info.id} platform={screen1Info.plt} chat={false} />
                            </div>
                            <div className="aspect-video">
                                <StreamBox streamId={screen2Info.id} platform={screen2Info.plt} chat={false} />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <div className="aspect-video">
                                <StreamBox streamId={screen3Info.id} platform={screen3Info.plt} chat={false} />
                            </div>
                            <div className="aspect-video">
                                <StreamBox streamId={screen4Info.id} platform={screen4Info.plt} chat={false} />
                            </div>
                        </div>
                    </div>
                }
            </div>
        }
        </div>
    )
}
