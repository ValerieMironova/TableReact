import React from 'react';
import './index.scss';
import Loader from "../components/Loader";
import {getLargeData, getSmallData} from "../api/data";
import Table from "../components/Table";
import _ from 'lodash';
import Search from "../components/Search";


class StartPage extends React.Component {
    constructor(props) {
        super(props);
        this.fetchSmallData = this.fetchSmallData.bind(this);
        this.fetchLargeData = this.fetchLargeData.bind(this);
        this.state = {
            status: "openStartPage",
            items: [],
            sortOrder: 'asc',  // 'desc'
            sortField: 'id', // поле по умолчанию
            search: '',
            currentPage: 0,
        };
    }

    render() {
        let screen;
        if (this.state.status === "openStartPage") {
            screen = <div className="start-page">
                <button className="start-page_first-button" onClick={this.fetchSmallData}>Меньший объем данных</button>
                <button className="start-page_second-button" onClick={this.fetchLargeData}>Больший объем данных</button>
            </div>

        } else if (this.state.status === 'openLoader') {
            screen = <Loader/>;
        } else if (this.state.status === 'openTable') {
            screen =
                <React.Fragment>
                    <Search onSearch={this.onSearch}/>
                    <Table items={this.getFilteredItems()}
                           onSort={this.onSort}
                           sortOrder={this.state.sortOrder}
                           sortField={this.state.sortField}
                           onAddItem={this.onAddItem}>
                    </Table>;
                </React.Fragment>
        } else if (this.state.status === 'openError') {
            screen = <h1>Произошла ошибка при получении данных</h1>
        }
        return (
            <div>
                {screen}
            </div>
        )
    }

    fetchSmallData() {
        this.setState({status: 'openLoader'});

        const self = this;
        getSmallData()
            .then(function (response) {
                self.setState({items: response.data, status: 'openTable'})
            })
            .catch(function (error) {
                console.log(error);
                self.setState({status: 'openError'});
            })
    }

    async fetchLargeData() {
        this.setState({status: 'openLoader'});

        try {
            const {data} = await getLargeData();
            this.setState({items: data, status: 'openTable'})
        } catch (error) {
            console.log(error);
            this.setState({status: 'openError'});
        }
    }

    onSort = sortField => {
        const cloneData = this.state.items.concat();
        const sortOrder = this.state.sortOrder === 'asc' ? 'desc' : 'asc';
        const items = _.orderBy(cloneData, sortField, sortOrder);
        this.setState({items, sortOrder, sortField})
    };

    onSearch = search => (
        this.setState({search})
    );

    getFilteredItems() {
        const {items, search} = this.state;

        if (!search) {
            return items
        }

        return items.filter(item => {
            return item.firstName.toLowerCase().includes(search.toLowerCase())
                || item.lastName.toLowerCase().includes(search.toLowerCase())
                || item.email.toLowerCase().includes(search.toLowerCase())
        })
    }

    onAddItem = item => {
        const cloneData = this.state.items.concat();
        cloneData.unshift(item);
        this.setState({items: cloneData})
    }
}

export default StartPage
