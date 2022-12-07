import type { NextPage } from 'next'
import { Layout } from '../layout/Layout'
import dynamic from 'next/dynamic'

const DynamicExampleEditor = dynamic(() => import('../components/ExampleEditor'), {
  loading: () => (
    <div className="wrapper">
      <h1>Loading...</h1>
    </div>
  ),
  ssr: false
})

const ExamplePage: NextPage = () => {
  return (
    <Layout>
      <DynamicExampleEditor/>
    </Layout>
  )
}

export default ExamplePage