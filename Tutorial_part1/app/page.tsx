"use client"
import { Header } from "@/components/Header"
import Image from 'next/image'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import Head from "next/head"


export default function Home() {
  return (
    <main className="min-h-screen flex-col items-center p-4">
      <ResizablePanelGroup
        direction="horizontal"
        className="rounded-lg border"
      >
        <ResizablePanel defaultSize={20} minSize={5} maxSize={25}>
          <div className="flex h-[95vh] items-center justify-center p-6">
            <span className="font-semibold">Sidebar</span>
          </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={80}>
          <div className="flex flex-col">
            <div className="flex h-12 items-center justify-center p-2">
              <Header />
            </div>
            <div className="flex w-full h-full items-center justify-center p-2">
              <span className="font-semibold">Main</span>
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
