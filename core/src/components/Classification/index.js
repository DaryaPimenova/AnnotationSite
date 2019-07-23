import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Help from '../Help';
import MyClassification from "./MyClassification";


const ClassificationHelp = () => {
    return (
        <Help 
            header="Классификация" 
            description="Чтобы научить ИИ распознавать различные объекты, мы обучаем его на основе набора изображений, каждому из которых присвоен определенный класс. Ваша цель - указать, что видно на изображении, выбрав соответствующий класс из списка." 
            video_url="/media/instructions/classification.mp4"
            poster="/media/main_page/classification.png"
            tool_url="/classification"
        />
    );
}


export default class Detection extends React.Component {

    render() {
        return (
            <div>
                <Switch>
                    <Route exact path="/classification" component={MyClassification} />
                    <Route exact path="/classification/help" component={ClassificationHelp} />
                </Switch>
            </div>
        )
    }
}
