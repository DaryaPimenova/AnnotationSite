import React from 'react';
import Menu from './Menu';
import { Player } from 'video-react';
import { Redirect } from "react-router-dom";
import { NavLink } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';


export default class Help extends React.Component {

    render() {
        const { header, description, video_url, poster, tool_url } = this.props;

        return (
            <div className="background">
                <Menu />
                <Row className="justify-content-md-center">
                    <Col md={8} className='react-player'>
                        <h1 className="instruction-header">{header}</h1>
                        <div className="instruction-description">
                            {description}
                        </div>
                        <Player
                            playsInline
                            fluid={false}
                            width={600}
                            height={400}
                            poster={poster}
                            src={video_url}
                        />
                        <NavLink to={tool_url} className="btn btn-primary got-it">
                            Понятно
                        </NavLink>
                    </Col>
                </Row>
            </div>
        )
    }
}
