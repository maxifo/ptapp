import React from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import Traininglist from './Traininglist';
import Customerlist from './Customerlist';
import Button from '@material-ui/core/Button';

function Router() {
    return (
        <div className="App">
            <BrowserRouter>
                <div>
                    <Link to="/Customerlist"><Button color='primary' variant='outlined' style={{ margin: 10 }}>Customers</Button></Link>{' '}
                    <Link to="/Traininglist"><Button color='primary' variant='outlined' style={{ margin: 10 }}>Trainings</Button></Link>{' '}
                    <Switch>
                        <Route exact path="/Customerlist" component={Customerlist} />
                        <Route path="/Traininglist" component={Traininglist} />
                    </Switch>
                </div>
            </BrowserRouter>
        </div>
    );
}

export default Router;