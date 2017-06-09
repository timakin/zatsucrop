import React, { Component } from 'react';
import 'cropperjs/dist/cropper.css';

import Cropper from '../../src/react-cropper';

/* global FileReader */

const src = 'img/timakin.jpg';

export default class CropTool extends Component {

  constructor(props) {
    super(props);
    this.state = {
      src,
      cropResult: null,
      startX: 0,
      startY: 0,
      width: 0,
      height: 0
    };
    this.cropImage = this.cropImage.bind(this);
    this.onChange = this.onChange.bind(this);
    this.useDefaultImage = this.useDefaultImage.bind(this);
    this._cropmove = this._cropmove.bind(this);
  }

  onChange(e) {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      this.setState({ src: reader.result });
    };
    reader.readAsDataURL(files[0]);
  }

  cropImage() {
    this.setState({ 
      startX: this.cropper.getData().x,
      startY: this.cropper.getData().y,
      width: this.cropper.getData().width,
      height: this.cropper.getData().height
    });
    if (typeof this.cropper.getCroppedCanvas() === 'undefined') {
      return;
    }
  }

  _cropmove() {
    this.setState({ 
      startX: this.cropper.getData().x,
      startY: this.cropper.getData().y,
      width: this.cropper.getData().width,
      height: this.cropper.getData().height
    });
  }

  useDefaultImage() {
    this.setState({ src });
  }

  render() {
    return (
      <div>
        <div style={{ width: '50%', float: 'left'  }}>
          <Cropper
            style={{ height: 400, width: '100%' }}
            aspectRatio={16 / 9}
            preview=".img-preview"
            guides={false}
            src={this.state.src}
            cropmove = { this._cropmove }
            ref={cropper => { this.cropper = cropper; }}
          />
        </div>
        <div>
            <div className="img-preview" style={{ width: '100%', float: 'left', height: 300 }} />
            <br />
            <br />
          
          <div className="box" style={{ width: '50%', float: 'right' }}>
            <input type="file" onChange={this.onChange} />
          <button onClick={this.useDefaultImage}>Reset</button>
          
            <p>startX: { this.state.startX }</p>
            <p>startY: { this.state.startY }</p>
            <p>width: { this.state.width }</p>
            <p>height: { this.state.height }</p>

          </div>
        </div>
        <br style={{ clear: 'both' }} />
      </div>
    );
  }
}
