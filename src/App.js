import React, { Component } from 'react'
import './App.css'
import Upload from './upload/Upload'

class App extends Component {
    render() {
        return (
            <div className="App">
                <div className="Head">
                    <p>
                        <h1>INDEL ANALYSIS</h1>
                    </p>
                </div>
                <div className="Card">
                    <Upload />
                </div>
            </div>
        )
    }
}

export default App