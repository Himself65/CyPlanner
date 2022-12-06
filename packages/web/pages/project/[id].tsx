import { NextPage } from 'next'
import { Layout } from '../../layout/Layout'
import dynamic from 'next/dynamic'

const DynamicEditor = dynamic(() => import('../../components/Editor'), {
  loading: () => (
    <div className="wrapper">
      <h1>Loading...</h1>
    </div>
  ),
  ssr: false
})

const ProjectPage: NextPage = () => {
  return (
    <Layout>
      <DynamicEditor/>
    </Layout>
  )
}

export default ProjectPage