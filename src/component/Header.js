import React from 'react'; 

const Header = (props)=>{
    return(
        <header className="App-header">
            <h2>{props.name}</h2>
        </header>
    )
}

export default Header;