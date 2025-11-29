import React, { useState } from 'react';
import { Camera, X, ChevronLeft, ChevronRight, Calendar, MapPin, ImageIcon } from 'lucide-react';

export default function PhotoGallery() {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    const categories = [
        { id: 'all', label: 'All Photos' },
        { id: 'campus', label: 'Campus Life' },
        { id: 'events', label: 'Events' },
        { id: 'sports', label: 'Sports' },
        { id: 'graduation', label: 'Graduation' },
        { id: 'facilities', label: 'Facilities' }
    ];

    const photos = [
        {
            id: 1,
            category: 'campus',
            title: 'Main Campus Building',
            date: '2024-09-15',
            location: 'Main Campus',
            description: 'Our state-of-the-art main building with modern architecture',
            color: '#3b82f6'
        },
        {
            id: 2,
            category: 'events',
            title: 'Annual Science Fair 2024',
            date: '2024-08-20',
            location: 'Exhibition Hall',
            description: 'Students showcasing innovative science projects',
            color: '#10b981'
        },
        {
            id: 3,
            category: 'sports',
            title: 'Inter-College Basketball Tournament',
            date: '2024-07-10',
            location: 'Sports Complex',
            description: 'Exciting moments from the championship game',
            color: '#f59e0b'
        },
        {
            id: 4,
            category: 'graduation',
            title: 'Graduation Ceremony 2024',
            date: '2024-06-25',
            location: 'Grand Auditorium',
            description: 'Celebrating the success of our graduating class',
            color: '#8b5cf6'
        },
        {
            id: 5,
            category: 'facilities',
            title: 'Modern Library',
            date: '2024-05-30',
            location: 'Central Library',
            description: 'Our newly renovated library with digital resources',
            color: '#ec4899'
        },
        {
            id: 6,
            category: 'campus',
            title: 'Student Lounge Area',
            date: '2024-05-15',
            location: 'Student Center',
            description: 'Relaxation and collaboration space for students',
            color: '#06b6d4'
        },
        {
            id: 7,
            category: 'events',
            title: 'Cultural Festival 2024',
            date: '2024-04-18',
            location: 'Open Air Theater',
            description: 'Vibrant cultural performances by talented students',
            color: '#f43f5e'
        },
        {
            id: 8,
            category: 'sports',
            title: 'Annual Sports Day',
            date: '2024-03-22',
            location: 'Athletic Field',
            description: 'Track and field events showcasing athletic excellence',
            color: '#14b8a6'
        },
        {
            id: 9,
            category: 'facilities',
            title: 'Computer Lab',
            date: '2024-03-10',
            location: 'Technology Building',
            description: 'Advanced computing facilities for students',
            color: '#6366f1'
        },
        {
            id: 10,
            category: 'campus',
            title: 'Campus Green Spaces',
            date: '2024-02-28',
            location: 'Central Park',
            description: 'Beautiful landscaped areas for outdoor learning',
            color: '#22c55e'
        },
        {
            id: 11,
            category: 'events',
            title: 'Guest Lecture Series',
            date: '2024-02-14',
            location: 'Conference Hall',
            description: 'Distinguished speakers sharing industry insights',
            color: '#a855f7'
        },
        {
            id: 12,
            category: 'graduation',
            title: 'Award Ceremony',
            date: '2024-01-30',
            location: 'Grand Auditorium',
            description: 'Honoring academic excellence and achievements',
            color: '#eab308'
        }
    ];

    const filteredPhotos = photos.filter(
        photo => selectedCategory === 'all' || photo.category === selectedCategory
    );

    const openLightbox = (photo) => {
        setSelectedImage(photo);
        setLightboxOpen(true);
    };

    const closeLightbox = () => {
        setLightboxOpen(false);
        setSelectedImage(null);
    };

    const navigateImage = (direction) => {
        const currentIndex = filteredPhotos.findIndex(p => p.id === selectedImage.id);
        let newIndex;
        if (direction === 'next') {
            newIndex = (currentIndex + 1) % filteredPhotos.length;
        } else {
            newIndex = (currentIndex - 1 + filteredPhotos.length) % filteredPhotos.length;
        }
        setSelectedImage(filteredPhotos[newIndex]);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    };

    return (
        <div style={{ backgroundColor: '#f8fafc' }} className="min-h-screen p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div style={{ background: 'linear-gradient(135deg, #082567 0%, #103B99 100%)' }} className="rounded-2xl p-8 md:p-12 text-white shadow-lg mb-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-32 -mt-32"></div>
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-5 rounded-full -ml-24 -mb-24"></div>

                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-4">
                            <Camera className="w-10 h-10" />
                            <h1 className="text-3xl md:text-5xl font-bold">Photo Gallery</h1>
                        </div>
                        <p className="text-blue-100 text-sm md:text-lg max-w-2xl">
                            Capturing memories and moments that define our academic journey
                        </p>
                    </div>
                </div>

                {/* Category Filters */}
                <div className="bg-white rounded-xl shadow-md p-6 mb-8">
                    <div className="flex items-center gap-3 mb-4">
                        <ImageIcon style={{ color: '#082567' }} className="w-6 h-6" />
                        <h2 className="text-xl font-bold text-gray-800">Browse by Category</h2>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        {categories.map(category => (
                            <button
                                key={category.id}
                                onClick={() => setSelectedCategory(category.id)}
                                style={{
                                    backgroundColor: selectedCategory === category.id ? '#082567' : '#f3f4f6',
                                    color: selectedCategory === category.id ? 'white' : '#4b5563'
                                }}
                                className="px-5 py-2.5 rounded-full font-semibold text-sm transition-all hover:shadow-md hover:scale-105"
                            >
                                {category.label}
                            </button>
                        ))}
                    </div>
                    <div className="mt-4 text-sm text-gray-600">
                        Showing <span className="font-semibold" style={{ color: '#082567' }}>{filteredPhotos.length}</span> photos
                    </div>
                </div>

                {/* Photo Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredPhotos.map(photo => (
                        <div
                            key={photo.id}
                            onClick={() => openLightbox(photo)}
                            className="group cursor-pointer bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                        >
                            {/* Photo Placeholder */}
                            <div
                                style={{ backgroundColor: photo.color }}
                                className="h-64 flex items-center justify-center relative overflow-hidden"
                            >
                                <Camera className="w-16 h-16 text-white opacity-30" />
                                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity"></div>
                                <div className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full text-xs font-semibold" style={{ color: '#082567' }}>
                                    {categories.find(c => c.id === photo.category)?.label}
                                </div>
                            </div>

                            {/* Photo Info */}
                            <div className="p-4">
                                <h3 className="font-bold text-gray-800 mb-2 line-clamp-1">{photo.title}</h3>
                                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{photo.description}</p>
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2 text-xs text-gray-500">
                                        <Calendar className="w-3.5 h-3.5" />
                                        <span>{formatDate(photo.date)}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-gray-500">
                                        <MapPin className="w-3.5 h-3.5" />
                                        <span>{photo.location}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {filteredPhotos.length === 0 && (
                    <div className="text-center py-20">
                        <Camera className="w-20 h-20 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500 text-lg">No photos found in this category</p>
                    </div>
                )}

                {/* Lightbox Modal */}
                {lightboxOpen && selectedImage && (
                    <div className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center p-4" onClick={closeLightbox}>
                        {/* Close Button */}
                        <button
                            onClick={closeLightbox}
                            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-50"
                        >
                            <X className="w-10 h-10" />
                        </button>

                        {/* Previous Button */}
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                navigateImage('prev');
                            }}
                            className="absolute left-4 text-white hover:text-gray-300 transition-colors z-50"
                        >
                            <ChevronLeft className="w-12 h-12" />
                        </button>

                        {/* Next Button */}
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                navigateImage('next');
                            }}
                            className="absolute right-4 text-white hover:text-gray-300 transition-colors z-50"
                        >
                            <ChevronRight className="w-12 h-12" />
                        </button>

                        {/* Image Container */}
                        <div className="max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
                            <div
                                style={{ backgroundColor: selectedImage.color }}
                                className="w-full h-[60vh] flex items-center justify-center rounded-lg mb-4"
                            >
                                <Camera className="w-32 h-32 text-white opacity-30" />
                            </div>

                            {/* Image Details */}
                            <div className="bg-white rounded-lg p-6">
                                <div className="flex items-start justify-between mb-3">
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-800 mb-2">{selectedImage.title}</h2>
                                        <div className="inline-block px-3 py-1 rounded-full text-sm font-semibold mb-3" style={{ backgroundColor: '#082567', color: 'white' }}>
                                            {categories.find(c => c.id === selectedImage.category)?.label}
                                        </div>
                                    </div>
                                </div>
                                <p className="text-gray-700 mb-4">{selectedImage.description}</p>
                                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-4 h-4" />
                                        <span>{formatDate(selectedImage.date)}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <MapPin className="w-4 h-4" />
                                        <span>{selectedImage.location}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}