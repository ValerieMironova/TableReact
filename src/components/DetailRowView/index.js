import React from 'react';

class DetailRowView extends React.Component {

    render() {
        return (
            this.props.row &&
            <div>
                <p>Выбран пользователь <b>{this.props.row.firstName + ' ' + this.props.row.lastName}</b></p>
                <p>
                    Описание: <br/>
                    <textarea defaultValue={this.props.row.description}/>
                </p>

                <p>Адрес проживания: <b>{this.props.row.address.streetAddress}</b></p>
                <p>Город: <b>{this.props.row.address.city}</b></p>
                <p>Провинция/штат: <b>{this.props.row.address.state}</b></p>
                <p>Индекс: <b>{this.props.row.address.zip}</b></p>

            </div>
        )
    }
}

export default DetailRowView