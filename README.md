# atexto_technical_test_frontend

## How to run it

The [backend](https://github.com/RoCoBo44/atexto_technical_test_backend) should be running first

Then run  

### `npm install`

### `npm start`

Open [http://localhost:3000](http://localhost:3000) to view it in the browser

## Folders

In src/components you can find the components used

* AudioRow is a row from the AudioTable

* AudioRecorder has all the logic to send the audio to the backend but to record the actual audio i used the react-voice-recorder component

In src/pages you can find the pages of the app

* Home is the main page where you can see the AudioTable. There you can delete, rename, filter and sort by name

* AddRecording is where you will add the new recordings, you have to press the mic and add a title to do so

* UpdateRecording is where you will be send if you wanted to rename a recording

There would be repercussions in the backend by all actions made in the frontend (delete, add, rename) 

I should have made one folder to store all the queries to the backend but due to time I couldn't

Sorry in advance for the UI/UX