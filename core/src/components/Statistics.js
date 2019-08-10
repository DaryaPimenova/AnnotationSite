import React from 'react';
import Menu from './Menu';
import {connect} from 'react-redux';
import {annotation} from "../actions";
import { Redirect } from "react-router-dom";


class Statistics extends React.Component {

    componentWillMount() {
        this.props.getStatistics();
    }

    render() {
        const { statistics_messages, isSuperUser } = this.props;
        if (!isSuperUser) {
            return <Redirect to="/" />
        }


        return (
            <div>
                <Menu />
                <div>Cтатистика разметки:</div>
                <a className='btn btn-primary' href="/api/classifications/download/">
                    Выгрузить отчёт по классификации
                </a>
                <a className='btn btn-primary' href="/api/detections/download/">
                    Выгрузить отчёт по детекции
                </a>
                <ul>
                {
                    statistics_messages.map((msg, i) => {
                        return <li key={i}>{msg}</li>
                    })
                }
                </ul>
            </div>
        )
    }
}

const mapStateToProps = state => {
    const { user } = state.auth;
    return {
        isSuperUser: user && user.is_superuser,
        statistics_messages: state.annotation.statistics_messages
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getStatistics: () => dispatch(annotation.getStatistics())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Statistics);
