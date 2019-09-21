import * as React from 'react';
import * as p from 'prop-types';

export default class DelayedLoadingIndicator extends React.Component<Props> {
  static propTypes = {
    children: p.node.isRequired,
    delay: p.number
  };

  static defaultProps = {
    delay: 1000
  };

  state = {
    delaying: true
  };

  loadingDelay = null; // eslint-disable-line

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
