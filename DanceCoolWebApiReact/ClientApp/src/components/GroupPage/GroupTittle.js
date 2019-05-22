import React from 'react';

const GroupTittle = (props) => {
    return (
        <div className="card" style={{ "width": "18rem" }}>
            <div className="card-body">
                <h5 className="card-title">{props.group.groupDirection}</h5>
                <p className="card-text">{props.group.groupLevel}</p>
                <p>Наставники</p>
                <p className="card-text">{props.group.primaryMentor}</p>
                <p className="card-text">{props.group.secondaryMentor}</p>
            </div>
        </div>
    );
}

export default GroupTittle;