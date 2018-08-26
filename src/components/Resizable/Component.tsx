import * as React from 'react';

import { Resize } from '../../Resize';

import { IProps, IState } from './interfaces';

export default class Resizable extends React.Component<IProps & React.HTMLAttributes<HTMLDivElement>, IState> {

  private ref: HTMLElement;
  private resize: Resize;

  constructor(props: IProps) {
    super(props);
    this.resize = new Resize();
    this.state = {
      initiated: false
    };
    this.onComponentResize = this.onComponentResize.bind(this);
  }

  public render() {
    return (
      <div
        className={this.props.className}
        style={this.props.style}
        ref={el => this.ref = el}
      >
        {this.state.initiated &&
          this.props.render ? this.props.render({
            width: this.state.width,
            height: this.state.height
          }) : null // add children support
        }
      </div>
    );
  }

  public componentDidMount() {
    this.resize.addResizeListener(this.ref, this.onComponentResize);
    this.onComponentResize();
    this.setState({ initiated: true });
  }

  public componentWillUnmount() {
    this.resize.removeResizeListener(this.ref, this.onComponentResize);
  }

  private onComponentResize() {
    this.setState({
      width: this.ref.offsetWidth,
      height: this.ref.offsetHeight
    });
  }

}
