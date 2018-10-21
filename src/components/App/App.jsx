import React, {Component} from 'react';
import ScaleTrainer from '../ScaleTrainer/ScaleTrainer';
import Breakpoint from '../Breakpoint/Breakpoint';

class App extends Component {
    render() {
        return (
            <>
                <ScaleTrainer/>
                <Breakpoint/>
            </>
        );
    }
}

export default App;
