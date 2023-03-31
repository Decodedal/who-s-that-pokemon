import React, {useRef, useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import ball from "./imgs/pokeball.png"

interface PokeData{
  name:string,
  url:string
}

interface PokeList{
  PokeList : PokeData[]
}

interface Poketester{
  [key:string] : string
}

function App() {
  
  const h1 = useRef<HTMLImageElement>(null)
  // console.log(h1.current)
  const [pokemonData, setPokemonData] = useState<any>([{}]);
  const [pokemon, setPokemon] = useState<PokeData>({name:"sdfdsf", url:ball});
  const [image, setImage] = useState<string>(ball);
  const [score, setScore] = useState<number>(0);
  const [heading, setHeading] = useState<string>("Who's That Pokémon")
  const [reveal, setReveal] = useState<Boolean>(true)

  useEffect(()=>{
    
    let arr: number[] = [Math.floor(Math.random() * 151) + 1, Math.floor(Math.random() * 151) + 1, Math.floor(Math.random() * 151) + 1]

    let dataList :any = []

    arr.forEach((number)=>{
      const fetchData = async() =>{
        const fetchedData = await fetch(`https://pokeapi.co/api/v2/pokemon/${number}`);
        const data = await fetchedData.json()
        let name:string = data.name;
        let url: string = data.sprites.other["official-artwork"]["front_default"] 
        dataList.push({
          name: name,
          url : url
        })
        console.log(data)
      }

      fetchData()
  
    })
    setPokemonData(dataList)
  },[score])

 
 const addPokemon = () =>{
  let choice = pokemonData[Math.floor(Math.random() * pokemonData?.length)]
  // let choice = pokemonData[0]
  console.log(choice)
  setPokemon(choice)
  // console.log(pokemonData[index])
  setImage(pokemon.url)
  setReveal(false)
  setHeading("Who's That Pokémon")

 }

 const checkAnswer = (answer:PokeData) =>{
    setHeading(`It's ${pokemon.name}`)
    setReveal(true)
    if(answer.name === pokemon.name){
      setScore(prev => prev + 1)
    }else{
      setScore(score)
    }
 }

  return (
    <div className="App">
      <h1>{heading}</h1>
      <button className='start' onClick={() => addPokemon()}>Start the game</button>
      <img className={reveal ? 'pic-reveal' : 'pic'} src={pokemon.url}/>
      <div className='button-container'>
        {
          pokemonData ?
          pokemonData.map((pokemon:PokeData, index: number) =>{
            return(
              <button className='name-button' key={index} onClick={() => checkAnswer(pokemon)}>{pokemon.name}</button>
            )
          })
          :
          null
        }
      </div>
      <p>Score: {score}</p>
    </div>
  );
}

export default App;
