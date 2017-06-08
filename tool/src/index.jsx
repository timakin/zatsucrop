/* global document */
import React from 'react';
import ReactDOM from 'react-dom';
import CropTool from './CropTool';

const Root = () => (<CropTool />);

ReactDOM.render(<Root />, document.getElementById('main'));
