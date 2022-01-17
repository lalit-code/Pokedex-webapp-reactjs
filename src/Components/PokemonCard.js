import React from 'react';
import axios from 'axios';
import '../Style/PokemonCard.css';

import CustomizedDialogs from './PokemonModal.js';
export default function PokemonCard(props) {
  const [pokemonData, updatedata] = React.useState(0);

  const [name, updatename] = React.useState('');
  const [id, updateid] = React.useState();
  const [typepok, settypepok] = React.useState([]);
  const [stats, setStats] = React.useState([]);
  const [modalStatus, setmodalStatus] = React.useState(false);
  const imgsrc =
    'https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/' +
    id +
    '.svg';
  var type;

  const okok = () => {
    async function fetchpok() {
      const fullR = await axios.get(props.url);
      setStats(fullR.data.stats);
      settypepok(fullR.data.types);
      updatename(fullR.data.name.toUpperCase());
      updateid(fullR.data.id);

      updatedata(fullR.data.moves.length);
    }

    fetchpok();
  };

  React.useEffect(() => {
    okok();
  }, [props.oldnames]);

  const rerender = () => {
    setmodalStatus(true);
  };

  return (
    <div className="pokcard d-inline-flex">
      <div
        className="container-fluid d-inline-flex"
        onClick={() => {
          setmodalStatus(true);
        }}
      >
        {modalStatus && (
          <CustomizedDialogs
            rerender={rerender}
            name={name}
            imgsrc={imgsrc}
            stats={stats}
          />
        )}

        <div className="card mb-3 pokbody">
          <div className="row g-0">
            <div className="col-7 container">
              <div className="card-body">
                <h5 className="card-title">#{id}</h5>
                <h3>{name}</h3>
                {typepok.map((val) => {
                  return (
                    <p className="poktype">
                      <i>{val.type.name}</i>
                    </p>
                  );
                })}
              </div>
            </div>

            <div className="col-5 pokimg">
              <img
                src={imgsrc}
                className="img-fluid rounded-start"
                alt={props.name}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
