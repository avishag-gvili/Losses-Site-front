import { Provider } from "react-redux";
import { store } from "./redux/Store";
import FixedContainer from "./utils/enterPoint";
import { ThemeProvider } from 'styled-components';
import { createGlobalStyle } from 'styled-components';
import InitializedAuth from "./utils/InitializedAuth";

const GlobalStyle = createGlobalStyle`
  body {
    direction: rtl;
    text-align: right;
  }
`;

const theme = {
  direction: 'rtl',
  textAlign: 'right',
};


function App() {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <GlobalStyle />
        <InitializedAuth/>
        <FixedContainer />
      </Provider>
    </ThemeProvider>
  );
}

export default App;
