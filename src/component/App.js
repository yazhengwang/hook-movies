import React,{useReducer, useEffect} from 'react';
// import logo from './logo.svg';
import './App.css';
import Header from "./Header";
import Movie from "./Movie";
import Search from "./Search";
import Loadings from './Loading';

const initialState={
  loading:true,
  movies:[],
  errorMessage:null
};

const reducer=(state,action)=>{
  switch(action.type){
    case 'SEARCH_MOVIES_REQUEST':
      return{
        ...state,
        loading:false,
        errorMessage:null
      };
    case 'SEARCH_MOVIES_SUCCESS':
      return{
        ...state,
        loading:false,
        movies:action.payload,
      }
    case "SEARCH_MOVIES_FAILURE":
        return {
          ...state,
          loading: false,
          errorMessage: action.error
        };
    default:
      return state;
  }
};

const MOVIE_API_URL = "https://www.omdbapi.com/?s=man&apikey=4a3b711b";

const App=()=>{
  const [state, dispatch] = useReducer(reducer, initialState);
  const { movies, errorMessage, loading } = state;
  useEffect(()=>{
    fetch(MOVIE_API_URL)
      .then(response => response.json())
      .then(jsonResponse => {
        console.log('-------', jsonResponse)
        dispatch({
          type: "SEARCH_MOVIES_SUCCESS",
          payload: jsonResponse.Search
        });
      });
  },[])


  const search=(searchValue)=>{
    dispatch({
      type:"SEARCH_MOVIES_REQUEST",
    })

    fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=4a3b711b`).then(response => response.json()).then(jsonRes=>{
      console.log('-------', jsonRes)
      if(jsonRes.Response === 'True'){
        dispatch({
          type:'SEARCH_MOVIES_SUCCESS',
          payload: jsonRes.Search
        })
      }else{
        dispatch({
          type:'SEARCH_MOVIES_FAILURE',
          error: jsonRes.Error
        })
      }
    }).catch(err=>{
      console.log('----err---', err)
    })
  }
  return(
    <div className="App">
      <Header text="Hooked" />
      <Search search={search} />
      <p className="App-intro">Sharing a few of our favourite movies</p>
      <div className="movies">
        {loading && !errorMessage ? ( 
         <Loadings />
          ) : errorMessage ? (
            <div className="errorMessage">
              <Loadings />
              {errorMessage}</div>
          ) : (
            movies.map((movie, index) => (
              <Movie key={`${index}-${movie.Title}`} movie={movie} />
            ))
          )}

      </div>
      {/* <Loadings  /> */}
    </div>
  )
}

export default App;
