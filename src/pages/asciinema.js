/* global asciinema */

import React from "react";

// Self-hosted asciinema React component from:
//
//     https://github.com/asciinema/asciinema-player/issues/72#issuecomment-380950743

export default class Asciinema extends React.Component {
  constructor(...args) {
    super(...args);
    this.bindRef = (ref) => {
      this.ref = ref;
    };
  }

  componentDidMount() {
    asciinema.player.js.CreatePlayer(this.ref, this.props.src, this.props);
  }

  componentWillUnmount() {
    if (!this.ref) {
      return;
    }

    asciinema.player.js.UnmountPlayer(this.ref);
    this.ref = null;
  }

  render() {
    return <div ref={this.bindRef} />;
  }
}

Asciinema.defaultProps = {
  theme: "asciinema",
  idleTimeLimit: 2,
};
