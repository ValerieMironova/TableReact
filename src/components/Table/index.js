import React from 'react';
import './index.scss';
import DetailRowView from "../DetailRowView";

class Table extends React.Component {
    constructor(props) {
        super(props);
        this.showNewItemRow = this.showNewItemRow.bind(this);
        this.addNewRow = this.addNewRow.bind(this);
        this.nextPage = this.nextPage.bind(this);
        this.previousPage = this.previousPage.bind(this);
        this.state = {
            row: null,
            page: 1,
            isShowAddItemRow: false,
            newItem: {
                id: '',
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
            }
        };
    }

    render() {
        const pageInfo = this.getPageInfo();

        const pagination = [];
        for (let i = 1; i <= pageInfo.pageCount; i++) {
            pagination.push(
                <li className={`page-item ${i === this.state.page ? 'active' : ''}`}
                    onClick={this.toPage.bind(this, i)}>
                    <button className="page-link">{i}</button>
                </li>
            )
        }

        return (
            <div className="container">
                {!this.state.isShowAddItemRow &&
                <button className="btn btn-outline-secondary" type="button"
                        onClick={this.showNewItemRow}>Добавить</button>
                }
                {this.state.isShowAddItemRow &&
                <button className="btn btn-outline-secondary" type="button" disabled={this.isAddButtonDisabled()}
                        onClick={this.addNewRow}>Сохранить</button>
                }
                <table className="table table-striped">
                    <thead>

                    <tr>
                        <th scope="col" onClick={this.props.onSort.bind(null, 'id')}>id {this.props.sortField === 'id' ?
                            <small>{this.props.sortOrder === 'asc' ? '▲' : '▼'}</small> : null}</th>
                        <th scope="col"
                            onClick={this.props.onSort.bind(null, 'firstName')}>firstName {this.props.sortField === 'firstName' ?
                            <small>{this.props.sortOrder === 'asc' ? '▲' : '▼'}</small> : null}</th>
                        <th scope="col"
                            onClick={this.props.onSort.bind(null, 'lastName')}>lastName {this.props.sortField === 'lastName' ?
                            <small>{this.props.sortOrder === 'asc' ? '▲' : '▼'}</small> : null}</th>
                        <th scope="col"
                            onClick={this.props.onSort.bind(null, 'email')}>email {this.props.sortField === 'email' ?
                            <small>{this.props.sortOrder === 'asc' ? '▲' : '▼'}</small> : null}</th>
                        <th scope="col"
                            onClick={this.props.onSort.bind(null, 'phone')}>phone {this.props.sortField === 'phone' ?
                            <small>{this.props.sortOrder === 'asc' ? '▲' : '▼'}</small> : null}</th>
                    </tr>


                    </thead>
                    <tbody>
                    {this.state.isShowAddItemRow &&
                    <tr>
                        <td>
                            <input type="text" id="id" className="form-control" placeholder="id"
                                   onChange={this.onHandleChange} value={this.state.newItem.id}/></td>
                        <td>
                            <input type="text" id="firstName" className="form-control" placeholder="firstName"
                                   onChange={this.onHandleChange} value={this.state.newItem.firstName}/></td>
                        <td>
                            <input type="text" id="lastName" className="form-control" placeholder="lastName"
                                   onChange={this.onHandleChange} value={this.state.newItem.lastName}/></td>
                        <td>
                            <input type="text" id="email" className="form-control" placeholder="email"
                                   onChange={this.onHandleChange} value={this.state.newItem.email}/></td>
                        <td>
                            <input type="text" id="phone" className="form-control" placeholder="phone"
                                   onChange={this.onHandleChange} value={this.state.newItem.phone}/></td>
                    </tr>
                    }
                    {pageInfo.content.map(item => (
                        <tr key={item.id + item.phone} onClick={this.onRowSelect.bind(null, item)}>
                            <td>{item.id}</td>
                            <td>{item.firstName}</td>
                            <td>{item.lastName}</td>
                            <td>{item.email}</td>
                            <td>{item.phone}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>

                <nav aria-label="Page navigation example">
                    <ul className="pagination">
                        {this.state.page !== 1 &&
                        <li className="page-item" onClick={this.previousPage}>
                            <button className="page-link" aria-label="Previous">
                                <span aria-hidden="true">&laquo;</span>
                                <span className="sr-only">Previous</span>
                            </button>
                        </li>}
                        {pagination}
                        {this.state.page !== pageInfo.pageCount &&
                        <li className="page-item" onClick={this.nextPage}>
                            <button className="page-link" aria-label="Next">
                                <span aria-hidden="true">&raquo;</span>
                                <span className="sr-only">Next</span>
                            </button>
                        </li>}
                    </ul>
                </nav>

                <DetailRowView row={this.state.row}/>
            </div>
        )
    }

    onRowSelect = row => (
        this.setState({row})
    );

    onHandleChange = event => {
        const cloneNewItem = this.state.newItem;
        const {id, value} = event.currentTarget;
        cloneNewItem[id] = value;
        this.setState({newItem: cloneNewItem})
    };

    isAddButtonDisabled() {
        const item = this.state.newItem;
        return !item || !item.id || !item.firstName || !item.lastName || !item.email || !item.phone;
    };

    showNewItemRow() {
        this.setState({isShowAddItemRow: true});
    };

    addNewRow() {
        this.props.onAddItem(this.state.newItem);

        const newItem = {
            id: '',
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
        };
        this.setState({newItem, isShowAddItemRow: false})
    };

    getPageInfo() {
        const items = this.props.items;

        const pageSize = 50;
        const pageCount = Math.ceil(items.length / pageSize);
        let pageNumber = pageCount < this.state.page ? 1 : this.state.page;
        if (pageNumber !== this.state.page) {
            this.setState({page: 1})
        }

        const content = [];

        const firstItemIdx = pageSize * (pageNumber - 1);
        const lastItemIdx = Math.min(firstItemIdx + pageSize - 1, items.length - 1);
        for (let i = firstItemIdx; i <= lastItemIdx; i++) {
            content.push(items[i]);
        }


        return {
            pageCount,
            content
        }
    }

    nextPage() {
        this.setState({page: this.state.page + 1})
    }

    previousPage() {
        this.setState({page: this.state.page - 1})
    }

    toPage(page) {
        this.setState({page})
    }
}

export default Table