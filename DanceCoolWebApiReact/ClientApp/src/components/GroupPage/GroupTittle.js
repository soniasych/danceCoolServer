import React from 'react';

const GroupTittle = (props) => {
    return (
        <div className="card" style={{ "width": "18rem" }}>
            <div className="card-body">
            <h5 className="card-title">{props.group.groupDirection} {props.group.groupLevel}</h5>
                <div>Наставники</div>
                <ul>
                <li className="card-text">{props.group.primaryMentorFirstName} {props.group.primaryMentorLastName}</li>
                <li className="card-text">{props.group.secondaryMentorFirstName} {props.group.secondaryMentorLastName}</li>
                </ul>
            </div>
        </div>
    );
}

export default GroupTittle;