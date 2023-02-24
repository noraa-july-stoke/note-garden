// Import React dependencies.
import React, { useState, useMemo, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { createEditor, Editor, Transforms, useSlate } from 'slate'
import { Slate, Editable, withReact } from 'slate-react'


const TextEditor = () => {

    const initialValue = useMemo(
        () =>
            JSON.parse(
                localStorage.getItem('content')) || [
                {
                    type: 'paragraph',
                    children: [{ text: 'A line of text in a paragraph.' }],
                },
            ],
        []
    )

    //!@#$ Might not need this anymore???
    // const [value, setValue] = useState([
    //     {
    //         type: 'paragraph',
    //         children: [{ text: 'A line of text in a paragraph.' }],
    //     },
    // ])

    useEffect(()=> {
        //!@#$ dispatch thunk here tomorrow

    })

    const withFormatting = (editor) => {
        const { isVoid } = editor

        editor.isVoid = (element) => {
            return element.type === 'image' ? true : isVoid(element)
        }

        const { insertText, setSelection } = editor

        editor.insertText = (text) => {
            if (text === ' ') {
                return insertText(text)
            }

            const { selection } = editor
            const marks = Editor.marks(editor)

            if (marks) {
                if (marks.bold) {
                    Editor.removeMark(editor, 'bold')
                }

                if (marks.italic) {
                    Editor.removeMark(editor, 'italic')
                }

                if (marks.color) {
                    Editor.removeMark(editor, 'color')
                }
            }

            insertText(text)
        }

        editor.setSelection = (selection) => {
            setSelection(selection)

            const [match] = Editor.nodes(editor, {
                match: (n) => n.color,
            })

            if (match) {
                const [, path] = match
                Transforms.unsetNodes(editor, 'color', { at: path })
            }
        }

        return editor
    }

    const editor = useMemo(() => withFormatting(withReact(createEditor())), [])


    const renderLeaf = ({ attributes, children, leaf }) => {
        if (leaf.bold) {
            children = <strong>{children}</strong>
        }

        if (leaf.italic) {
            children = <em>{children}</em>
        }

        if (leaf.color) {
            const style = { color: leaf.color }
            children = <span style={style}>{children}</span>
        }

        return <span {...attributes}>{children}</span>
    }

    const handleChange = value => {
        const isAstChange = editor.operations.some(
            op => 'set_selection' !== op.type
        )
        const content = JSON.stringify(value)
        localStorage.setItem('content', content)
    }

    const handleBoldClick = () => {
        if (isMarkActive(editor, 'bold')) {
            Editor.removeMark(editor, 'bold')
        } else {
            Editor.addMark(editor, 'bold', true)
        }
    }

    const handleItalicClick = () => {
        if (isMarkActive(editor, 'italic')) {
            Editor.removeMark(editor, 'italic')
        } else {
            Editor.addMark(editor, 'italic', true)
        }
    }

    const handleResetFormatting = () => {
        const marks = { bold: false, italic: false, color: null }
        Editor.removeMark(editor, Object.keys(marks))
    }


    const handleColorChange = (e) => {
        const color = e.target.value

        const { selection } = editor
        if (selection && Editor.marks(editor).color) {
            Transforms.setNodes(editor, { color })
        } else {
            Editor.addMark(editor, 'color', color)
        }
    }

    const handleSaveClick = e => {
        return null
    }

    const isMarkActive = (editor, format) => {
        const marks = Editor.marks(editor)
        return marks ? marks[format] === true : false
    }

    return (
        <div>
            <div>
            <button onClick={handleBoldClick}>Bold</button>
            <button onClick={handleItalicClick}>Italic</button>
            <button onClick={handleResetFormatting}>Reset Formatting</button>
            <input type="color" onChange={handleColorChange} />
            Noraa's Text Editor
            </div>

            <Slate editor={editor} value={initialValue} onChange={handleChange}>
                <Editable className='text-editor' renderLeaf={renderLeaf} />
            </Slate>
            <button onClick={handleSaveClick}> Save your progress </button>
        </div>
    )
}

export default TextEditor;
