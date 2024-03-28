import React from 'react'
import Navbar from './Navbar/Navbar'
import TitleVar from './Title/TitleVar'

const Layout = ({ children }: any) => {
  return (
    <div>
      <Navbar />
      <TitleVar />
      {children}
    </div>
  )
}

export default Layout