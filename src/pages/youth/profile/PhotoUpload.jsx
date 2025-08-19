import React, { useRef, useCallback } from 'react';
import { usePhoto } from '../../../redux/photoSection/usePhoto'; // adjust path
import Button from '../../../components/shared/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../../components/ui/dialog';
import { Camera, User, Crop, RotateCw, ZoomIn, ZoomOut, X } from 'lucide-react';
import { useToast } from '../../../hooks/use-toast';
import { Slider } from '../../../components/ui/slider';

const PhotoUpload = ({ updateProfilePhoto }) => {
  const {
    profilePhotoFile,
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

  const fileInputRef = useRef(null);
  const canvasRef = useRef(null);
  const imageRef = useRef(null);

  const cropSettingsRef = useRef({ x: 0, y: 0, scale: 1, rotation: 0 });

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
      setPhotoFile(file);
      setPhotoUrl(ev.target.result);
    };
    reader.readAsDataURL(file);
  };

  const cropImage = useCallback(() => {
    if (!profilePhotoUrl || !canvasRef.current || !imageRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const image = imageRef.current;
    const size = 300;
    canvas.width = size;
    canvas.height = size;

    ctx.clearRect(0, 0, size, size);
    ctx.save();
    ctx.translate(size / 2, size / 2);
    ctx.rotate((cropSettingsRef.current.rotation * Math.PI) / 180);
    ctx.scale(cropSettingsRef.current.scale, cropSettingsRef.current.scale);
    ctx.translate(-size / 2, -size / 2);

    const sourceSize = Math.min(image.naturalWidth, image.naturalHeight);
    const sourceX = (image.naturalWidth - sourceSize) / 2 + cropSettingsRef.current.x;
    const sourceY = (image.naturalHeight - sourceSize) / 2 + cropSettingsRef.current.y;

    ctx.drawImage(image, sourceX, sourceY, sourceSize, sourceSize, 0, 0, size, size);
    ctx.restore();

    canvas.toBlob((blob) => {
      if (blob) setPhotoUrl(URL.createObjectURL(blob));
    }, 'image/jpeg', 0.9);
  }, [profilePhotoUrl, setPhotoUrl]);

  const handleSaveCroppedImage = async () => {
    if (!profilePhotoUrl) return;
    setUploading(true);

    try {
      const response = await fetch(profilePhotoUrl);
      const blob = await response.blob();
      const file = new File([blob], 'profile-photo.jpg', { type: 'image/jpeg' });

      updateProfilePhoto(file, profilePhotoUrl);
      toast({ title: 'Profile photo updated', description: 'Your profile photo has been updated successfully.' });

      resetPhoto();
    } catch (err) {
      setError(err);
      toast({ title: 'Upload failed', description: 'Failed to update profile photo.', variant: 'destructive' });
    } finally {
      setUploading(false);
    }
  };

  const handleRemovePhoto = () => {
    if (profilePhotoUrl) URL.revokeObjectURL(profilePhotoUrl);
    resetPhoto();
    toast({ title: 'Profile photo removed', description: 'Your profile photo has been removed.' });
  };

  const resetCrop = () => {
    cropSettingsRef.current = { x: 0, y: 0, scale: 1, rotation: 0 };
  };

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
            {profilePhotoUrl ? (
              <img src={profilePhotoUrl} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <User className="w-12 h-12 text-gray-400" />
            )}
          </div>

          <div className="flex gap-2">
            <Button variant='emeraldGradient' onClick={() => fileInputRef.current?.click()} disabled={isUploading}>
              <Camera className="w-4 h-4 mr-2" />
              {profilePhotoUrl ? 'Change Photo' : 'Upload Photo'}
            </Button>

            {profilePhotoUrl && (
              <Button variant="outline" onClick={handleRemovePhoto} disabled={isUploading}>
                <X className="w-4 h-4 mr-2" />
                Remove
              </Button>
            )}
          </div>

          <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileSelect} className="hidden" disabled={isUploading} />

          <p className="text-sm text-gray-500 text-center">
            Recommended: Square image, at least 300x300 pixels<br />
            Supported formats: JPG, PNG, WebP (max 5MB)
          </p>
        </CardContent>
      </Card>

      {/* Crop Dialog */}
      {profilePhotoUrl && (
        <Dialog open={!!profilePhotoUrl} onOpenChange={() => resetPhoto()}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Crop Your Photo</DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-1">
                  <div className="relative bg-gray-100 rounded-lg overflow-hidden" style={{ aspectRatio: '1' }}>
                    <img ref={imageRef} src={profilePhotoUrl} alt="Selected" className="w-full h-full object-contain" onLoad={cropImage} />
                  </div>
                </div>

                <div className="w-48">
                  <p className="text-sm font-medium mb-2">Preview</p>
                  <div className="w-32 h-32 rounded-full border-2 border-gray-200 overflow-hidden bg-gray-100 mx-auto">
                    <img src={profilePhotoUrl} alt="Cropped preview" className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Scale</label>
                  <div className="flex items-center gap-2">
                    <ZoomOut className="w-4 h-4" />
                    <Slider value={[cropSettingsRef.current.scale]} onValueChange={([v]) => (cropSettingsRef.current.scale = v)} min={0.5} max={3} step={0.1} className="flex-1" />
                    <ZoomIn className="w-4 h-4" />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Rotation</label>
                  <div className="flex items-center gap-2">
                    <RotateCw className="w-4 h-4" />
                    <Slider value={[cropSettingsRef.current.rotation]} onValueChange={([v]) => (cropSettingsRef.current.rotation = v)} min={-180} max={180} step={15} className="flex-1" />
                    <span className="text-xs w-8">{cropSettingsRef.current.rotation}°</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 mt-4">
                <Button variant="outline" onClick={resetCrop}>Reset</Button>
                <Button variant="outline" onClick={cropImage}><Crop className="w-4 h-4 mr-2" />Apply Crop</Button>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t">
                <Button variant="outline" onClick={resetPhoto}>Cancel</Button>
                <Button onClick={handleSaveCroppedImage} disabled={isUploading}>{isUploading ? 'Saving...' : 'Save Photo'}</Button>
              </div>
            </div>

            <canvas ref={canvasRef} className="hidden" />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default PhotoUpload;
