import React , {useState} from 'react';
import { javascript } from "@codemirror/lang-javascript";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { EditorView } from "@codemirror/view";
import { basicSetup } from "codemirror";
import CodeMirror from "@uiw/react-codemirror";
import { dracula } from "@uiw/codemirror-theme-dracula";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCompressAlt, faExpandAlt } from '@fortawesome/free-solid-svg-icons';

export default function Editor(props) {
    const {
        language,
        displayName,
        value,
        onChange
    } = props;

    const extensions = language === "javascript" ? [javascript()] 
                      : language === "html" ? [html()]
                      : language === "css" ? [css()]
                      : [];
    const [open,setOpen] = useState(true)

    console.log("Editor Container Class:", open ? "editor-container" : "editor-container collapsed");

    return (
        <div className={`editor-container ${open ? '' :'collapsed'}`}>
            <div className="editor-title">
                {displayName}
                <button
                    type = "button"
                    className = "expand-collapse-btn"
                    onClick={() =>{
                        console.log("Button Clicked!")
                        setOpen(prevOpen => !prevOpen)}}
                >
                    <FontAwesomeIcon icon ={open ? faCompressAlt :
                    faExpandAlt }/>
                
                    
                </button>


            </div>
            <div className="code-mirror-wrapper">

                <CodeMirror
                    value={value}
                    height="300px"
                    theme={dracula}
                    extensions={extensions}
                    onChange={(value) => onChange(value)}
                />
            </div>
        </div>
    );
}
