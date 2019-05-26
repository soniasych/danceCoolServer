import React from 'react';

const GroupTittle = (props) => {
    return (
        <div className="card" style={{ "width": "18rem" }}>
            <div className="card-body">
            <h5 className="card-title">{props.group.groupDirection} {props.group.groupLevel}</h5>
                <div>Наставники</div>
                <ul>
                <li className="card-text">{props.group.primaryMentor}</li>
                <li className="card-text">{props.group.secondaryMentor}</li>
                </ul>
            </div>
        </div>
    );
}

export default GroupTittle;