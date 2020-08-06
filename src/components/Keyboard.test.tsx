import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Default as Keyboard } from './Keyboard.stories';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Keyboard startKey={21} endKey={108}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});
