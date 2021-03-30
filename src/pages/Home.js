import AudioTable from '../components/AudioTable'
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className='container'>
      <div className='row'>
        <AudioTable />
      </div>
      <div className='row'>
        <button type="button" className="btn btn-light">
          <Link to="/addRecording">+</Link>
        </button>
      </div>
    </div>
  );
}

export default Home;
