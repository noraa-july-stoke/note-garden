// Import React dependencies.
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createEditor, Editor, Transforms } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import { useHistory } from "react-router-dom";
import DOMPurify from 'dompurify';
import { helpers } from '../ComponentHelpers/index.js';
import './TextEditor.css';
import { thunkCreateTextNote, thunkEditTextNote, thunkLoadNotebookNotes } from '../../store/notes.js';
import { thunkLoadNotebooks } from '../../store/notebooks.js';
const { serialize, deserialize } = helpers;

//add back in localstorage functionality later in case of refresh or internet outage
const TextEditor = ({ note, onClose, setIsEditing, bgColor, standalone }) => {
    const history = useHistory()
    //if note use note, if not start from scratch.
    const notebooks = useSelector(state => state.notebooks?.userTextNotebooks)
    const notebookList = Object.values(notebooks);
    //Preserves data through a re-render before updating based on previous value
    //State Variables. html contend will be rendered inside this starting div.
    const dispatch = useDispatch();
    const [htmlContent, setHtmlContent] = useState(note?.note ? note.note : "");
    const [name, setName] = useState(note?.name ? note.name : "");
    const [selectedNotebook, setSelectedNotebook] = useState(note?.notebookId ? note.notebookId : notebookList[0]?.id);

    let editorStyles;
    if (standalone) {
        editorStyles = {
            editorBody: {
                height: "400px"
            },
            editorContainer: {
                padding: "3em"
            }
        }
    }

    let deserializedValue = null;
    if (note) {
        const document = new DOMParser().parseFromString(note.note, 'text/html');
        deserializedValue = deserialize(document.body);
    }

    useEffect(() => {
        console.log(name, selectedNotebook);
    }, [name, selectedNotebook, dispatch, htmlContent]);

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

    const handleSaveClick = async e => {
        e.preventDefault()
        const content = serialize(editor)
        let saveNote = null;
        if (!note) {
            saveNote = {
                name: name,
                note: content,
                notebookId: selectedNotebook
            }
            await dispatch(thunkCreateTextNote(saveNote))
            await dispatch(thunkLoadNotebookNotes(selectedNotebook))
            if (standalone) {
                history.push('/notebooks')
            }
        }
        else {
            saveNote = {
                id: note.id,
                name: name,
                note: content,
                notebookId: selectedNotebook
            }
            await dispatch(thunkEditTextNote(saveNote))
            await dispatch(thunkLoadNotebookNotes(selectedNotebook))
            setIsEditing(false);
            console.log(saveNote)

        }
    }

    const initialValue = useMemo(
        () =>
            deserializedValue || [
                {
                    type: 'paragraph',
                    children: [{ text: '' }],
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



    return (
        <div className="editor-page-wrapper" style={editorStyles?.editorContainer}>
            <div className='text-editor-container' >
                <div className="text-editor-controls" style={{ backgroundColor: bgColor }}>
                    <div className="editor-form-content">
                        <div className="note-name-label">
                            <label htmlFor="name" style={{ color: "white", fontWeight: "bold" }}>Name: </label>
                            <input id="editor-note-name" type="text" value={name} onChange={handleNameChange} style={{ backgroundColor: bgColor }} placeholder='Name your note'></input>
                        </div>
                        <div className="note-notebook-label">
                            <label htmlFor="notebook-select" style={{ color: "white", fontWeight: "bold" }}>Notebook: </label>
                            <select id="notebook-select" value={selectedNotebook} style={{ backgroundColor: bgColor}} onChange={handleNotebookChange}>
                                {notebookList?.map((notebook) => (
                                    <option key={notebook.id} value={notebook.id}>{notebook.name}</option>
                                ))}
                            </select>
                        </div>
                        <button className="editor-button circle-button" onClick={standalone ? () => history.push('/') : onClose}>X</button>
                    </div>
                    <div className="text-editor-toolbar">
                        <button className="editor-button circle-button" onClick={handleBoldClick}><b>B</b></button>
                        <button className="editor-button circle-button" onClick={handleItalicClick}><em>I</em></button>
                        <div className="editor-color-container" style={{ backgroundColor: bgColor }}>
                            <input className="editor-color-button editor-button" type="color" onChange={handleColorChange} style={{ backgroundColor: bgColor }} />
                        </div>
                        <button className="editor-button reset-button" onClick={handleResetFormatting}>Reset Formatting</button>
                    </div>
                </div>
                <div className="editor-wrapper">
                    <Slate editor={editor} value={initialValue} onChange={handleContentChange}>
                        <Editable className='text-editor' style={editorStyles?.editorBody} renderLeaf={renderLeaf} placeholder="What are you thinking about...?" />
                    </Slate>
                </div>
                <div className="editor-footer">
                    <button className="save-note-button editor-button" onClick={handleSaveClick} style={{ backgroundColor: bgColor }}> SAVE NOTE </button>
                </div>
            </div>
        </div>
    )
}

export default TextEditor;
