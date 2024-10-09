import React, { useState } from 'react'
import { FaPlus } from "react-icons/fa6";
import { Link, useParams } from 'react-router-dom';
import getInitials from '../utils/getInitials';

const SideBar = ({ openModal, groups }) => {

  const { groupId } = useParams();
  const [selectedGroup, setSelectedGroup] = useState(parseInt(groupId));

  // function to close Modal
  const handleGroupClick = (groupId) => {
    setSelectedGroup(groupId);
  }

  return (
    
      <div className='left-section'>
        <div className='heading'>
          <p>Pocket Notes</p>
        </div>
        <div className='create-btn' onClick={openModal}>
          <p className='icon-plus'><FaPlus /></p>
        </div>
        <div className='group-list'>
          { groups.map((group) => (
            <Link
              to={`/notes/${group.id}`}
              key={group.id}
              onClick={() => handleGroupClick(group.id)}
              >
                
                <div 
                className={`group-item ${selectedGroup === group.id ? 'selected-group' : 'not-selected-group'}`}
                >
                    <div
                     style={{ 
                      backgroundColor: group.color,
                      height: "60px",
                      width: "60px",
                      borderRadius: "50%",
                      color: "rgba(255, 255, 255, 1)",
                      marginLeft: "10px",
                     }}>
                      <p className='intial-name'>{getInitials(group.name)}</p>
                    </div>
                  <p className='group-name'>{group.name}</p>
                </div>
              </Link>
          ))}
        </div>
      </div>
    
  )
}

export default SideBar;
