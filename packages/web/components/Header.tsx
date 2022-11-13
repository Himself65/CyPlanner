import { useAuth, UserProfile, useUser } from '@clerk/nextjs'
import { Dialog, Transition, Menu } from '@headlessui/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Fragment, useState } from 'react'

const navigation: any[] = [
  { name: 'Create', href: '/create' }
  // { name: 'Document', href: '/docs' }
]

function classNames (...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export const Header = () => {
  const auth = useAuth()
  const router = useRouter()
  const { user } = useUser()
  const [isOpenUserProfile, setIsOpenUserProfile] = useState(false)
  return (
    <>
      <nav className="bg-red-700">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div
              className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex flex-shrink-0 items-center">
                <Link href="/">
                  <h1
                    className="flex-auto text-lg font-semibold text-white cursor-pointer">
                    CyPlanner
                  </h1>
                </Link>
              </div>
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4">
                  {navigation.map((item) => {
                    const isCurrent = router.pathname === item.href
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                      >
                        <p
                          className={classNames(
                            'bg-yellow-500 text-red-700',
                            'px-3 py-2 rounded-md text-sm font-medium'
                          )}
                          aria-current={isCurrent ? 'page' : undefined}
                        >
                          {item.name}
                        </p>
                      </Link>
                    )
                  })}
                </div>
              </div>
            </div>
            <div
              className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              {
                <Menu as="div" className="relative ml-3">
                  <div>
                    {
                      user ? (
                        <Menu.Button>
                          <span className="sr-only">Open user menu</span>
                          <picture>
                            <source srcSet={user?.profileImageUrl}
                                    type="image/jpeg"/>
                            <img
                              className="h-8 w-8 rounded-full"
                              src={user?.profileImageUrl}
                              alt="user avatar"
                            />
                          </picture>
                        </Menu.Button>
                      ) : (
                        <button
                          className="px-4 py-2 font-semibold text-sm bg-yellow-300 text-red-700 rounded-full shadow-sm"
                          onClick={(event) => {
                            event.preventDefault()
                            router.push('/sign-up')
                          }}
                        >
                          Sign Up
                        </button>
                      )
                    }
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items
                      className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            onClick={() => {
                              setIsOpenUserProfile(true)
                            }}
                            className={classNames(active ? 'bg-gray-100' : '',
                              'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Profile
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(active ? 'bg-gray-100' : '',
                              'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Settings
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            onClick={() => {
                              auth.signOut().then(() => router.replace('/sign-in'))
                            }}
                            className={classNames(active ? 'bg-gray-100' : '',
                              'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Sign out
                          </a>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              }
            </div>
          </div>
        </div>
      </nav>
      <Transition appear show={isOpenUserProfile} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => {
            setIsOpenUserProfile(false)
          }}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25"/>
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto">
            <div
              className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child>
                <Dialog.Panel>
                  <UserProfile/>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
