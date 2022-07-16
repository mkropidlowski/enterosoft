import React from 'react'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import './LeaderBoard.css'


export default function LeaderBoard() {

  const [games, setGames] = useState([])
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate()
    
  useEffect(() => {

    const fetchData = async () => {
        const gamesUrl = 'https://gamehub-api-dev.enterosoft.com/games'
    
        axios.get(gamesUrl)
          .then(response => {
              setGames(response.data)
          }).catch(() => {
            setErrorMessage("Unable to fetch data");
        });
        }
          fetchData()
        }, [])

      
  function handleClick(event, key) {
      const gameListID = key;
        navigate(`SearchList/${gameListID}`)
      }

  return (
    <div className='app-container'>
      <div>
          <h4>Dostępne gry: </h4>
            <ul className='games-list'>  
              {games && games.map(gameList => (
                <li 
                  onClick={event => handleClick(event, gameList.id)}
                  key={gameList.id}
                >
                  {gameList.name}
                </li>
              ))}
            </ul>
          <hr></hr>

          {errorMessage && <div className="error">{errorMessage}</div>}
      </div>
    </div>
  )
}
