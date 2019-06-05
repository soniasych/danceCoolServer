import React from 'react';
import { Table } from 'react-bootstrap';
import './Schedule.css';

const Schedule = () => {
    return (<div className='schedule-container'>
        <h4>Розклад занять станом на жовтень 2018 року</h4>
        <br />
        <Table bordered>
            <thead>
                <tr>
                    <th></th>
                    <th>Понеділок</th>
                    <th>Вівторок</th>
                    <th>Середа</th>
                    <th>Четвер</th>
                    <th>П'ятниця</th>
                    <th>Субота/Неділя</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        <div>19:30</div>
                        <div>20:50</div>
                    </td>
                    <td>
                        <div>Бачата</div>
                        <div>Новий набір</div>
                    </td>
                    <td>
                        <div>Salsa LA</div>
                        <div>Improvers</div>
                    </td>
                    <td>
                        <div>Latina Lady</div>
                        <div>Solo</div>
                    </td>
                    <td>
                        <div>Salsa LA</div>
                        <div>Improvers</div>
                    </td>
                    <td>
                        <div>Latina Lady</div>
                        <div>Solo</div>
                    </td>
                    <td rowSpan="2">
                        <p>Майстер-класи і додаткові заняття.</p>
                        <p>За деталями звертатися до викладачів.</p>
                    </td>
                </tr>
                <tr>
                    <td>
                        <div>21:00</div>
                        <div>22:20</div>
                    </td>
                    <td>
                        <div>Salsa LA</div>
                        <div>Intermediate</div>
                    </td>
                    <td>
                        <div>Salsa LA</div>
                        <div>Beginners</div>
                    </td>
                    <td>

                    </td>
                    <td>
                        <div>Бачата</div>
                        <div>Новий набір</div>
                    </td>
                    <td>

                    </td>
                </tr>
            </tbody>
        </Table>
        <div>
            <ul>
                <li><span className="groupLevelName"> Новий набір </span> - групи з нуля, перші кроки в танці</li>
                <li><span className="groupLevelName"> Beginners </span> - група займається до шести місяців</li>
                <li><span className="groupLevelName"> Improvers </span> - група займається від шести місяців до одного року</li>
                <li><span className="groupLevelName"> Intermediates </span> - група займається від одного до півтори року</li>
                <li><span className="groupLevelName"> Advanced </span> - група займається від півтори року</li>
            </ul>
        </div>
    </div>);
}

export default Schedule;

