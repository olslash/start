import * as React from 'react';

interface Props {
  delay?: number;
}

interface State {
  delaying: boolean;
}

export default class DelayedLoadingIndicator extends React.Component<
  Props,
  State
> {
  static defaultProps = {
    delay: 1000
  };

  state = {
    delaying: true
  };

  loadingDelay = 0;

  componentDidMount() {
    this.loadingDelay = setTimeout(
      () => this.setState({ delaying: false }),
      this.props.delay
    );
  }

  componentWillUnmount() {
    clearTimeout(this.loadingDelay);
  }

  loadingDelayPassed = () => {
    return this.state.delaying === false;
  };

  render() {
    return this.loadingDelayPassed() && this.props.children;
  }
}
