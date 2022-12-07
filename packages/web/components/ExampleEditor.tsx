import { useEditor } from './EditorProvider'
import '@blocksuite/blocks'
import '@blocksuite/blocks/style'
import type { EditorContainer } from '@blocksuite/editor'
import { createEditor, BlockSchema } from '@blocksuite/editor'
import { Workspace } from '@blocksuite/store'
import { forwardRef, Suspense, useEffect, useRef } from 'react'
import exampleMarkdown from './exampleMarkdown'

const BlockSuiteExampleEditor = forwardRef<EditorContainer>(({}, ref) => {
  const containerElement = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!containerElement.current) {
      return
    }
    const workspace = new Workspace({})
    const page = workspace.createPage('page0').register(BlockSchema)
    const editor = createEditor(page)
    containerElement.current.appendChild(editor)
    if (ref) {
      if ('current' in ref) {
        ref.current = editor
      } else {
        ref(editor)
      }
    }
    return () => {
      editor.remove()
    }
  }, [ref])
  return <div id="editor" style={{ height: '100%' }} ref={containerElement}/>
})

export const ExampleEditor = () => {
  const editorRef = useRef<EditorContainer>(null)
  const { setEditor } = useEditor()
  useEffect(() => {
    if (!editorRef.current) {
      return
    }
    const editor = editorRef.current
    const { page } = editor
    const pageId = page.addBlock({
      flavour: 'affine:page',
      title: 'Hello, world',
    })
    const groupId = page.addBlock({ flavour: 'affine:group' }, pageId)
    editor.clipboard.importMarkdown(exampleMarkdown, `${groupId}`)
    page.resetHistory()
  }, [setEditor])

  return (
    <Suspense fallback={<div>Error!</div>}>
      <BlockSuiteExampleEditor ref={editorRef}/>
    </Suspense>
  )
}

export default ExampleEditor