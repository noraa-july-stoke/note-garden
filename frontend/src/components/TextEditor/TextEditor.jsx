// Import React dependencies.
import React, { useState, useMemo, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { createEditor, Editor, Transforms, useSlate } from 'slate'
import { Slate, Editable, withReact } from 'slate-react'
import html from '../ComponentHelpers/html-deserializer';
import './TextEditor.css'

const TextEditor = ({initialText}) => {
    //Preserves data through a re-render before updating based on previous value

    const initialValue = useMemo(
        () =>
            JSON.parse(
                localStorage.getItem('content')) || [
                {
                    type: 'paragraph',
                    children: [{ text: 'What are you thinking about...?' }],
                },
            ],
        []
    )

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

            // const { selection } = editor
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
        if (leaf.bold) { children = <strong>{children}</strong> }

        if (leaf.italic) { children = <em>{children}</em> }

        if (leaf.color) {
            const style = { color: leaf.color }
            children = <span style={style}>{children}</span>
        }

        return <span {...attributes}>{children}</span>
    }

    const handleChange = value => {
        // const isAstChange = editor.operations.some(
        //     op => 'set_selection' !== op.type
        // )
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
        // !@#$ trigger dispatch to database here
        return null
    }

    const isMarkActive = (editor, format) => {
        const marks = Editor.marks(editor)
        return marks ? marks[format] === true : false
    }

    return (
        <div className='text-editor-container' >
            <div className="text-editor-toolbar">
                <button className="utility-button feedback-button" onClick={handleBoldClick}><b>Bold</b></button>
            <button className="utility-button feedback-button" onClick={handleItalicClick}><em>Italic</em></button>
            <button className="utility-button feedback-button" onClick={handleResetFormatting}>Reset Formatting</button>
                <input className="utility-button feedback-button" type="color" onChange={handleColorChange} />
            </div>

            <Slate editor={editor} value={initialValue} onChange={handleChange}>
                <Editable className='text-editor' renderLeaf={renderLeaf} />
            </Slate>
            <button className="utility-button feedback-button save-button" onClick={handleSaveClick}> Save your progress </button>
        </div>
    )
}

export default TextEditor;
