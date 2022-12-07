import { Layout } from '../layout/Layout'
import type { Project } from '@prisma/client'
import { useRouter } from 'next/router'
import { useUser } from '@clerk/nextjs'
import { useEffect, useState } from 'react'

export default function Home () {
  const router = useRouter()
  const { isSignedIn } = useUser()
  const [projects, setProjects] = useState<Project[] | null>(null)
  useEffect(() => {
    if (isSignedIn) {
      fetch('/api/document')
        .then(res => res.json())
        .then((data: Project[]) => data.length > 0 && setProjects(data))
    }
  }, [isSignedIn])
  return (
    <Layout>
      <div className="mt-2">
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
        <a
          className="block p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100"
          href="/example"
        >
          <h5
            className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
            Todo List Example
          </h5>
          <p className="font-normal text-gray-700">
            to create a todo card, create button on the nav bar
          </p>
        </a>
        {
          projects === null ?
            (
              <div>
                nothing
              </div>
            ) :
            (
              projects.map(project => {
                return (
                  <a
                    className="block p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100"
                    data-test-id={project.id}
                    key={project.id}
                    href={`/project/${project.id}`}
                  >
                    {project.title}
                  </a>
                )
              })
            )
        }
      </div>
    </Layout>
  )
}
