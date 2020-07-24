import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(){
    super();
    this.state = {
      characters: [],
      userEdited: { name: "", thumbnail: "", description: "" }
    }
  }

  async componentDidMount(){
    let url = "https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=a52ed7bfc15a56ab146fe1d85650d9cc&hash=5c2e58bb6d69a204dea09aee599e071e&events=314";
    let response = await fetch(url);
    let results = await response.json();
    this.setState({characters: results.data.results});
  }

  Search = event => {
    this.setState({
      userEdited: {
        ...this.state.userEdited,
        [event.target.name]: event.target.value
      }
    });
  };
  Buscar=()=>{
    let userArray=[...this.state.characters];
    let filterUser= userArray.filter(character=> character.name.includes(this.state.Search));
    let list= filterUser.map(character=>{
      return (
        <div className="card">
          <h5>{character.name}</h5>
                  <img src={character.thumbnail.path + '/landscape_incredible' + '.' + character.thumbnail.extension} />
                  <p>{character.description}</p>
        </div>
      )
    })
  }
    
  render(){
    return (
      <div>
        <div className="formulario">
          <form>
            <input type="text" name="name" placeholder="Buscar" onInput={this.Buscar} />
          </form>
        </div>
        <div className="App">        
          {
            this.state.characters.map((character)=>{
              return (
                <div className="card">
                  <h5>{character.name}</h5>
                  <img src={character.thumbnail.path + '/landscape_incredible' + '.' + character.thumbnail.extension} />
                  <p>{character.description}</p>
                </div>
              )
            })
          }
        </div>
      </div>
      
    );
  }
}

export default App;
