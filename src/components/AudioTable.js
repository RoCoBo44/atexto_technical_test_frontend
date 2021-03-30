import React, { useState, useEffect  } from 'react'
import axios from 'axios'
import AudioRow from './AudioRow'
import { Link } from "react-router-dom";

function AudioTable() {

  const [sortedField, setSortedField] = React.useState(null)
  const [ascendingDirection, setAscendingDirection] = React.useState(false)
  const [data, setData] = useState([{ "_id": ""}])
  const [searchField, setSearchField] = useState("")



  useEffect(() => {
    (async () => {
      await axios({
        method: 'get',
        url: `http://localhost:3001/recordings/`,
      })
      .then(res => {
        setData(res.data)
      })
      .catch(err => {
        console.error(err)
      })
    })();
  }, []);

  const handleDelete = async (id) => { 
    const newData = data.filter(recording => recording._id !== id);
    setData(newData);
    await axios({
      method: 'delete',
      url: `http://localhost:3001/recordings/${id}`,
    })
    .catch(err => {
      console.error(err)
    })
  }


  const requestSort = key => {

    if (sortedField === key){
      setAscendingDirection(!ascendingDirection)
    }

    setSortedField(key)
  
    let sortedData = [...data];
    if (sortedField) {
      sortedData.sort((a, b) => {
        if (a[sortedField].toLowerCase() < b[sortedField].toLowerCase()) {
          return ascendingDirection ? -1 : 1
        }
        if (a[sortedField].toLowerCase() > b[sortedField].toLowerCase()) {
          return ascendingDirection ? 1 : -1
        }
        return 0
      })
    }
    setData(sortedData)
  }

  return (
    <div className="AudioTable">
      <button className="inline" type="button" onClick={() => requestSort('title')} >
        Name
      </button>
      <input value={searchField} onInput={e => setSearchField(e.target.value)}/>
      <table>
        <tbody>
          {data.filter( (data) => {
            if (data.title)
              return data.title.toLowerCase().indexOf(searchField) >= 0
            else
              return true
          })
          .map((data) => (
            <tr key={data._id}>
              < AudioRow id= {data._id} title= {data.title} audio= "audio.mp3">
                <div className='col'>
                  <button type="button" className="btn btn-danger" onClick={() => handleDelete(data._id)} > delete </button>
                  <button type="button" className="btn btn-warning" > 
                    <Link to={'/addRecording/'+data._id} > update </Link>
                  </button>
                </div>
              </ AudioRow>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default AudioTable;




