import React, { useRef, useCallback, useState, useEffect } from 'react';
import { usePhoto } from '../../../redux/photoSection/usePhoto'; // adjust path
import Button from '../../../components/shared/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../../components/ui/dialog';
import { Camera, User, Crop, RotateCw, ZoomIn, ZoomOut, X } from 'lucide-react';
import { useToast } from '../../../hooks/use-toast';
import { Slider } from '../../../components/ui/slider';
import { updateProfile } from '../../../services/profile';
import { useDispatch } from 'react-redux';
import { loadProfile } from '../../../redux/profile/profileActions';

const PhotoUpload = ({ updateProfilePhoto }) => {
  const {
    profilePhoto,
    profilePhotoUrl,
    isUploading,
    error,
    setPhotoFile,
    setPhotoUrl,
    setUploading,
    setError,
    clearError,
    resetPhoto,
  } = usePhoto();

  const toast = useToast().toast;
  const storeDispatch = useDispatch();

  // Local state for crop dialog and cropped image
  const [showCropDialog, setShowCropDialog] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState(null);
  const [croppedImageUrl, setCroppedImageUrl] = useState(null);
  const [cropSettings, setCropSettings] = useState({ x: 0, y: 0, scale: 1, rotation: 0 });

  const fileInputRef = useRef(null);
  const canvasRef = useRef(null);
  const imageRef = useRef(null);

  // Get the current profile photo URL (either from existing profile or newly selected)
  const currentPhotoUrl =   profilePhoto

  const validateFile = (file) => {
    const maxSize = 5 * 1024 * 1024; // 5MB
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];

    if (!allowedTypes.includes(file.type)) {
      toast({ title: 'Invalid file type', description: 'Please upload a JPG, PNG, or WebP image.', variant: 'destructive' });
      return false;
    }

    if (file.size > maxSize) {
      toast({ title: 'File too large', description: 'Please upload an image smaller than 5MB.', variant: 'destructive' });
      return false;
    }

    return true;
  };

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!validateFile(file)) {
      e.target.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onload = (ev) => {
      setSelectedImageUrl(ev.target.result);
      setShowCropDialog(true);
      resetCropSettings();
    };
    reader.readAsDataURL(file);
  };

  const resetCropSettings = () => {
    setCropSettings({ x: 0, y: 0, scale: 1, rotation: 0 });
  };

  const cropImage = useCallback(() => {
    if (!selectedImageUrl || !canvasRef.current || !imageRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const image = imageRef.current;
    const size = 300;
    canvas.width = size;
    canvas.height = size;

    ctx.clearRect(0, 0, size, size);
    ctx.save();
    
    // Apply transformations
    ctx.translate(size / 2, size / 2);
    ctx.rotate((cropSettings.rotation * Math.PI) / 180);
    ctx.scale(cropSettings.scale, cropSettings.scale);
    ctx.translate(-size / 2, -size / 2);

    // Calculate source dimensions for cropping
    const sourceSize = Math.min(image.naturalWidth, image.naturalHeight);
    const sourceX = (image.naturalWidth - sourceSize) / 2 + cropSettings.x;
    const sourceY = (image.naturalHeight - sourceSize) / 2 + cropSettings.y;

    ctx.drawImage(image, sourceX, sourceY, sourceSize, sourceSize, 0, 0, size, size);
    ctx.restore();

    // Convert canvas to blob and create URL
    canvas.toBlob((blob) => {
      if (blob) {
        // Clean up previous cropped URL
        if (croppedImageUrl) {
          URL.revokeObjectURL(croppedImageUrl);
        }
        setCroppedImageUrl(URL.createObjectURL(blob));
      }
    }, 'image/jpeg', 0.9);
  }, [selectedImageUrl, cropSettings, croppedImageUrl]);

  // Auto-crop when image loads or settings change
  useEffect(() => {
    if (selectedImageUrl && imageRef.current?.complete) {
      cropImage();
    }
  }, [cropImage, selectedImageUrl]);

  const handleSaveCroppedImage = async () => {
    if (!croppedImageUrl) return;
    
    setUploading(true);

    try {
      const response = await fetch(croppedImageUrl);
      const blob = await response.blob();
      const file = new File([blob], 'profile-photo.jpg', { type: 'image/jpeg' });

      // Update profile with new photo
      await updateProfile({ profilePhoto: file });
      // Refresh profile data
      await storeDispatch(loadProfile());

      // Update local state
     
      

      toast({ 
        title: 'Profile photo updated', 
        description: 'Your profile photo has been updated successfully.' 
      });

      // Close dialog and clean up
      setShowCropDialog(false);
      cleanupUrls();

    } catch (err) {
      setError(err);
      toast({ 
        title: 'Upload failed', 
        description: 'Failed to update profile photo.', 
        variant: 'destructive' 
      });
    } finally {
      setUploading(false);
    }
  };

  const cleanupUrls = () => {
    if (selectedImageUrl) {
      URL.revokeObjectURL(selectedImageUrl);
      setSelectedImageUrl(null);
    }
    if (croppedImageUrl) {
      URL.revokeObjectURL(croppedImageUrl);
      setCroppedImageUrl(null);
    }
  };

  const handleRemovePhoto = async () => {
    try {
      setUploading(true);
      
      // Update profile to remove photo
      await updateProfile({ profilePhoto: null });
      await storeDispatch(loadProfile());

      // Clean up local state
      if (profilePhotoUrl) {
        URL.revokeObjectURL(profilePhotoUrl);
      }
      resetPhoto();

      toast({ 
        title: 'Profile photo removed', 
        description: 'Your profile photo has been removed.' 
      });
    } catch (err) {
      toast({ 
        title: 'Error', 
        description: 'Failed to remove profile photo.', 
        variant: 'destructive' 
      });
    } finally {
      setUploading(false);
    }
  };

  const handleCancelCrop = () => {
    setShowCropDialog(false);
    cleanupUrls();
    resetCropSettings();
  };

  // Cleanup URLs on unmount
  useEffect(() => {
    return () => {
      cleanupUrls();
    };
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Profile Photo</h2>
        <p className="text-gray-600">Upload a professional photo to make your profile stand out.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Current Photo</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-4">
          <div className="w-32 h-32 rounded-full border-4 border-gray-200 overflow-hidden bg-gray-100 flex items-center justify-center">
            {currentPhotoUrl ? (
              <img src={currentPhotoUrl} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <User className="w-12 h-12 text-gray-400" />
            )}
          </div>

          <div className="flex gap-2">
            <Button 
              variant='emeraldGradient' 
              onClick={() => fileInputRef.current?.click()} 
              disabled={isUploading}
            >
              <Camera className="w-4 h-4 mr-2" />
              {currentPhotoUrl ? 'Change Photo' : 'Upload Photo'}
            </Button>

            {currentPhotoUrl && (
              <Button 
                variant="outline" 
                onClick={handleRemovePhoto} 
                disabled={isUploading}
              >
                <X className="w-4 h-4 mr-2" />
                Remove
              </Button>
            )}
          </div>

          <input 
            ref={fileInputRef} 
            type="file" 
            accept="image/*" 
            onChange={handleFileSelect} 
            className="hidden" 
            disabled={isUploading} 
          />

          <p className="text-sm text-gray-500 text-center">
            Recommended: Square image, at least 300x300 pixels<br />
            Supported formats: JPG, PNG, WebP (max 5MB)
          </p>
        </CardContent>
      </Card>

      {/* Crop Dialog */}
      <Dialog open={showCropDialog} onOpenChange={handleCancelCrop}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Crop Your Photo</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-1">
                <div className="relative bg-gray-100 rounded-lg overflow-hidden" style={{ aspectRatio: '1' }}>
                  {selectedImageUrl && (
                    <img 
                      ref={imageRef} 
                      src={selectedImageUrl} 
                      alt="Selected" 
                      className="w-full h-full object-contain" 
                      onLoad={cropImage}
                    />
                  )}
                </div>
              </div>

              <div className="w-48">
                <p className="text-sm font-medium mb-2">Preview</p>
                <div className="w-32 h-32 rounded-full border-2 border-gray-200 overflow-hidden bg-gray-100 mx-auto">
                  {croppedImageUrl ? (
                    <img src={croppedImageUrl} alt="Cropped preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <User className="w-8 h-8 text-gray-400" />
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Scale</label>
                <div className="flex items-center gap-2">
                  <ZoomOut className="w-4 h-4" />
                  <Slider 
                    value={[cropSettings.scale]} 
                    onValueChange={([v]) => setCropSettings(prev => ({ ...prev, scale: v }))}
                    min={0.5} 
                    max={3} 
                    step={0.1} 
                    className="flex-1" 
                  />
                  <ZoomIn className="w-4 h-4" />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Rotation</label>
                <div className="flex items-center gap-2">
                  <RotateCw className="w-4 h-4" />
                  <Slider 
                    value={[cropSettings.rotation]} 
                    onValueChange={([v]) => setCropSettings(prev => ({ ...prev, rotation: v }))}
                    min={-180} 
                    max={180} 
                    step={15} 
                    className="flex-1" 
                  />
                  <span className="text-xs w-8">{cropSettings.rotation}°</span>
                </div>
              </div>
            </div>

            <div className="flex gap-2 mt-4">
              <Button variant="outline" onClick={resetCropSettings}>
                Reset
              </Button>
              <Button variant="outline" onClick={cropImage}>
                <Crop className="w-4 h-4 mr-2" />
                Apply Crop
              </Button>
            </div>

            <div className="flex justify-end gap-2 pt-4 border-t">
              <Button variant="outline" onClick={handleCancelCrop}>
                Cancel
              </Button>
              <Button onClick={handleSaveCroppedImage} disabled={isUploading}>
                {isUploading ? 'Saving...' : 'Save Photo'}
              </Button>
            </div>
          </div>

          <canvas ref={canvasRef} className="hidden" />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PhotoUpload;