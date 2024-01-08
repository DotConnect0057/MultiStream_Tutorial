import { NextRequest, NextResponse } from 'next/server'
import { headers } from "next/headers"

export async function GET (request: NextRequest) {
    const param = request.nextUrl.searchParams.get('name')
    const yourName = `${param || 'dc'}`
    const mytoken = headers()
    console.log(mytoken.get('authorization'))
    return NextResponse.json({message: "hello", name: yourName})
}