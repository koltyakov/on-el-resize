import * as React from 'react';

export interface IRenderProps {
  width: number;
  height: number;
}

export interface IProps {
  render?: (props: IRenderProps) => React.ReactNode;
}

export interface IState {
  width?: number;
  height?: number;
  initiated: boolean;
}
