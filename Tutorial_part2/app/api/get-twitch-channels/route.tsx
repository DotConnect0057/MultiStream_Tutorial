import { NextRequest, NextResponse } from 'next/server'
import { headers } from "next/headers"
import _ from "lodash"

const validate_endpoint = "https://id.twitch.tv/oauth2/validate"
const get_follow_endpoint = "https://api.twitch.tv/helix/channels/followed?user_id="
const channel_endpoint = "https://api.twitch.tv/helix/users"
let client_id :string = ""

export async function GET (request: NextRequest) {
    const param = request.nextUrl.searchParams.get('name')
    const params = headers()
    const token = params.get('authorization')
    console.log(token)

    const userInfo = await fetch(validate_endpoint, {
        headers: {
            "Authorization": token
        }
    }).then((d) => {return d.json()})
    const clientId = userInfo.client_id
    const bearer = _.replace(token, "OAuth", "Bearer")

    const followsInfo = await fetch(get_follow_endpoint+userInfo.user_id, {
        headers: {
            "Authorization": bearer,
            "Client-id": clientId
        }
    }).then((r) => r.json())
    .then((d) => {
        let channelList: string = ""
        const result = d.data.map((value, index) => {
            if (index === 0) {
                channelList = channelList + "?login=" + value.broadcaster_login
            } else {
                channelList = channelList + "&login=" + value.broadcaster_login
            }
        })
        return channelList
    })

    const channelsInfo = await fetch(channel_endpoint+followsInfo, {
        headers: {
            "Authorization": bearer, 
            "Client-id": clientId
        }
    }).then((d) => {return d.json()})
    const message = {data: channelsInfo.data, platform: "twitch"}
    console.log(followsInfo)

    return NextResponse.json({message: message})
}