import React from "react";

import ReduxToastr from "react-redux-toastr";

import Desk from "./scenes/Desk";

import { Provider } from "react-redux";
import store from "./store";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <ReduxToastr
          timeOut={2000}
          newestOnTop={false}
          preventDuplicates
          position="top-left"
          getState={(state) => state.toastr}
          transitionIn="fadeIn"
          transitionOut="fadeOut"
          progressBar
          closeOnToastrClick
        />
        <Desk />
      </Provider>
    </div>
  );
}

export default App;
