import React from 'react'
import ShoppingHeader from './header';
import { Outlet } from 'react-router-dom';
const Shopping = () => {
  return (
    <div className='flex flex-col bg-white overflow-hidden'>
      {/* Common HEader */}
      <ShoppingHeader />
      <main className='flex flex-col w-full'>
        <Outlet />
      </main>
    </div>
  )
}

export default Shopping;
