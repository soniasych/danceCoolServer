import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class AdminPage extends Component {
    render() {
        return (<div>
            <ul className="list-group">
                <li className="list-group-item"><Link to="/students">Студенти</Link></li>
                <li className="list-group-item"><Link to="/groups">Групи</Link></li>
                <li className="list-group-item"><Link to="/groups">Відвідуваність</Link></li>
            </ul>
        </div>);
    }
}
