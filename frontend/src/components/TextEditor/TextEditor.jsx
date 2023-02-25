// Import React dependencies.
import React, { useState, useMemo, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { createEditor, Editor, Transforms, useSlate, Node } from 'slate'
import { Slate, Editable, withReact } from 'slate-react'
import DOMPurify from 'dompurify';
import {helpers} from '../ComponentHelpers/index.js'
import './TextEditor.css'
import { thunkCreateNote } from '../../store/notes.js';
const {serialize, deserialize} = helpers;

//At it's core, the slate editor is just a node list wrapped in an outer "<p></p>" tag.

// !@#$ ultimately I want to pass in initial value as a prop with the noteid.
// Maybe i can pass in the individual note and then deserialize the note html???
const TextEditor = ({note}) => {
    //Preserves data through a re-render before updating based on previous value

    //State Variables. html contend will be rendered inside this starting div.
    const dispatch = useDispatch();
    const storedValue = localStorage.getItem('content')
    const [htmlContent, setHtmlContent] = useState(DOMPurify.sanitize(storedValue))
    const [name, setName] = useState("")

    let deserializedValue = null;
    if (storedValue){
        const document = new DOMParser().parseFromString(storedValue, 'text/html')
        deserializedValue = deserialize(document.body)
    }

    useEffect(() => {
        console.log(name, htmlContent);
    }, [name, htmlContent]);

    //!@#$ we will set propvalue to the html string of note;
    // const propValue = null;
    const initialValue = useMemo(
        () =>
            deserializedValue || [
                {
                    type: 'paragraph',
                    children: [{ text: 'What are you thinking about...?' }],
                },
            ],
        []
    )

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
    const isMarkActive = (editor, format) => {
        const marks = Editor.marks(editor)
        return marks ? marks[format] === true : false
    }

    const handleSaveClick = async e => {
        // !@#$ trigger dispatch to database here
        const content = serialize(editor)
        localStorage.setItem('content', content)
        const note = {
            name: name,
            note: content
        }
        await dispatch(thunkCreateNote(note))

    }

    const handleNameChange = e => {
        setName(e.target.value)
    }

    const handleChange = e => {
        setHtmlContent(DOMPurify.sanitize(serialize(editor)))
        const element = document.getElementById('custom-div');
        element.setHTML(htmlContent)
    }

    return (
        <div>
            <input type="text" value={name} onChange={handleNameChange} placeholder='Enter a name for your note'></input>
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
        <div id="custom-div"></div>
        </div>
    )
}

export default TextEditor;
