//Will be removed after propper acknowlidgement about using redux
import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Button } from 'react-bootstrap';

export class TestingRedux extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0
        }
    }

    render() {
        return (<div>
            {this.state.count}
            <div className="row">
                <div className="col">
                    <Button>
                        +1
                    </Button>
                </div>
                <div className="col">
                    <Button>
                        -1
                    </Button>
                </div>
                <div className="col">
                    <Button>
                        +10
                    </Button>
                </div>
                <div className="col">
                    <Button>
                        -10
                    </Button>
                </div>
            </div>
        </div>);
    }
}



export default connect()(TestingRedux);