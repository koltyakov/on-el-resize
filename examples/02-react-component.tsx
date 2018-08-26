import * as React from 'react';
import { Resize } from '../src'; // 'on-el-resize';

export interface IProps {}

export interface IState {
  componentWidth?: number;
  componentHeight?: number;
}

export class Example extends React.Component<IProps, IState> {

  private parentRef: HTMLElement;
  private resize: Resize;

  constructor(props: IProps) {
    super(props);
    this.resize = new Resize();
    this.state = {};
    this.onComponentResize = this.onComponentResize.bind(this);
  }

  public render() {
    return (
      <div ref={el => this.parentRef = el}>
        <div>Width: {this.state.componentWidth}</div>
        <div>Height: {this.state.componentHeight}</div>
      </div>
    );
  }

  public componentDidMount() {
    this.resize.addResizeListener(this.parentRef, this.onComponentResize);
    this.onComponentResize();
  }

  public componentWillUnmount() {
    this.resize.removeResizeListener(this.parentRef, this.onComponentResize);
  }

  private onComponentResize() {
    this.setState({
      componentWidth: this.parentRef.offsetWidth,
      componentHeight: this.parentRef.offsetHeight
    });
  }

}
