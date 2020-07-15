import React, {Component} from 'react';
import OwnChatMessage from "../../../components/chat/OwnChatMessage";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Navbar from "react-bootstrap/Navbar";
import "./chat.scss"
import Topbar from "../../../components/navigation/TopBar";
import OtherChatMessage from "../../../components/chat/OtherChatmessage";
import axiosInstance from "../../../redux/axiosInstance";
import io from "socket.io-client";
import {connect} from "react-redux";
import * as actions from '../../../redux/actions';
import CustomerLayout from "../CustomerLayout";
import sendbutton from "../../../assets/icons/send.svg"

let socket;
let messagesEnd;

class Chat extends Component {

    state = {
        chatId: 0,
        order: {},
        messages: [],
        pendingMessage: "",
        typeError: "",
        userId: ""
    };


    constructor(props) {
        super(props);
        console.log(this.props.token)


    }

    componentDidMount() {
        this.setupSocket();
        const token = this.props.token;
        const order = this.props.location.state.order
        const userId = this.props.user._id;
        const chatId = order.chat_id;
        console.log(chatId);
        this.props.fetchChat({
            token: token,
            chatId: chatId
        });
        console.log(order);

        this.setState({
            ...this.state,
            order: order,
            userId: userId
        });

        this.fetchChat();

        this.scrollToBottom();


    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.scrollToBottom()
    }


    newMessage = (message) => {
        const userId = this.state.userId;
        socket.emit("newMessage", {
            message: message,
            userId: userId
        })

    };

    fetchChat = () => {
        const order = this.props.location.state.order;
        const chatId = order.chat_id;
        socket.emit("fetchChat", {
            chatId: chatId
        });
    };

    setupSocket = () => {
        const order = this.props.location.state.order;
        const chatId = order.chat_id;
        const token = this.props.token;
        if (token && !socket) {
            const newSocket = io("http://localhost:4000", {
                query: {
                    token: token,
                    chatId: chatId
                },
            });

            newSocket.on("disconnect", () => {
                socket = null;
                console.log("Disconnected backend!")
            });

            newSocket.on("connect", () => {
                console.log("Connected frontend")
            });
            newSocket.on('fetchChat', data => {
                console.log(data);
                console.log("ON FETCH SOCKET")
                console.log(data.chat)
                const chat = data.chat;
                console.log("fetch frontend faster")
                const messages = chat.messages.reverse();
                this.setState({
                    ...this.state,
                    messages: messages,
                    chatId: chat._id
                })
                console.log("fetch frontend faster")
            });

            newSocket.on("newMessage", data => {
                console.log("IM A NEW MESSAGE");
                const newMessage = data.newMessage;
                const messages = [...this.state.messages];
                console.log("HOI ON NEW FRONT")
                console.log(newMessage.message);
                console.log(newMessage.dateNow);
                messages.push(newMessage);
                this.setState({
                    ...this.state,
                    messages: messages,
                    pendingMessage: ""
                })
            });

            socket = newSocket;
        }
    };

    onChangeMessageHandler = (event) => {
        event.preventDefault()
        const message = event.target.value;
        console.log(message)
        this.validationHandler(message)


    };

    validateForm = (err) => {
        let valid = true;
        console.log(err)
        if (err.length > 0) {
            return valid = false
        } else {
            return valid = true
        }
    };

    validationHandler = (message) => {
        if (message.length === 0) {
            this.setState({
                ...this.setState({
                    ...this.state,
                    pendingMessage: message,
                    typeError: "Message must not be empty"
                })
            })
        } else {
            this.setState({
                ...this.setState({
                    ...this.state,
                    pendingMessage: message,
                    typeError: ""
                })
            })
        }


    };

    submitMessage = (event) => {
        event.preventDefault()
        if (this.validateForm(this.state.typeError)) {
            console.log(this.state.pendingMessage);
            const token = this.props.token;
            const message = this.state.pendingMessage;
            const chatId = this.state.order.chat_id
            this.props.postMessage({
                token: token,
                chatId: chatId,
                data: {
                    message: message
                }

            });
            this.newMessage(message)
        } else {
            console.log(this.state.typeError)

        }


    }

    renderMessages = () => {
        const messages = [...this.state.messages];
        const userId = this.state.userId;
        const messageUIElements = messages.map(message => {
            const date = new Date(message.date)
            date.toUTCString()
            if (message.user === userId) {
                return <OwnChatMessage text={message.message} date={date.toString()}/>
            } else return <OtherChatMessage text={message.message} date={date.toString()}/>


        })
        return messageUIElements
    };

    scrollToBottom = () => {
        messagesEnd.scrollIntoView({behavior: "smooth"});
    };


    render() {
        return (
            <CustomerLayout
                location={"orders"}
                showBack={true}
            >
                <Container className="Containerli">
                    {this.renderMessages()}
                    <div ref={(el) => {
                        messagesEnd = el
                    }}/>
                </Container>
                <footer className={"messageInput fixed-bottom"}>
                    <Container>
                        <Form >
                            <Row>
                                <Col xs={10}>
                                    <Form.Control value={this.state.pendingMessage}
                                                  onChange={(e) => this.onChangeMessageHandler(e)} type="text"
                                                  placeholder="Schreibe eine Nachricht..."/>
                                </Col>
                                <Col xs={2} className={"d-flex align-items-center "}>
                                    <button onClick={(e) => this.submitMessage(e)}>
                                        <div className="d-flex justify-content-end">
                                            <img
                                                src={sendbutton} width={"20"} height={"20"} alt={"senden"}
                                            />
                                        </div>
                                    </button>
                                </Col>
                            </Row>
                        </Form>
                    </Container>
                </footer>


            </CustomerLayout>
        );
    }
}


const mapsStateToProps = (state) => {
    return {
        token: state.auth.token,
        user: state.user.user
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        postMessage: (payload) => dispatch(actions.postMessage(payload)),
        fetchChat: (payload) => dispatch(actions.fetchChat(payload))
    }
};


export default connect(mapsStateToProps, mapDispatchToProps)(Chat);
