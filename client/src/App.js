import React,
{
    useState,
    useEffect
} from 'react';
import io from 'socket.io-client';
import './App.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


const socket = io('http://localhost:5001');

function App() {
    const [content, setContent] = useState('');

    useEffect(() => {
        socket.on('updateContent',
            (updatedContent) => {
                setContent(updatedContent);
            });


        return () => {
            socket.off('updateContent');
        };
    });

    const handleEdit = (value) => {
        if (content !== value) {
            setContent(value)
            socket.emit('edit', value);
        }
    };

    const onKeyPress = (e) => {
        var key=e.keyCode || e.which;
        if (key===13){
            setContent(`${content}<p><br></p>`)
            socket.emit("edit", `${content}<p><br></p>`)
            document.getElementsByClassName("ql-editor")[0].scrollIntoView()

        }
    }


    return (
        <div className="App">
            <h1>Realtime Collaborative Editor</h1>
            <ReactQuill
                id="quill-editor"
                theme="snow"
                value={content} 
                onChange = {handleEdit} 
                onKeyDown={onKeyPress} 
            />;
        </div>

    );
}

export default App;