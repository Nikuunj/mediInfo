'use client';

import React, { useState, ChangeEvent } from 'react';
import Image from 'next/image';
import axios from 'axios';
import { createNewItem } from '@/actions/item';
import { useRouter } from 'next/navigation';


interface FormData {
    name: string;
    description: string;
    UseOf: string;
    url: string;
    shopUrl: string;
    price: string;
}

interface FormErrors {
    [key: string]: string;
}

interface ImageKitResponse {
    url: string;
    fileId: string;
    name: string;
}

const CreateForm: React.FC = () => {
    const router = useRouter();
    const [formData, setFormData] = useState<FormData>({
        name: '',
        description: '',
        UseOf: '',
        url: '',
        shopUrl: '',
        price: ''
    });

    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [imageUploading, setImageUploading] = useState<boolean>(false);
    const [imagePreview, setImagePreview] = useState<string>('');

    const handleImageUpload = async (file: File): Promise<void> => {
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith('image/')) {
            setErrors(prev => ({
                ...prev,
                url: 'Please select a valid image file'
            }));
            return;
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            setErrors(prev => ({
                ...prev,
                url: 'Image file size must be less than 5MB'
            }));
            return;
        }

        setImageUploading(true);
        setErrors(prev => ({
            ...prev,
            url: ''
        }));

        try {
            // Create FormData for ImageKit upload
            const uploadFormData = new FormData();
            uploadFormData.append('file', file);
            uploadFormData.append('fileName', `item_${Date.now()}_${file.name}`);
            uploadFormData.append('folder', '/items'); // Optional: organize in folders

            // Replace with your ImageKit configuration
            const IMAGEKIT_URL_ENDPOINT = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT || 'https://ik.imagekit.io/your_imagekit_id';
            const IMAGEKIT_PUBLIC_KEY = process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY || 'your_public_key';
            
            // Make request to your Next.js API route for ImageKit upload
            const response = await axios.post(
                '/api/upload-image',
                uploadFormData,
                {
                    headers: { 'Content-Type': 'multipart/form-data' }
                }
            );


            console.log(response);
            
            if (!response.data) {
                throw new Error('Failed to upload image');
            }

            const imageKitResponse: ImageKitResponse = response.data;

            // Update form data with ImageKit URL
            setFormData(prev => ({
                ...prev,
                url: imageKitResponse.url
            }));

            // Set preview for immediate feedback
            setImagePreview(imageKitResponse.url);

        } catch (error) {
            console.error('Error uploading image:', error);
            setErrors(prev => ({
                ...prev,
                url: 'Failed to upload image. Please try again.'
            }));
        } finally {
            setImageUploading(false);
        }
    };

    const handleImageInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const file = e.target.files?.[0];
        if (file) {
            handleImageUpload(file);
        }
    };

    const handleUrlInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const value = e.target.value;
        setFormData(prev => ({
            ...prev,
            url: value
        }));
        
        // Set preview for direct URL input
        if (value && isValidUrl(value)) {
            setImagePreview(value);
        } else {
            setImagePreview('');
        }

        // Clear error when user starts typing
        if (errors.url) {
            setErrors(prev => ({
                ...prev,
                url: ''
            }));
        }
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        const { name, value } = e.target;
        
        // Handle URL field differently
        if (name === 'url') {
            handleUrlInputChange(e as ChangeEvent<HTMLInputElement>);
            return;
        }
        
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };
    const isValidUrl = (string: string): boolean => {
        try {
            new URL(string);
            return true;
        } catch (_) {
            return false;
        }
    };

    const handleSubmit = async (): Promise<void> => {
        setIsSubmitting(true);
        
        try {
            // Prepare data for submission
            const submitData = {
                ...formData,
                price: formData.price ? parseInt(formData.price) : null,
                shopUrl: formData.shopUrl || null
            };
            
            
            const resposnse = await createNewItem(submitData);
            if(!resposnse) {
                router.push('../../signin');
                return;
            }
            // Reset form on success
            setFormData({
                name: '',
                description: '',
                UseOf: '',
                url: '',
                shopUrl: '',
                price: ''
            });
            setImagePreview('');
            
            // Show success message (you might want to use a toast library instead)
            alert('Item created successfully!');
        } catch (error) {
            console.error('Error creating item:', error);
            alert('Error creating item. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const clearImage = (): void => {
        setImagePreview('');
        setFormData(prev => ({ ...prev, url: '' }));
    };

    return (
        <div className='bg-white py-10'>

        <div className="max-w-2xl mx-auto p-6 bg-gray-50 shadow-lg rounded-lg text-black">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Create New Item</h2>
            
            <div className="space-y-6">
                {/* Name Field */}
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Name <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                            errors.name ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter item name"
                        />
                    {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                </div>

                {/* Description Field */}
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                        Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        rows={4}
                        className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                            errors.description ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter item description"
                    />
                    {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
                </div>

                {/* Use Of Field */}
                <div>
                    <label htmlFor="UseOf" className="block text-sm font-medium text-gray-700 mb-2">
                        Use Of <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        id="UseOf"
                        name="UseOf"
                        value={formData.UseOf}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                            errors.UseOf ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter use case or purpose"
                        />
                    {errors.UseOf && <p className="mt-1 text-sm text-red-600">{errors.UseOf}</p>}
                </div>

                {/* Image URL Field with Upload */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Image <span className="text-red-500">*</span>
                    </label>
                    
                    {/* Upload Area */}
                    <div className="mb-4">
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                            <input
                                type="file"
                                id="image-upload"
                                accept="image/*"
                                onChange={handleImageInputChange}
                                className="hidden"
                                disabled={imageUploading}
                                />
                            <label
                                htmlFor="image-upload"
                                className={`cursor-pointer ${imageUploading ? 'cursor-not-allowed' : ''}`}
                            >
                                {imageUploading ? (
                                    <div className="flex flex-col items-center">
                                        <svg className="animate-spin h-8 w-8 text-blue-500 mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        <p className="text-sm text-gray-500">Uploading to ImageKit...</p>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center">
                                        <svg className="h-12 w-12 text-gray-400 mb-2" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                                            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        <p className="text-sm text-gray-600 mb-1">
                                            <span className="font-medium text-blue-600">Click to upload</span> or drag and drop
                                        </p>
                                        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
                                    </div>
                                )}
                            </label>
                        </div>
                    </div>

                    {/* OR Divider */}
                    <div className="relative mb-4">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-gray-500">OR</span>
                        </div>
                    </div>

                    {/* Direct URL Input */}
                    <div>
                        <input
                            type="url"
                            id="url"
                            name="url"
                            value={formData.url}
                            onChange={handleInputChange}
                            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                                errors.url ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="Or paste image URL here..."
                            disabled={imageUploading}
                            />
                        <p className="mt-1 text-xs text-gray-500">
                            You can upload an image or paste a direct image URL
                        </p>
                    </div>

                    {errors.url && <p className="mt-1 text-sm text-red-600">{errors.url}</p>}

                    {/* Image Preview */}
                    {imagePreview && (
                        <div className="mt-4">
                            <p className="text-sm font-medium text-gray-700 mb-2">Image Preview:</p>
                            <div className="relative inline-block">
                                <Image
                                    src={imagePreview}
                                    alt="Preview"
                                    width={300}
                                    height={200}
                                    className="max-w-xs max-h-48 object-contain border rounded-lg shadow-sm"
                                    onError={clearImage}
                                    />
                                <button
                                    type="button"
                                    onClick={clearImage}
                                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                                    >
                                    ×
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Shop URL Field (Optional) */}
                <div>
                    <label htmlFor="shopUrl" className="block text-sm font-medium text-gray-700 mb-2">
                        Shop URL <span className="text-gray-400">(Optional)</span>
                    </label>
                    <input
                        type="url"
                        id="shopUrl"
                        name="shopUrl"
                        value={formData.shopUrl}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                            errors.shopUrl ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="https://shop.example.com"
                        />
                    {errors.shopUrl && <p className="mt-1 text-sm text-red-600">{errors.shopUrl}</p>}
                </div>

                {/* Price Field (Optional) */}
                <div>
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
                        Price <span className="text-gray-400">(Optional)</span>
                    </label>
                    <div className="relative">
                        <span className="absolute left-3 top-2 text-gray-500">$</span>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            value={formData.price}
                            onChange={handleInputChange}
                            min="0"
                            className={`w-full pl-8 pr-3 py-2 border [&::-webkit-inner-spin-button]:appearance-none [appearance:textfield]  rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                                errors.price ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="0"
                            />
                    </div>
                    {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price}</p>}
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                    <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className={`w-full py-3 px-4 rounded-md text-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                            isSubmitting 
                            ? 'bg-gray-400 cursor-not-allowed' 
                            : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800'
                        }`}
                    >
                        {isSubmitting ? (
                            <span className="flex items-center justify-center">
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Creating Item...
                            </span>
                        ) : (
                            'Create Item'
                        )}
                    </button>
                </div>
            </div>
        </div>
    </div>
    );
};

export default CreateForm;