import React from 'react'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import './LeaderBoard.css'


export default function LeaderBoard() {

  const [games, setGames] = useState([])
  const [errorMessage, setErrorMessage] = useState("");
  const [checkedFinish, setCheckedFinish] = useState(false)
  const [checkedPrimary, setCheckedPrimary] = useState(false)
  const [checkedPremium, setCheckedPremium] = useState(false)

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

      
  const handleClick = (event, key) => {
      const gameListID = key;
        navigate(`SearchList/${gameListID}`)
      }


  const handleChangeFinish = (e) => {
    console.log(e.target.value)
    setCheckedFinish(!checkedFinish)
    console.log(checkedFinish)
  }

  const handleChangePremium = () => {
    setCheckedPremium(!checkedPremium)
    console.log(checkedPremium)
  }

  const handleChangePrimary = () => {
    setCheckedPrimary(!checkedPrimary)
    console.log(checkedPrimary)
  }

  console.log(checkedFinish)  

  return (
    <div className='app-container'>
      <div>
        <h4>Sortuj tablice po: </h4>
            <div className="checkbox-div">
              <label>
                <input
                  type="checkbox"
                  label="Score primary"
                  value={checkedPrimary}
                  onChange={handleChangePrimary}
                />
                Score primary
              </label>
              
              <label>
                <input
                  type="checkbox"
                  label="Finish time"
                  value={checkedFinish}
                  onChange={handleChangeFinish}
                />
                Finish time
              </label>

              <label>
                <input
                  type="checkbox"
                  label="Score premium"
                  value={checkedPremium}
                  onChange={handleChangePremium}
                />
                Score premium
              </label>
            </div>

          <h4>Dostępne gry: (wybierz opcje sortowania, wybierz grę)</h4>
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
