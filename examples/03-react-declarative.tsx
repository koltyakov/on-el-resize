import * as React from 'react';

import { Resizable } from '../src/components'; // 'on-el-resize/lib/components';

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
