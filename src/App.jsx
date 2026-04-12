import React, { useEffect, useContext } from 'react';
import { DataContext } from './components/dataProvider/dataProvider';
import { auth } from './assets/firebase';
import { Type } from "./utility/action.type";
import Routing from './Routing';

function App() {
  const [{ user }, dispatch] = useContext(DataContext);

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // console.log(authUser);
        dispatch({ type: Type.SET_USER, user: authUser });
      } else {
        dispatch({ type: Type.SET_USER, user: null });
      }
    });
  }, []);
  return (
    <div>
      <Routing />
    </div>
  );
}

export default App;