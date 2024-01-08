import React from 'react'
import { Login } from "./Login"

export const Header = () => {
  return (
    <div className="flex w-full justify-between p-2">
        <div className="flex justify-start">
            <div>Search Input</div>
            <div>button</div>
        </div>
        <div><Login /></div>
    </div>
  )
}
