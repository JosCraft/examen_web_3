import React from 'react'
import { Toaster } from "@/components/ui/toaster";
import { Navbar } from '../nav';

interface MainlayoutProps {
    children: React.ReactNode
    }

const Mainlayout = (
    { children }: MainlayoutProps
) => {
  return (
    <div className='bg-indigo-950 flex flex-col min-h-screen'>
        <Navbar/>
      <main>
        {children}
      </main>
      <Toaster/>
    </div>
  )
}

export default Mainlayout
