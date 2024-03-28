import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <div className='bg-orange-100'>
      <nav className='container mx-auto lg:px-2 px-5 lg:w-3/5'>
        <div className='container flex items-center justify-between mx-auto'>
          <Link href={"/"} className='text-2xl font-medium text-amber-900'>UchiUchi</Link>
          <div>
            <ul className='flex items-center text-sm py-4'>
              <li>
                <Link 
                  href={"/"} 
                  className='block px-4 py-2 text-amber-900 hover:text-yellow-500 transition-all duration-300'
                >Home</Link>
              </li>
              <li>
                <Link 
                  href={"/about"} 
                  className='block px-4 py-2 text-amber-900 hover:text-yellow-500 transition-all duration-300'
                >About</Link>
              </li>
              <li>
                <Link 
                  href={"/profile"} 
                  className='block px-4 py-2 text-amber-900 hover:text-yellow-500 transition-all duration-300'
                >Profile</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>      
    </div>

  )
}

export default Navbar