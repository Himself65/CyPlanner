import { Layout } from '../layout/Layout'
import { useState } from 'react'
import { useSignIn } from '@clerk/nextjs'
import { useRouter } from 'next/router'

export default function SignInPage () {
  const { isLoaded, signIn } = useSignIn()
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const router = useRouter()
  return (
    <Layout
      className="inline-flex justify-center items-center pt-3"
    >
      <div
        className="w-2/3 bg-white shadow-md border border-gray-200 rounded-lg max-w-sm p-4 sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700">
        <div className="space-y-6">
          <h3
            className="text-xl font-medium text-gray-900 dark:text-white">Sign
            up</h3>
          <div>
            <label htmlFor="username"
                   className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300">Your
              username</label>
            <input type="text" name="username" id="username"
                   autoComplete="username"
                   className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                   placeholder="himself65" required
                   onChange={event => {
                     setUsername(event.target.value)
                   }}
            />
          </div>
          <div>
            <label htmlFor="password"
                   className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300">Your
              password</label>
            <input type="password" name="password" id="password"
                   autoComplete="new-password"
                   placeholder="••••••••"
                   className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                   required
                   onChange={event => {
                     setPassword(event.target.value)
                   }}
            />
          </div>
          <button
                  id="submit"
                  className="w-full text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                  onClick={(event) => {
                    if (username === '' || password === '') {
                      return
                    }
                    if (isLoaded) {
                      console.log('create')
                      return signIn.create({
                        identifier: username,
                        password
                      }).then(result => {
                        console.log(result)
                        return router.replace('/')
                      }).catch(() => {
                        // fixme: error display
                        return router.replace('/')
                      })
                    }
                  }}
          >
            Sign in
          </button>
        </div>
      </div>
    </Layout>
  )
}
