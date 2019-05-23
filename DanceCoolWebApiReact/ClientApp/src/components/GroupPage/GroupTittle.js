import React from 'react';

const GroupTittle = (props) => {
    return (
        <div className="card" style={{ "width": "18rem" }}>
            <div className="card-body">
            <h5 className="card-title">{props.group.groupDirection}</h5>
                <ul>         
                <li className="card-text">{props.group.groupLevel}</li>
                <li>Наставники</li>
                <li className="card-text">{props.group.primaryMentor}</li>
                <li className="card-text">{props.group.secondaryMentor}</li>
                </ul>
            </div>
        </div>
    );
}

export default GroupTittle;