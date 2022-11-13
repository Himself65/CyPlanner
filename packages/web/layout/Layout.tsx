import { Header } from '../components/Header'
import React from 'react'

export type LayoutProps = {
  className?: string
}

export const Layout: React.FC<React.PropsWithChildren<LayoutProps>> = (props) => {
  return (
    <div className='bg-white'>
      <Header/>
      <main
        className={'mb-auto mx-auto max-w-3xl px-4 sm:px-6 xl:max-w-5xl xl:px-0 w-full ' +
          props.className}>
        {props.children}
      </main>
    </div>
  )
}
