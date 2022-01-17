import React from 'react';
import axios from 'axios';
import PokemonCard from './Components/PokemonCard.js';
import SelectType from './Components/SelectType.js';
import SimpleBackdrop from './Components/SimpleBackdrop.js';
import Next from './Components/Next-previous.js';
import './Style/App.css';

export default function App() {
  const [u, uSet] = React.useState([]);
  const [theurl, seturl] = React.useState('https://pokeapi.co/api/v2/pokemon');
  const [nextURL, setnextURL] = React.useState();
  const [prevURL, setprevURL] = React.useState();
  const [inputdata, setinputdata] = React.useState('');
  const [filterdata, setfiltetdata] = React.useState([]);
  const [loading, setloading] = React.useState(true);
  const [modalStatus, setmodalStatus] = React.useState(false);
  const notFoundimgSrc =
    'https://media0.giphy.com/media/ARfJtEhX4RBzinTjIA/giphy.gif?cid=790b761144905fbdde6a32f846c471641233750fda9eef72&rid=giphy.gif&ct=s';

  React.useEffect(() => {
    async function fetchUsers() {
      setloading(true);
      const fullResponse = await axios.get(theurl);

      uSet(fullResponse.data.results);
      setfiltetdata(fullResponse.data.results);
      setnextURL(fullResponse.data.next);
      setprevURL(fullResponse.data.previous);
      console.log('okok');
      setloading(false);
    }

    fetchUsers();
  }, [theurl]);

  const nextpage = () => {
    seturl(nextURL);
  };
  const prvpage = () => {
    seturl(prevURL);
  };

  function inputfun(event) {
    const searchVal = event.target.value;
    setinputdata(searchVal);
    console.log(searchVal);
    const filterPokemon = u.filter((value) => {
      if (value.name.includes(searchVal.toLowerCase())) {
        return value;
      }
    });

    setfiltetdata(filterPokemon);
  }

  const ii = filterdata.map((data, index) => {
    return (
      <div key={index} className="pokeCardEach">
        <PokemonCard oldnames={data.name} index={index} url={data.url} />
      </div>
    );
  });

  const HandlePokemon = () => {
    if (filterdata.length == 0) {
      return (
        <div className="notfound">
          <h1>Not Found...</h1>
          <img src={notFoundimgSrc} alt="Not Found" />
        </div>
      );
    } else {
      return <div className="flex-row">{ii}</div>;
    }
  };

  const handleselect = (selectdata, alltypedata) => {
    console.log(selectdata);
  };

  const reren = () => {
    setmodalStatus(false);
  };

  return (
    <div>
      {loading && <SimpleBackdrop />}

      <div className="row d-flex justify-content-around tophadder">
        <div className="col-8 searchdiv">
          <input placeholder="Search Anything" onChange={inputfun}></input>
        </div>

        <div className="selectdiv col-4">
          <SelectType u={u} handleselect={handleselect} />
        </div>
      </div>

      <div className="pokdiv">{HandlePokemon()}</div>
      <Next nextpage={nextpage} prvpage={prvpage} prevURL={prevURL} />
    </div>
  );
}
