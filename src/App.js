
import { ThemeContextProvider } from "./styles/ThemeContext";
import GlobalStyle from './styles/GlobalStyles'
import { QuizProvider } from 'state/QuizState'
import Main from 'components/Main'
import React from 'react';


function App() {



  return (
    <ThemeContextProvider>
      <GlobalStyle />
      <QuizProvider>
        <Main />
      </QuizProvider>
      {/* <GridContextProvider>
        <GlobalStyle />
        <Container>
          <Header />
          <TextGrid />
          <KeyBoard />
        </Container>
      </GridContextProvider> */}
    </ThemeContextProvider>
  );
}

export default App;
