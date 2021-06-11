import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import db from "../firebase";
import firebase from "firebase/app";

const App = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    db.collection("notes")
      .orderBy("id", "desc")
      .onSnapshot((snapshot) => {
        setNotes([]);
        // The above line removes any pre-set data from notes hook
        // (if there is already some data in it, like from the last call to the database)
        snapshot.docs.forEach((noteItem) => {
          setNotes((prevNote) => [...prevNote, noteItem.data()]);
        });
      });
  }, []);

  const addNote = (newNote) => {
    db.collection("notes").add({
      id: firebase.firestore.FieldValue.serverTimestamp(),
      title: newNote.title,
      content: newNote.content,
    });
  };

  const deleteNote = (id) => {
    setNotes((prevNotes) => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
    });
  };

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={index}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
};

export default App;
