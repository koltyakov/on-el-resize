# on-el-resize - on HTML element resize event helper

`on-el-resize` is a simple helper which provides an API for attaching resize event firing to HTML elements.

This can simplify creation of some dynamic and responsive components which styles and structure depends on absolute width and height values.

## Install

```bash
npm install on-el-resize # or yarn add on-el-resize
```

## Usage

### TypeScript / JavaScript

```typescript
import { Resize } from 'on-el-resize';

const resize = new Resize();
const element = document.querySelector('.selector');

const resizeHandler = () => {
  console.log({
    width: element.offsetWidth,
    heigth: element.offsetHeight
  });
};

// Attach event
resize.addResizeListener(element, resizeHandler);

// Detach event
resize.removeResizeListener(element, resizeHandler);
```

### React component sample

```typescript
import * as React from 'react';
import { Resize } from 'on-el-resize';

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
```

### React declarative approach

> Component is a draft status

```typescript
import * as React from 'react';

import { Resizable } from 'on-el-resize/lib/components';

export default class Example extends React.Component<{}, {}> {

  public render() {
    return (
      <Resizable
        render={({ width }) => {
          return (
            <div>
              <div>Width: {width}</div>
            </div>
          );
        }}
      />
    );
  }

}
```