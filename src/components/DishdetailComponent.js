import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';

class Dishdetail extends Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedDish = null
        }
    }

    render() {
        return (
            <div className="container">
              <div className="row">
                <div className="col-12 col-md-5 m-1">
                  <Card>
                  </Card>
                </div>
                <div className="col-12 col-md-5 m-1">
                  
                </div>
              </div>
            </div>
        );
    }
}

export default Dishdetail;