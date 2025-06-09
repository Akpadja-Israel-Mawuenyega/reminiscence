// eslint-disable-next-line no-unused-vars
import React from "react";
import PropTypes from "prop-types";
import "./ImageUploader.css";

const ImageUploader = ({ setPostData, base64Image, setBase64Image }) => {
  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result;
        setBase64Image(base64);
        console.log(base64Image);
        setPostData((postData) => ({
          ...postData,
          selectedFile: base64,
        }));
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="image-uploader mt-4">
      <h3 className="ml-3">Upload an image:</h3>
      <input
        className="truncate ml-3"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
      />
      {base64Image && (
        <div>
          <h4>Preview</h4>
          <img
            className="rounded"
            src={base64Image}
            alt=""
            style={{ maxWidth: "300px" }}
          />
        </div>
      )}
    </div>
  );
};

ImageUploader.propTypes = {
  setPostData: PropTypes.func,
  base64Image: PropTypes.string,
  setBase64Image: PropTypes.func,
};

export default ImageUploader;
