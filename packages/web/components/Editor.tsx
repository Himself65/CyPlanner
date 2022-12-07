import { useEditor } from './EditorProvider'
import '@blocksuite/blocks'
import '@blocksuite/blocks/style'
import type { EditorContainer } from '@blocksuite/editor'
import { createEditor, BlockSchema } from '@blocksuite/editor'
import { Workspace } from '@blocksuite/store'
import { forwardRef, Suspense, useEffect, useRef } from 'react'
import exampleMarkdown from './exampleMarkdown'
import { fromUint8Array, toUint8Array } from 'js-base64'
import { applyUpdate, encodeStateAsUpdate } from 'yjs'
import type { Project } from '@prisma/client'

const BlockSuiteEditor = forwardRef<EditorContainer>(({}, ref) => {
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

export type EditorProps = {
  id: string
}

export const Editor = (props: EditorProps) => {
  const editorRef = useRef<EditorContainer>(null)
  const { setEditor } = useEditor()
  useEffect(() => {
    if (!editorRef.current) {
      return
    }
    const editor = editorRef.current
    const { page } = editor as EditorContainer
    setEditor(editor)
    fetch(`/api/document?id=${props.id}`, {
      method: 'GET'
    }).then(res => res.json())
      .then((data: Project) => {
        const update = toUint8Array(data.data)
        if (update.length !== 0) {
          console.log('update', update)
          applyUpdate(page.doc, update)
        }
      })
    // const pageId = page.addBlock({
    //   flavour: 'affine:page',
    //   title: 'Hello, world',
    // })
    // const groupId = page.addBlock({ flavour: 'affine:group' }, pageId)
    // editor.clipboard.importMarkdown(exampleMarkdown, `${groupId}`)
    page.resetHistory()
  }, [setEditor, props.id])

  return (
    <Suspense fallback={<div>Error!</div>}>
      <div className='mt-2'>
        <button
          className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2'
          onClick={() => {
            const editor = editorRef.current
            if (editor) {
              const { page } = editor
              const data = JSON.stringify({
                id: props.id,
                title: page.getBlockByFlavour('affine:page')[0].title,
                data: fromUint8Array(encodeStateAsUpdate(page.doc))
              })
              console.log('data', data)
              fetch(`/api/document`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: data
              }).then(res => res.json())
                .then((data) => {
                  console.log('data', data)
                })
            }
          }}
        >
          save
        </button>
        <button
          className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2'
          onClick={() => {
            const editor = editorRef.current
            if (editor) {
              editor.contentParser.onExportMarkdown()
            }
          }}
        >export</button>
      </div>
      <BlockSuiteEditor ref={editorRef}/>
    </Suspense>
  )
}

declare global {
  interface HTMLElementTagNameMap {
    'editor-container': EditorContainer;
  }

  namespace JSX {
    interface IntrinsicElements {
      // TODO fix types on react
      'editor-container': EditorContainer;
    }
  }
}

export default Editor