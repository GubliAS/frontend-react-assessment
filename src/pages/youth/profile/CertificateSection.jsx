import React, { useState, useRef } from 'react';
import {useCertificates} from '../../../redux/certificateSection/useCertificate';
import InputField from '../../../components/shared/InputField';
import Button from '../../../components/shared/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Plus, Trash2, FileText, Upload, Eye, X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../../components/ui/dialog';
import { useToast } from '../../../hooks/use-toast';

const CertificatesForm = () => {
  const {
    certificates,
    addCertificate,
    removeCertificate,
    loading,
    error
  } = useCertificates();

  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const fileInputRef = useRef(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    issuer: '',
    issueDate: '',
    expirationDate: '',
    credentialId: '',
    file: null,
    fileUrl: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear field-specific error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.name.trim()) {
      errors.name = 'Certificate name is required';
    }

    if (!formData.issuer.trim()) {
      errors.issuer = 'Issuing organization is required';
    }

    if (!formData.issueDate) {
      errors.issueDate = 'Issue date is required';
    }

    // Check if expiration date is after issue date
    if (formData.expirationDate && formData.issueDate) {
      const issueDate = new Date(formData.issueDate);
      const expirationDate = new Date(formData.expirationDate);
      
      if (expirationDate <= issueDate) {
        errors.expirationDate = 'Expiration date must be after issue date';
      }
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateFile = (file) => {
    const maxSize = 5 * 1024 * 1024; // 5MB
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];

    if (!allowedTypes.includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF, JPEG, PNG, or JPG file only.",
        variant: "destructive"
      });
      return false;
    }

    if (file.size > maxSize) {
      toast({
        title: "File too large",
        description: "Please upload a file smaller than 5MB.",
        variant: "destructive"
      });
      return false;
    }

    return true;
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!validateFile(file)) {
      event.target.value = '';
      return;
    }

    setUploading(true);

    try {
      const fileUrl = URL.createObjectURL(file);
      setFormData(prev => ({ ...prev, file, fileUrl }));
      toast({
        title: "File uploaded successfully",
        description: `${file.name} has been uploaded.`
      });
    } catch (error) {
      console.error('File upload error:', error);
      toast({
        title: "Upload failed",
        description: "Failed to upload the certificate file.",
        variant: "destructive"
      });
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast({
        title: "Form validation failed",
        description: "Please fix the errors below and try again.",
        variant: "destructive"
      });
      return;
    }

    try {
      const certificateData = {
        name: formData.name.trim(),
        issuer: formData.issuer.trim(),
        issueDate: formData.issueDate,
        expirationDate: formData.expirationDate || null,
        credentialId: formData.credentialId.trim() || null,
        file: formData.file,
        fileUrl: formData.fileUrl
      };

      if (editingId) {
        // Update existing certificate (if editing functionality is needed)
        // updateCertificate(editingId, certificateData);
      } else {
        await addCertificate(certificateData);
      }

      handleCancel();
      toast({
        title: editingId ? "Certificate updated" : "Certificate added",
        description: `Your certificate has been ${editingId ? 'updated' : 'added'} successfully.`
      });
    } catch (error) {
      console.error('Error saving certificate:', error);
      toast({
        title: "Save failed",
        description: error.message || "Failed to save the certificate. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleCancel = () => {
    if (formData.fileUrl && formData.file) {
      URL.revokeObjectURL(formData.fileUrl);
    }
    
    setFormData({
      name: '',
      issuer: '',
      issueDate: '',
      expirationDate: '',
      credentialId: '',
      file: null,
      fileUrl: ''
    });
    setFormErrors({});
    setEditingId(null);
    setShowForm(false);
  };

  const handleRemove = async (id) => {
    try {
      const certificate = certificates.find(cert => cert.id === id);
      
      if (certificate?.fileUrl && certificate.file) {
        URL.revokeObjectURL(certificate.fileUrl);
      }
      
      await removeCertificate(id);
      
      toast({
        title: "Certificate removed",
        description: "The certificate has been removed from your profile."
      });
    } catch (error) {
      console.error('Error removing certificate:', error);
      toast({
        title: "Remove failed",
        description: error.message || "Failed to remove the certificate. Please try again.",
        variant: "destructive"
      });
    }
  };

  const openPreview = (fileUrl) => setPreviewUrl(fileUrl);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long',
      day: 'numeric'
    });
  };

  const removeFile = () => {
    if (formData.fileUrl) {
      URL.revokeObjectURL(formData.fileUrl);
    }
    setFormData(prev => ({ ...prev, file: null, fileUrl: '' }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Certificates & Licenses
        </h2>
        <p className="text-gray-600">
          Upload your professional certificates, licenses, and certifications to showcase your qualifications.
        </p>
      </div>

      {/* Error display */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          <p className="text-sm">{error}</p>
        </div>
      )}

      {/* Loading state */}
      {loading && (
        <div className="flex items-center justify-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-2 text-gray-600">Loading certificates...</span>
        </div>
      )}

      {/* Existing certificates */}
      <div className="space-y-4">
        {certificates?.map(certificate => (
          <Card key={certificate.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <CardTitle className="text-lg text-gray-900">
                    {certificate.name}
                  </CardTitle>
                  <p className="text-gray-600 font-medium">
                    {certificate.issuer}
                  </p>
                  <div className="mt-1 space-y-1">
                    <p className="text-sm text-gray-500">
                      Issued: {formatDate(certificate.issueDate)}
                    </p>
                    {certificate.expirationDate && (
                      <p className="text-sm text-gray-500">
                        Expires: {formatDate(certificate.expirationDate)}
                      </p>
                    )}
                    {certificate.credentialId && (
                      <p className="text-sm text-gray-500">
                        ID: {certificate.credentialId}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex gap-2 ml-4">
                  {certificate.fileUrl && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => openPreview(certificate.fileUrl)}
                      className="p-2"
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                  )}
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleRemove(certificate.id)}
                    className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            {certificate.fileUrl && (
              <CardContent className="pt-0">
                <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 p-2 rounded">
                  <FileText className="w-4 h-4" />
                  <span>Certificate file attached</span>
                </div>
              </CardContent>
            )}
          </Card>
        ))}
        
        {certificates?.length === 0 && !loading && (
          <div className="text-center py-8 text-gray-500">
            <FileText className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>No certificates added yet. Add your first certificate to get started.</p>
          </div>
        )}
      </div>

      {/* Add new certificate button */}
      {!showForm && (
        <Button 
          onClick={() => setShowForm(true)} 
          variant="outline" 
          className="w-full border-dashed border-2 hover:border-blue-500 hover:text-blue-600 transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" /> 
          Add Certificate
        </Button>
      )}

      {/* Certificate form */}
      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>
              {editingId ? 'Edit Certificate' : 'Add New Certificate'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField
                  label="Certificate Name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g., AWS Certified Solutions Architect"
                  error={formErrors.name}
                  required
                />

                <InputField
                  label="Issuing Organization"
                  name="issuer"
                  value={formData.issuer}
                  onChange={handleInputChange}
                  placeholder="e.g., Amazon Web Services"
                  error={formErrors.issuer}
                  required
                />

                <InputField
                  label="Issue Date"
                  name="issueDate"
                  type="date"
                  value={formData.issueDate}
                  onChange={handleInputChange}
                  error={formErrors.issueDate}
                  required
                />

                <InputField
                  label="Expiration Date (Optional)"
                  name="expirationDate"
                  type="date"
                  value={formData.expirationDate}
                  onChange={handleInputChange}
                  error={formErrors.expirationDate}
                />

                <InputField
                  label="Credential ID (Optional)"
                  name="credentialId"
                  value={formData.credentialId}
                  onChange={handleInputChange}
                  placeholder="e.g., ABC123XYZ789"
                  className="md:col-span-2"
                />
              </div>

              {/* File upload */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Certificate File (Optional)
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                  {formData.file ? (
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded">
                      <div className="flex items-center gap-3">
                        <FileText className="w-8 h-8 text-blue-500" />
                        <div className="text-left">
                          <p className="font-medium text-gray-900">
                            {formData.file.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            {(formData.file.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {formData.fileUrl && (
                          <Button 
                            type="button" 
                            variant="outline" 
                            size="sm" 
                            onClick={() => openPreview(formData.fileUrl)}
                            className="p-2"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                        )}
                        <Button 
                          type="button" 
                          variant="outline" 
                          size="sm" 
                          onClick={removeFile}
                          className="p-2 text-red-600 hover:text-red-700"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 mb-2">
                        Drop your certificate file here, or{' '}
                        <button 
                          type="button" 
                          className="text-blue-600 hover:underline focus:outline-none" 
                          onClick={() => fileInputRef.current?.click()} 
                          disabled={uploading}
                        >
                          browse
                        </button>
                      </p>
                      <p className="text-sm text-gray-500">
                        PDF, JPG, PNG files only, max 5MB
                      </p>
                    </>
                  )}
                  <input 
                    ref={fileInputRef} 
                    type="file" 
                    accept=".pdf,.jpg,.jpeg,.png" 
                    onChange={handleFileUpload} 
                    className="hidden" 
                    disabled={uploading} 
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button 
                variant='emeraldGradient'
                  type="submit" 
                  disabled={uploading || loading}
                  className="min-w-[120px]"
                >
                  {uploading ? 'Uploading...' : loading ? 'Saving...' : editingId ? 'Update Certificate' : 'Add Certificate'}
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={handleCancel}
                  disabled={uploading || loading}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* PDF Preview Dialog */}
      <Dialog open={!!previewUrl} onOpenChange={() => setPreviewUrl(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>Certificate Preview</DialogTitle>
          </DialogHeader>
          {previewUrl && (
            <div className="w-full h-[70vh]">
              <iframe 
                src={previewUrl} 
                className="w-full h-full border rounded" 
                title="Certificate Preview"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CertificatesForm;