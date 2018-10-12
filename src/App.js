import React, {Component} from 'react';
import './App.scss';
import ScaleTrainer from './components/ScaleTrainer/ScaleTrainer';

class App extends Component {
    render() {
        return (
            <>
                <ScaleTrainer/>
                <div className="breakpoint--mobile">Mobile</div>
                <div className="breakpoint--tablet">Tablet</div>
                <div className="breakpoint--desktop">Desktop</div>
            </>
        );
    }
}

export default App;
