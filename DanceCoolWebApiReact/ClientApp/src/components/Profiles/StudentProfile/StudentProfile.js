import React from 'react';
import AttendancePage from '../../AttendancePage/Attendances';

const StudentProfile = () => {
    return (
        <div className="StudentProfile-main-context">
            <br />
            <div className="StudentProfile-attendances">
                <div>
                    <h2>Журнал відвідувань</h2>
                    <br />
                </div>
                <div>
                    <AttendancePage />
                </div>
            </div>
        </div>
    );
}

export default StudentProfile;