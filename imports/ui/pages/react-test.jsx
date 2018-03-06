import React, { Component } from "react";
import io from 'socket.io-client';

class App extends React.Component {

  constructor(props) {
    console.log('init');
    super(props);
    this.state = {};

    let connectionUrl = 'http://localhost:3055/my-namespace';
    console.log(io);
    const socket = io.connect(connectionUrl);
  }
}

export default App;
