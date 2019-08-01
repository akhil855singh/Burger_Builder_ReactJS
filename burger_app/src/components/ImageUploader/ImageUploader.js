import React from "react"
import * as loadImage from 'blueimp-load-image';

class ImageUploader extends React.Component {
    constructor(props) {
      super(props);
      this.state = {file: '',imagePreviewUrl: ''}
    }
  
    _handleSubmit(e) {
      e.preventDefault();
      // TODO: do something with -> this.state.file
      console.log('handle uploading-', this.state.file);
    }
  
    _handleImageChange(e) {
      e.preventDefault();
      let file = e.target.files[0];
      console.log("file is",file) 
        loadImage( file, (img) => 
        {
        console.log("image after load is",img) 
        var base64data = img.toDataURL('image/jpeg'); this.setState({ imagePreviewUrl: base64data });},
        { orientation: true, } ); 
    }
  
    render() {
      let {imagePreviewUrl} = this.state;
      let $imagePreview = null;
      console.log("image after selecting",imagePreviewUrl)
      if (imagePreviewUrl) {
        $imagePreview = (<img style={{width:'100%', height:'100%', objectFit:'cover'}} src={imagePreviewUrl}/>);
      } else {
        $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
      }
  
      return (
        <div className="previewComponent">
          <form onSubmit={(e)=>this._handleSubmit(e)}>
            <input className="fileInput" 
              type="file" 
              onChange={(e)=>this._handleImageChange(e)} />
            <button className="submitButton" 
              type="submit" 
              onClick={(e)=>this._handleSubmit(e)}>Upload Image</button>
          </form>
          <div className="imgPreview">
            {$imagePreview}
          </div>
        </div>
      )
    }
  }

  export default ImageUploader
    