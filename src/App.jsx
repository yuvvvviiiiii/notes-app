import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Modal from './components/Modal';
import NotePage from './pages/NotePage';

const App = () => {

  const [groups, setGroups] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const storedGroups = JSON.parse(localStorage.getItem('groups')) || [];
    setGroups(storedGroups); 
  }, []);

  const addGroup = (group) => {
    const newGroup = {
      id: new Date().getTime(),
      name: group.groupName,
      color: group.color,
      notes: [],
    }
    const updatedGroups = [...groups, newGroup];
    setGroups(updatedGroups);

    localStorage.setItem('groups', JSON.stringify(updatedGroups));
  };

  const updatedGroupNotes = (groupId, newNotes) => {
    const updatedGroups = groups.map(group => {
      if(group.id === groupId) {
        return { ...group, notes: newNotes};
      }
      return group;
    }) 

    setGroups(updatedGroups);
    localStorage.setItem('groups', JSON.stringify(updatedGroups));
  }

  return (
    <BrowserRouter>
    <div>
      <Routes>
        {/* HomePage Route */}
        <Route path='/' element={<HomePage 
            groups={groups}
            openModal = {() => setIsModalOpen(true)}  
          />
        }
        />
        {/* notespage Route */}
        <Route path='/notes/:groupId' element={<NotePage 
          groups={groups}
          openModal={() => setIsModalOpen(true)}
          updatedGroupNotes={updatedGroupNotes}
        />}/>
      </Routes>   
      {/* modal */}
      {
        isModalOpen && (
          <Modal 
          closeModal={() => setIsModalOpen(false)}
          addGroup={addGroup}
          />
        )
      }
    </div>
    </BrowserRouter>
  )
}

export default App
