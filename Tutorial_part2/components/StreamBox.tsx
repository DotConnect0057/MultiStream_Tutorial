import React from 'react'
import ReactPlayer from "react-player"
import { TwitchChat } from "react-twitch-embed"
import "./Player.css"

type Props = {
    streamId: string,
    platform: string,
    chat: boolean,
}

type ChatProps = {
    id: string,
}

const YoutubeChat = ({id}: ChatProps) => {
    const endpoint = `https://www.youtube.com/live_chat?v=${id}&embed_domain=localhost`
    return (
        <>
            <iframe width="280" height="100%"
                src={endpoint} frameborder="0"
            />
        </>
    )
}

export const StreamBox = ({ streamId, platform, chat=false }: Props) => {
  const youtubeEndpoint = "https://www.youtube.com/watch?v="+streamId
  const twitchEndpoint = "https://www.twitch.tv/"+streamId

  let chatClass = "col-span-4 player-wrapper"
  if (chat) {
    chatClass = "col-span-3 player-wrapper"
  }

  return (
    <div className="w-full h-min-[550px] h-full shadow-2xl shadow-indigo-500/50">
        { platform === "twitch" &&
            <div className="grid grid-cols-4 h-full">
                <div className={chatClass}>
                    <ReactPlayer className="react-player" url={twitchEndpoint}
                    width="100%" height="100%" playing controls={true}
                    />
                </div>
                { chat &&
                <div className="">
                    <TwitchChat channel={streamId} width="280" />
                </div>
                }
            </div>
        }

        { platform === "youtube" &&
            <div className="grid grid-cols-4 h-full">
                <div className={chatClass}>
                    <ReactPlayer className="react-player" url={youtubeEndpoint}
                    width="100%" height="100%" playing controls={true}
                    />
                </div>
                { chat &&
                <div className="">
                    <YoutubeChat id={streamId} />
                </div>
                }
            </div>
        }


    </div>

  )
}
