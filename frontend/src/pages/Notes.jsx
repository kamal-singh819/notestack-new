import axios from "axios";
import { useEffect, useState } from "react";
// import SingleNote from "../components/SingleNote";
import { Link } from "react-router-dom";

const Notes = () => {
  const [notes, setNotes] = useState([]);
  console.log(notes);
  useEffect(() => {
    async function getAllNotes() {
      const response = await axios({
        method: 'get',
        url: 'http://localhost:5000/notes/get-all-notes',
      });
      console.log(response.data);
      setNotes(response.data.data);
    }
    getAllNotes();
  }, []);

  return (
    <div className='min-h-[calc(100vh-4rem)] bg-darkColor flex flex-col gap-3'>
       {notes.map(note => <h2 key={note._id} className="text-white"> <Link className="underline" to={`/notes/${note._id}`}>{note.pdfName}</Link> Hello</h2>)} 
    </div>
  )
}

export default Notes;
