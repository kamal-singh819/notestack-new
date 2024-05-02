import { useParams } from "react-router-dom";
const SingleNote = () => {
    const { noteId } = useParams();
    console.log(noteId);
    return (
        <div className="border-2 border-white px-5 py-4 ">
            HELLO {noteId}
            {/* <h2>{singleNote.pdfName}</h2>
            <p>{singleNote.pdfUrl}</p>
            <p>{singleNote.subject}</p>
            <p>{singleNote.description}</p> */}
        </div>
    )
}

export default SingleNote;