import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import SideBar from '../components/SideBar';
import formatDateAndTime from '../utils/formatDateAndTime';
import { IoSend } from "react-icons/io5";
import { GoDotFill } from "react-icons/go";
import getInitials from '../utils/getInitials';
import { IoArrowBack } from "react-icons/io5";

const NotePage = ({ groups, openModal, updatedGroupNotes }) => {

  const { groupId } = useParams(); // Get groupId from URL
  const [notes, setNotes] = useState([]);
  const [noteInput, setNoteInput] = useState('');
  const currentGroupId = parseInt(groupId, 10); 
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const storedGroups = JSON.parse(localStorage.getItem('groups')) || [];
    const group = storedGroups.find(group => group.id === currentGroupId);

    if(group && Array.isArray(group.notes)){
      setNotes(group.notes);
    } else {
      setNotes([]);
    }
  }, [currentGroupId]);

  // func to Add Note on Enter Press
  const handleKeyDown = (e) => {
    if(e.key === "Enter") {
      handleAddNote();
      setNoteInput('');
    }
  }
  // function to addNote
  const handleAddNote = (e) => {

    if(!noteInput.trim()) return;

    const { date, time} = formatDateAndTime();

    const newNote = {
      id: Date.now(),
      text: noteInput,
      date: date,
      time: time,
    }

    const updatedNotes = [...notes, newNote];

    updatedGroupNotes(currentGroupId, updatedNotes);
    setNotes(updatedNotes);
    setNoteInput('');
  }

  // function to activate textArea
  const handleTextAreaFocus = () =>{
    setIsActive(true);
  } 

  const handleTextAreaBlur = () => {
    if(!noteInput.trim()){
      setIsActive(false);
    }
  }

  const group = groups.find(group => group.id === currentGroupId);
  
  return (
    <div className='notes-page'>
      {/* Sidebar */}
      <SideBar groups={groups} openModal={openModal} />
      {/* Right Section */}
      <div className='notes-content'>
        <div className='notes-header'>
          <div className='back-btn'>
            <Link to='/' key={Date.UTC()}>
            <IoArrowBack />
            </Link>
          </div>
          <div style={{
            backgroundColor: group.color,
            height: "35px",
            width: "35px",
            padding: "10px",
            borderRadius: "50%",
          }}>
            <p className='note-intials'>{getInitials(group.name)}</p>
          </div>
          <p className='note-group-name'>{group.name}</p>
        </div>
        <div className='notes-display'>
          { 
          notes.map((note) => (
            
            <div key={note.id} className='note-item'>
              <p>{note.text}</p>
              <div className='date-time'>
                <span className='note-date'>
                  {note.date}
                  <span className='dot-icon'><GoDotFill /></span>
                  <span className='note-time'> {note.time}</span>
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className='note-input-container'>
          <textarea
            value={noteInput}
            onChange={(e) => setNoteInput(e.target.value)}
            placeholder='Enter your note here...'
            onKeyDown={handleKeyDown}
            onFocus={handleTextAreaFocus}
            onBlur={handleTextAreaBlur}
          />
          <div className={`enter-icon ${isActive ? 'active' : 'inactive'}`} onClick={handleAddNote}>
          <IoSend />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotePage;
