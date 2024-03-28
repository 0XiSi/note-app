import { useState, useEffect } from "react";
import api from "../api";
import Note from "../components/Note"
import "../styles/Home.css"

function Home() {
  const [notes, setNotes] = useState([])
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  useEffect(() => {
    getNotes()
  }, []);

  const getNotes = () => {
    api.get('/api/notes/')
      .then(res => res.data)
      .then(data => {setNotes(data); console.log(data)})
      .catch((err) => alert(err))
  }

  const deleteNote = (id) => {
    api.delete(`/api/notes/${id}/`)
      .then((res) => {
        if (res.status === 204) console.log("Note was deleted")
        else alert('Failed to delete the note')
        getNotes()
      })
      .catch((err) => alert(err))
  }

  const createNote = (e) => {
        e.preventDefault();
        api
            .post("/api/notes/", { content: content, title: title })
            .then((res) => {
                if (res.status === 201) console.log("Note created!");
                else alert("Failed to make note.");
                getNotes();
            })
            .catch((err) => alert(err));
    };

  return(
    <div>
      <div>
        <h2>Notes</h2>
        {notes.map((note) => <Note note={note} onDelete={deleteNote} key={note.id} />)}
      </div>
      <h2>Crete a note</h2>
      <form onSubmit={createNote}>
        <label htmlFor='title'>Title: </label> <br/>
        <input
          type="text"
          id='title'
          name='title'
          required
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <label htmlFor='content'>Content: </label> <br/>
        <textarea
          id='content'
          name='content'
          required
          onChange={(e) => {setContent(e.target.value)}}
          value={content}
        />
        <input type="submit" value='submit'/>
      </form>
    </div>
  )
}

export default Home