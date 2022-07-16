import React from 'react'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";

import './SearchList.css'

export default function SearchList() {

       const [search, setSearch] = useState([])
       const [errorMessage, setErrorMessage] = useState("");

       let { id } = useParams()
    
         useEffect(() => {
         
         const fetchData = async () => {
              const searchUrl = `https://gamehub-api-dev.enterosoft.com/search?game_id=${id}&order_by=score_primary`
              
              axios.get(searchUrl)
                .then(response => {
                  setSearch(response.data)
                } 
                ).catch(() => {
                  setErrorMessage("Unable to fetch data");
              });   
             }
                fetchData()
             }, [])

  return (
    <div className='search-list-container'>
    
    {errorMessage && <div className="error">{errorMessage}</div>}
    
      <h2>LEADER BOARD</h2>
        <table className='search-list-table'>

          {search && 
          <thead>
            <tr className='table-header'>
              <th>ID</th>
              <th>Level ID</th>
              <th>Punkty</th>
              <th>Finish time</th>
              <th>Score premium</th>
              <th>Name</th>
              <th>Photo</th>
            </tr>
          </thead>
          }

          <tbody className='table-body'>
          
            {search && search.map(userData => (
              <tr key={userData.id}>
                <td>{userData.id}</td>
                <td>{userData.level_id}</td>
                <td>{userData.score_primary}</td>
                <td>{userData.finish_time}</td>
                <td>{userData.score_premium}</td>
                <td>{userData.user.nickname}</td>
                <td>
                  {userData.user.profile_pic && 
                  <img 
                      src={userData.user.profile_pic} 
                      width="50px" 
                      height="50px" 
                      alt="profile pic"/>
                  }
                  </td>
              </tr>
            ))}
          
          </tbody>
        </table>

    <Link to="/" className="btn-back">Back to list</Link>
    
    </div>
  )
}
