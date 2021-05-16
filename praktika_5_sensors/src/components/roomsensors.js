import React, { Component } from "react";
import axios from 'axios';

export default class RoomSensors extends Component {
    state = {
        room_number: '',
        sensors: []
    };

    readData() {
        this.setState({ room_number: this.props.match.params.number })
        axios.get(`http://localhost:3000/api/room/'${this.props.match.params.number}'/sensors-with-last-data`)
            .then(res => {
                this.setState({ sensors: res.data.data });
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    componentDidMount() {
        this.readData()
    }

    componentDidUpdate(prevProps) {
        if (prevProps.match.params.number !== this.props.match.params.number) {
            this.readData()
        }
    }
    render() {
        const { room_number, sensors } = this.state;
        if (sensors.length === 0) {
            return (
                <div>
                    <h1>Room: {room_number}</h1>
                    <div>No data</div>
                </div>
            )
        } else {
            return (
                <div>
                    <h1>Room: {room_number}</h1>
                    <ul className="list-group">
                        {sensors.map(s => (
                            <li className="list-group-item" key={s.id}>
                                <span className="fw-bold">{s.sensorname}</span>
                                <p><span className="fw-bold">Date:</span> {s.date_time}; <span className="fw-bold">Value:</span> {s.data} {s.dimension}; <span className="fw-bold">Value Type:</span> {s.valuetype};</p>
                            </li>
                        ))}
                    </ul>
                </div>
            );
        }
    }
}
