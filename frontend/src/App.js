import React, { Component } from "react";
import Routes from "./routes";
import {Provider} from "react-redux";
import {store, persistor} from "./redux/store";
import {BrowserRouter} from "react-router-dom";
import {PersistGate} from 'redux-persist/integration/react'
import Container from "react-bootstrap/Container";

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <BrowserRouter>
                        <Container
                            className="justify-content-center"
                            id={"rootcontainer"}
                        >
                            <Routes class="routes" />
                        </Container>
                    </BrowserRouter>
                </PersistGate>
            </Provider>
        );
    }
}

export default App;
