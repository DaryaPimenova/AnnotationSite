import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Help from '../Help';
import Detect from "./Detect";


const DetectHelp = () => {
    return (
        <Help 
            header="Детекция" 
            description="Чтобы научить ИИ обнаруживать объекты на изображениях, мы предоставляем bounding box. Выберите класс из списка и выделите соответствующий объект с помощью ограничительной рамки." 
            video_url="/assets/poster.png"
            poster="/assets/poster.png"
            tool_url="/detection"
        />
    );
}


export default class Detection extends React.Component {

    render() {
        return (
            <div>
                <Switch>
                    <Route exact path="/detection" component={Detect} />
                    <Route exact path="/detection/help" component={DetectHelp} />
                </Switch>
            </div>
        )
    }
}
