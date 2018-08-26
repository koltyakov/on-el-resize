import { Resize } from '../src'; // 'on-el-resize';

const resize = new Resize();
const element = document.querySelector('.selector') as HTMLElement;

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
