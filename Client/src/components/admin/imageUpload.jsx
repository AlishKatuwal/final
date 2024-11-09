import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useEffect, useRef, useState } from "react";
import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import Button from "../ui/button";
import axios from "axios";

function ImageUpload({ imageFile, setImageFile, setLoading ,uploadedImageUrl, setUploadedImageUrl, imageLoading }) {
  const inputRef = useRef(null);
  const [imageloading, setImageLoading] = useState(false);

  function handleImageFileChange(event) {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setImageFile(selectedFile);
    }
  }

  function handleDragOver(event) {
    event.preventDefault();
  }

  function handleDrop(event) {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files?.[0];
    if (droppedFile) {
      setImageFile(droppedFile);
    }
  }

  function handleRemoveImage() {
    setImageFile(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

 

  async function uploadImageToCloudinary() {
    try {
      const data = new FormData();
      data.append("file", imageFile);
      data.append("upload_preset", "your-actual-upload-preset-name"); // Replace with actual preset name
  
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
  
      const response = await axios.post('https://api.cloudinary.com/v1_1/ddihuqtgh/image/upload', data, config);
      console.log("Response:", response);
  
      if (response.data && response.data.result && response.data.result.url) {
        setUploadedImageUrl(response.data.result.url);
      } else {
        console.error("Error: response data is not in the expected format");
      }
    } catch (error) {
      console.error(error);
    }
  }
  function handleClickUpload() {
    if (inputRef.current) {
      inputRef.current.click();
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <Label className="text-lg font-semibold mb-2 block">Upload Image</Label>
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className="border-2 border-dashed rounded-lg p-5 mt-4 cursor-pointer"
        onClick={handleClickUpload}
      >
        <Input
          id="imageUpload"
          className="hidden"
          type="file"
          ref={inputRef}
          onChange={handleImageFileChange}
        />

        {!imageFile ? (
          <div className="flex flex-col items-center justify-center h-32">
            <UploadCloudIcon className="w-12 h-12 text-muted-foreground mb-2" />
            <span>Drag & Drop or Click to Upload Image</span>
          </div>
        ) : (
          imageLoading ?
          <Skeleton className='h-12 bg-grey-100'/> :
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FileIcon className="w-10 h-10 text-primary mr-2" />
            </div>
            <p className="text-sm font-medium">{imageFile.name}</p>
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground"
              onClick={handleRemoveImage}
            >
              <XIcon className="w-4 h-4" />
              <span className="sr-only">Remove File</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ImageUpload;