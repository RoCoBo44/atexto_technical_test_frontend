import React, { useState, useEffect  } from 'react'
import axios from 'axios'

function AudioRow(props) {
  const id = props.id
  const title = props.title
  const [sourceAudio, setSourceAudio] = useState("data:audio/ogg;base64,")

  useEffect(() => {
    (async () => {
      await axios({
        method: 'get',
        url: `http://localhost:3001/recordings/${id}`,
      })
      .then( res => {
        if (res.data.audio)
          fetch("data:audio/ogg;base64," + res.data.audio)
            .then(resp => resp.blob())
            .then(URL.createObjectURL)
            .then(setSourceAudio)
      })
      .catch(err => {
        console.error(err)
      })
    })();
  }, []);

  return (
    <div className="row align-items-center">
      <div className="col-2">
        <span> {title} </span>
      </div>
      <div className="col">
        <audio controls src={sourceAudio} />
      </div>
      {props.children}
      
    </div>
  )
}

export default AudioRow;
