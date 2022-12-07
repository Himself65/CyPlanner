import { NextPage } from 'next'
import { Layout } from '../../layout/Layout'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'

const DynamicEditor = dynamic(() => import('../../components/Editor'), {
  loading: () => (
    <div className="wrapper">
      <h1>Loading...</h1>
    </div>
  ),
  ssr: false
})

const ProjectPage: NextPage = () => {
  const router = useRouter()
  const id = router.query.id
  if (typeof id !== 'string') {
    return (
      <Layout>
        Cannot find project
      </Layout>
    )
  }
  return (
    <Layout>
      <DynamicEditor id={id}/>
    </Layout>
  )
}

export default ProjectPage