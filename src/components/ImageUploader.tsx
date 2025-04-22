
import { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { Button } from './ui/button';

interface ImageUploaderProps {
  onImageSelect: (file: File, previewUrl: string) => void;
  onCancel: () => void;
  isVisible: boolean;
}

export function ImageUploader({ onImageSelect, onCancel, isVisible }: ImageUploaderProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isVisible) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file: File) => {
    // Check if file is an image
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size should be less than 5MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setPreviewUrl(result);
      onImageSelect(file, result);
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Upload Saree Image</h3>
          <Button variant="ghost" size="icon" onClick={onCancel}>
            <X size={18} />
          </Button>
        </div>
        
        {previewUrl ? (
          <div className="relative">
            <img 
              src={previewUrl} 
              alt="Preview" 
              className="w-full h-64 object-contain rounded-md border border-pink-200 dark:border-pink-800"
            />
            <Button 
              variant="outline" 
              size="sm" 
              className="absolute top-2 right-2 bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-800"
              onClick={() => setPreviewUrl(null)}
            >
              <X size={16} className="mr-1" /> Remove
            </Button>
          </div>
        ) : (
          <div 
            className={`border-2 border-dashed rounded-md p-8 text-center cursor-pointer transition-colors ${
              isDragging 
                ? 'border-pink-500 bg-pink-50 dark:bg-pink-900/20' 
                : 'border-gray-300 dark:border-gray-600 hover:border-pink-400 dark:hover:border-pink-700'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={triggerFileInput}
          >
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              accept="image/*" 
              className="hidden" 
            />
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-pink-100 dark:bg-pink-900/50 flex items-center justify-center mb-4">
                <ImageIcon size={32} className="text-pink-500 dark:text-pink-300" />
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                Drag and drop your saree image here, or click to browse
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Supports: JPG, PNG, WEBP (Max 5MB)
              </p>
            </div>
          </div>
        )}
        
        <div className="flex justify-end mt-4 space-x-2">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          {previewUrl && (
            <Button 
              className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
              onClick={() => onCancel()}
            >
              <Upload size={16} className="mr-2" />
              Use This Image
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}