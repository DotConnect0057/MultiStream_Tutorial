import React from 'react'
import { Login } from "./Login"
import { useDispatch } from "react-redux"
import { selectScreen, selectView } from "../lib/ducs/slice";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export const Header = () => {
    const dispatch = useDispatch()



  return (
    <div className="flex w-full justify-between p-2">
        <div className="flex justify-start">
            <div className="flex mt-2">
                <div className="ml-2">
                    <Select defaultValue="single" onValueChange={(value) => dispatch(selectView(value))}>
                        <SelectTrigger className="w-[100px]">
                            <SelectValue placeholder="View" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="single">Single</SelectItem>
                            <SelectItem value="double">Double</SelectItem>
                            <SelectItem value="triple">Triple</SelectItem>
                            <SelectItem value="quad">Quad</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="ml-2">
                    <Select defaultValue="1" onValueChange={(value) => dispatch(selectScreen(value))}>
                        <SelectTrigger className="w-[50px]">
                            <SelectValue placeholder="Screen" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="1">1</SelectItem>
                            <SelectItem value="2">2</SelectItem>
                            <SelectItem value="3">3</SelectItem>
                            <SelectItem value="4">4</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* <div>Search Input</div>
            <div>button</div> */}
        </div>
        <div><Login /></div>
    </div>
  )
}
