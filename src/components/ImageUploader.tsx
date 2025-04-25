
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { Upload, X } from 'lucide-react';

interface ImageUploaderProps {
  onImageUploaded: (imageUrl: string) => void;
}

export function ImageUploader({ onImageUploaded }: ImageUploaderProps) {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(file);
      
      // Create a preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedImage) return;
    
    setUploading(true);
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 95) {
          clearInterval(interval);
          return prev;
        }
        return prev + 5;
      });
    }, 100);

    try {
      // In a real implementation, you would upload to Supabase or another storage service
      // For now, we'll just simulate the upload and use the local preview URL
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Clear the interval and set progress to 100%
      clearInterval(interval);
      setUploadProgress(100);
      
      // Pass the image URL to the parent component
      // In a real implementation, this would be the URL from your storage service
      onImageUploaded(previewUrl as string);
      
      // Reset after a short delay
      setTimeout(() => {
        setUploading(false);
        setUploadProgress(0);
      }, 500);
    } catch (error) {
      console.error('Error uploading image:', error);
      clearInterval(interval);
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const handleClear = () => {
    setSelectedImage(null);
    setPreviewUrl(null);
  };

  return (
    <Card className="p-4 w-full max-w-md mx-auto bg-white shadow-md rounded-lg">
      <div className="flex flex-col items-center gap-4">
        {previewUrl ? (
          <div className="relative w-full">
            <img 
              src={previewUrl} 
              alt="Preview" 
              className="w-full h-48 object-cover rounded-md"
            />
            <button 
              onClick={handleClear}
              className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md"
            >
              <X size={16} className="text-red-500" />
            </button>
          </div>
        ) : (
          <div 
            className="border-2 border-dashed border-gray-300 rounded-md p-6 w-full flex flex-col items-center justify-center cursor-pointer hover:border-purple-400 transition-colors"
            onClick={() => document.getElementById('image-input')?.click()}
          >
            <Upload size={32} className="text-gray-400 mb-2" />
            <p className="text-sm text-gray-500">Click to upload a saree image</p>
            <p className="text-xs text-gray-400 mt-1">JPG, PNG or GIF</p>
          </div>
        )}
        
        <input
          type="file"
          id="image-input"
          accept="image/*"
          className="hidden"
          onChange={handleImageChange}
        />
        
        {uploading && (
          <div className="w-full">
            <Progress value={uploadProgress} className="h-2" />
            <p className="text-xs text-gray-500 mt-1 text-center">
              Uploading... {uploadProgress}%
            </p>
          </div>
        )}
        
        {selectedImage && !uploading && (
          <Button 
            onClick={handleUpload}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white"
          >
            Find Similar Sarees
          </Button>
        )}
      </div>
    </Card>
  );
}