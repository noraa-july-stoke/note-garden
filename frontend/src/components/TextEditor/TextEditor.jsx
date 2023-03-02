// Import React dependencies.
import React, { useState, useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createEditor, Editor, Transforms } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import {useHistory} from "react-router-dom";
import DOMPurify from 'dompurify';
import { helpers } from '../ComponentHelpers/index.js';
import './TextEditor.css';
import { thunkCreateTextNote, thunkEditTextNote } from '../../store/notes.js';
import { thunkLoadNotebooks } from '../../store/notebooks.js';
const { serialize, deserialize } = helpers;

//add back in localstorage functionality later in case of refresh or internet outage
const TextEditor = ({ note, onClose, setEdited }) => {
    const history = useHistory()
    //if note use note, if not start from scratch.
    const notebooks = useSelector(state => state.notebooks?.userTextNotebooks)
    //Preserves data through a re-render before updating based on previous value
    //State Variables. html contend will be rendered inside this starting div.
    const dispatch = useDispatch();
    const [htmlContent, setHtmlContent] = useState(note?.note ? note.note : "");
    const [name, setName] = useState(note?.name ? note.name : "");
    const [selectedNotebook, setSelectedNotebook] = useState(note?.notebookId ? note.notebookId : "");

    let deserializedValue = null;
    if (note) {
        const document = new DOMParser().parseFromString(note.note, 'text/html');
        deserializedValue = deserialize(document.body);
    }

    useEffect(() => {
        console.log(name, htmlContent, selectedNotebook);
        dispatch(thunkLoadNotebooks())
    }, [name, htmlContent, selectedNotebook, dispatch]);

    //!@#$ we will set propvalue to the html string of note;
    // const propValue = null;

    const handleNameChange = e => {
        setName(e.target.value)
    }

    const handleContentChange = e => {
        setHtmlContent(DOMPurify.sanitize(serialize(editor)))
    }

    const handleNotebookChange = e => {
        setSelectedNotebook(e.target.value);
    };

    const initialValue = useMemo(
        () =>
            deserializedValue || [
                {
                    type: 'paragraph',
                    children: [{ text: 'What are you thinking about...?' }],
                },
            ],
            [deserializedValue]
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
        e.preventDefault()
        const content = serialize(editor)
        let saveNote = null;
        if(!note) {
            saveNote = {
                name: name,
                note: content,
                notebookId: selectedNotebook
            }
            dispatch(thunkCreateTextNote(saveNote))
            history.push('/notebooks')
            console.log(saveNote)
        }
        else {
            saveNote = {
                id: note.id,
                name: name,
                note: content,
                notebookId: selectedNotebook
            }
            dispatch(thunkEditTextNote(saveNote))
            console.log(saveNote)
            setEdited(true)
            onClose()
        }
    }

    return (
        <div className="editor-page-wrapper">
            <div className = "editor-form-content">
                <label htmlFor="name">Name your note:</label>
                <input type="text" value={name} onChange={handleNameChange} placeholder='Enter a name for your note'></input>
            </div>
            <div className="editor-form-content">
                <label htmlFor="notebook-select">Add to a notebook...</label>
                <select id="notebook-select" value={selectedNotebook} onChange={handleNotebookChange}>
                    {Object.values(notebooks)?.map((notebook) => (
                        <option key={notebook.id} value={notebook.id}>{notebook.name}</option>
                    ))}
                </select>
            </div>
            <div className='text-editor-container' >
                <div className="text-editor-toolbar">
                    <button className="toolbar-button" onClick={handleBoldClick}><b>B</b></button>
                    <button className="toolbar-button" onClick={handleItalicClick}><em>I</em></button>
                    <button className="format-button" onClick={handleResetFormatting}>Reset Formatting</button>
                    <input className="toolbar-button" type="color" onChange={handleColorChange} />
                    {note && <button className="toolbar-button" onClick={onClose}>Close</button>}
                </div>
                <div className="editor-wrapper">
                    <Slate editor={editor} value={initialValue} onChange={handleContentChange}>
                        <Editable className='text-editor' renderLeaf={renderLeaf} />
                    </Slate>
                </div>
                <button className="utility-button feedback-button save-button" onClick={handleSaveClick}> Save your progress & go to notebooks </button>
            </div>
        </div>
    )
}

export default TextEditor;
