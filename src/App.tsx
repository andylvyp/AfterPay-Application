import React from "react";
import AddressAutoComplete from "./components/AddressAutoComplete";
import SwipeSelect from "./components/SwipeSelect";

function App() {
    return (
        <div className="App">
            <SwipeSelect initialIndex={3} updateValue={(val) => console.log(val)} theme="yellow" />
            <AddressAutoComplete updateValue={(val) => console.log(val)} />
        </div>
    );
}

export default App;
