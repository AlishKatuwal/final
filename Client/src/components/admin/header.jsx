import React from 'react'
import Button from '../ui/button'
import { AlignJustify } from 'lucide-react'
import { LogOut } from 'lucide-react'

function Header({setOpen}) {
  return (
    <header className='flex items-center justify-between px-4 py-3 bg-background border-b'>
     <Button onClick={() => setOpen(true)}
     >
        <AlignJustify />
    
     </Button>
      <div className=' flex flex-1 justify-end'>
        <Button  className="inline-flex gap-2 items-center rounded-md px-4 py-2 text-sm font-medium shadow">
        <LogOut />
         Logout
        </Button>

      </div>
    </header>
  )
}
export default Header;
