import React from 'react';

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchField: ""
        }
    }

    render() {
        return (
            <div className="container">
                <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder="Введите данные"
                           aria-label="Введите данные" aria-describedby="basic-addon2"
                           onChange={this.searchFieldChangeHandler}
                           value={this.state.searchField}/>
                    <div className="input-group-append">
                        <button className="btn btn-outline-secondary" type="button"
                                onClick={this.props.onSearch.bind(null, this.state.searchField)}>Найти
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    searchFieldChangeHandler = event => {
        this.setState({searchField: event.target.value})
    }
}


export default Search