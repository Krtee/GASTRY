import React, {Component} from 'react';
import io from "socket.io-client"
import * as actions from "../../../redux/actions";
import {connect} from "react-redux";
import axiosInstance from "../../../redux/axiosInstance";
let socket
class Chat extends Component {
    constructor(props) {
        super(props);
        console.log(this.props.token)

    }

    componentDidMount() {
        this.setupSocket();
        console.log("hi")
        axiosInstance.get('/chat')
            .then(res => {
                console.log(res)
            })
    }

    setupSocket = () => {
        const token = this.props.token
        if (token && !socket) {
            const newSocket = io("http://localhost:4000", {
                query: {
                    token: token
                },
            });

            newSocket.on("disconnect", () => {
                socket = null;
                console.log("Disconnected backend!")
            });

            newSocket.on("connect", () => {
                console.log("Connected frontend")
            });

            newSocket.on('test', data => {
                console.log(data)
            });

            socket = newSocket;
        }
    };



    render() {
        return (
            <div>
                <p> This is the chat!</p>
            </div>
        );
    }
}

const mapsStateToProps =(state) => {
    return{
        token: state.auth.token
    }
};

const mapDispatchToProps = (dispatch) => {
    return{
    }
};


export default connect(mapsStateToProps,mapDispatchToProps)(Chat);
