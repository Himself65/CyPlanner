import { prisma } from '../../lib/prisma'
import { requireAuth } from '@clerk/nextjs/api'
const handler = requireAuth(async (req, res) => {
  if (req.method === 'GET') {
    const { id } = req.query
    if (typeof id === 'string') {
      const project = await prisma.project.findUnique({
        where: {
          id
        }
      })
      res.json(project)
    }
  } else if (req.method === 'POST') {

    const { id, title, data } = req.body
    await prisma.project.update({
      where: {
        id
      },
      data: {
        title,
        data: data
      }
    })
    res.json('success')
  } else if (req.method === 'PUT') {
    const project = await prisma.project.create({
      data: {
        title: '',
        data: '',
        userId: req.auth.userId
      }
    })
    res.json(project)
  }
})

export default handler