import { NextRequest, NextResponse } from 'next/server'
import { headers } from "next/headers"
import _ from "lodash"

type chnData = {
    channel_id: string,
    channel_name: string,
    channel_platform: string,
    thumbnails: string,
    video_id: string,
    is_live: boolean
}

export async function GET (request: NextRequest) {
    const endpoint = "https://www.googleapis.com/youtube/v3/subscriptions?part=snippet&mine=true"
    const video_endpoint = "https://www.googleapis.com/youtube/v3/search?eventType=live&type=video"
    const params = headers()
    const token = params.get('authorization')
    // let data = []
    const bearer = _.replace(token, "OAuth", "Bearer")
    const channels = await fetch(endpoint, {
        headers: {
            "Authorization": bearer
        }
    }).then((d) => {return d.json()})

    let datas: chnData[] = []
    await Promise.all(
        channels.items.map(async (i) => {
            const tmp = await fetch(video_endpoint+"&channelId="+i.snippet.resourceId.channelId, {
                headers: {
                    "Authorization": bearer
                }
            }).then((d) => {return d.json()})
            let value
            if (tmp.items.length === 0) {
                value = {
                    channel_id: i.snippet.resourceId.channelId,
                    channel_name: i.snippet.title,
                    channel_platform: "youtube",
                    thumbnails: i.snippet.thumbnails.medium.url,
                    video_id: "",
                    is_live: false,
                }
            } else {
                value = {
                    channel_id: i.snippet.resourceId.channelId,
                    channel_name: i.snippet.title,
                    channel_platform: "youtube",
                    thumbnails: i.snippet.thumbnails.medium.url,
                    video_id: tmp.items[0].id.videoId,
                    is_live: true,
                }
            }
            datas.push(value)
    }))
    // console.log(datas, "test")
    return NextResponse.json({message: datas})
}