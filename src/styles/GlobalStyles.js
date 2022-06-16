import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
*{
    box-sizing: border-box;
}

  body{
    margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  
  }
  p,h1,h2,h3,h4,h5,h6, label{
    color:#002271;
  }
  h2{
      font-size:18px;
      margin:10px 0 ;
    }
  .emptyTile{
    background: transparent;
    border: 2px solid #3a3a3c;
  }
  .wrongPosColor{
    color:#db9504 !important;
  }
  .wrongColor{
    color:#ff5051 !important;
  }
  .correctColor{
    color:#16bc16 !important;
  }

  .correctTile{
    background: #538d4e !important;
    border: none;
  }
  .wrongTile{
    background: #3a3a3c !important;
    pointer-events:none;
    border: none;
  }
  .inputTile{
    border-color:#565758;
  }
  .wrongPosTile{
    background: #b59f3b !important;
    border: none;
  }
  .smallTitle{
      font-size:16px;
      font-weight:500;
    }
    form{
      display:flex ;
      flex-direction: column;
    }
   
    .keys{
      display:flex ;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      margin:0 auto ;
      margin:20px 0 20px 0;
    }
    .answercontainer{
      display:flex;
      flex-wrap: wrap;
      margin: 20px;
      justify-content: center;
      align-items: center;
      
    }
    .answercontainer p{
      text-transform: capitalize;
      margin: 10px;
      padding: 10px 20px;
      background: ${({ theme }) => theme.colors.light_blue};
      color:#fff;
      border-radius: 20px;
      font-weight:600;
      background:${({ theme }) => theme.colors.blue};
    }
    .subtitle{
      color:${({ theme }) => theme.colors.purple_light};
      text-align:center;
    }
  @media screen and (min-width:768px){
    
    .smallTitle{
      font-size:16px;
      font-weight:500;
      margin: 5px 0;
    }

  }
`


export default GlobalStyle
