import * as React from 'react';

import { Resizable } from '../src/components'; // 'on-el-resize/lib/components';

export default class Example extends React.Component<{}, {}> {

  public render() {
    return (
      <Resizable
        className='container'
        render={({ width }) => {
          return (
            <div>Width: {width}</div>
          );
        }}
      />
    );
  }

}
