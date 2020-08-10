import React from 'react';
import './index.scss';

class Loader extends React.Component {
    render() {
        return (
            <div className="lds-roller">
                <div/>
                <div/>
                <div/>
                <div/>
                <div/>
                <div/>
                <div/>
                <div/>
            </div>
        )
    }
}

export default Loader