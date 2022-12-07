import { Layout } from '../layout/Layout'
import type { Project } from '@prisma/client'
import { useRouter } from 'next/router'

export default function Home () {
  const router = useRouter()
  return (
    <Layout>
      <div className="mt-2">
        <a
          className="block p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100">
          <h5
            className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
            Todo List Example
          </h5>
          <p className="font-normal text-gray-700">
            to create a todo card, create button on the nav bar
          </p>
        </a>
        <button
          onClick={() => {
            fetch('/api/document', {
              method: 'PUT'
            }).then(res => res.json())
              .then((project: Project) => {
                return router.push(`/project/${project.id}`)
              })
          }}
        >
          Add
        </button>
      </div>
    </Layout>
  )
}
