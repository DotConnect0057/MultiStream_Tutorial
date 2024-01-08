"use client"
import { Header } from "@/components/Header"
import Image from 'next/image'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import Head from "next/head"
import { Sidebar } from "@/components/Sidebar"
import { useState } from "react"
import { StreamScreen } from "@/components/StreamScreen"


export default function Home() {
  const defaultSize = 15
  const [width, setWidth] = useState(defaultSize)
  return (
    <main className="min-h-screen flex-col items-center p-4">
      <ResizablePanelGroup
        direction="horizontal"
        className="rounded-lg border"
      >
        <ResizablePanel 
          defaultSize={defaultSize}
          collapsedSize={5}
          collapsible={true}
          minSize={5}
          maxSize={25}
          onResize={(size) => {setWidth(size)}}
        >
          <div className="flex h-[95vh] items-center justify-center p-6">
            <Sidebar width={width} />
          </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={80}>
          <div className="flex flex-col w-full">
            <div className="flex h-12 items-center justify-center p-2">
              <Header />
            </div>
            <div className="flex aspect-video max-w-[98%] items-center justify-center p-2">
              <StreamScreen />
              {/* <span className="font-semibold">Main</span> */}
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>


      {/* <div className="h-12 w-full">
        <Header />
      </div>
      <div className="flex h-full w-full">
        <div className="w-24">
          sidebar
        </div>
        <div className="w-full">
          contents
        </div>
      </div> */}
    </main>
  )
}
