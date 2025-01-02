import React, { useState } from "react";
import { X, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";

interface GalleryImage {
  id: number;
  category: string;
  src: string;
  alt: string;
  description: string;
}

interface ModalProps {
  image: GalleryImage;
  onClose: () => void;
}

const ModernGallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const baseUrl = import.meta.env.BASE_URL; // This will handle the GitHub Pages base URL

  const galleryImages: GalleryImage[] = [
    // Window Cleaning
    {
      id: 1,
      category: "Window Cleaning",
      src: `${baseUrl}gallery/gallery1.jpg`,
      alt: "High-rise commercial window cleaning",
      description: "Professional window cleaning for multi-story buildings",
    },
    {
      id: 2,
      category: "Window Cleaning",
      src: `${baseUrl}gallery/gallery2.jpg`,
      alt: "Residential window cleaning",
      description: "Crystal clear windows for your home",
    },
    {
      id: 3,
      category: "Window Cleaning",
      src: `${baseUrl}gallery/gallery3.jpg`,
      alt: "Storefront window cleaning",
      description: "Retail storefront maintenance",
    },
    {
      id: 13,
      category: "Window Cleaning",
      src: `${baseUrl}gallery/gallery9.jpg`,
      alt: "Residential window cleaning",
      description: "Crystal clear windows for your home",
    },
    {
      id: 14,
      category: "Window Cleaning",
      src: `${baseUrl}gallery/gallery10.jpg`,
      alt: "Residential window cleaning",
      description: "Crystal clear windows for your home",
    },
    {
      id: 15,
      category: "Window Cleaning",
      src: `${baseUrl}gallery/gallery11.jpg`,
      alt: "Residential window cleaning",
      description: "Crystal clear windows for your home",
    },

    // Gutter Cleaning
    {
      id: 4,
      category: "Gutter Cleaning",
      src: `${baseUrl}gallery/gallery4.jpg`,
      alt: "Professional gutter cleaning",
      description: "Thorough gutter cleaning and maintenance",
    },
    {
      id: 5,
      category: "Gutter Cleaning",
      src: `${baseUrl}gallery/gallery5.jpg`,
      alt: "Gutter maintenance and repair",
      description: "Gutter inspection and debris removal",
    },
    {
      id: 6,
      category: "Gutter Cleaning",
      src: `${baseUrl}gallery/gallery6.jpg`,
      alt: "Leaf removal from gutters",
      description: "Seasonal gutter cleaning service",
    },

    // Pressure Washing
    {
      id: 7,
      category: "Pressure Washing",
      src: `${baseUrl}gallery/pressure-1.jpg`,
      alt: "Driveway pressure washing",
      description: "Deep cleaning of concrete surfaces",
    },
    {
      id: 8,
      category: "Pressure Washing",
      src: `${baseUrl}gallery/pressure-2.jpg`,
      alt: "Deck pressure washing",
      description: "Wooden deck restoration and cleaning",
    },
    {
      id: 9,
      category: "Pressure Washing",
      src: `${baseUrl}gallery/pressure-3.jpg`,
      alt: "House siding pressure washing",
      description: "Exterior house cleaning service",
    },

    // Christmas Lights
    {
      id: 10,
      category: "Christmas Lights",
      src: `${baseUrl}gallery/gallery7.jpg`,
      alt: "Professional Christmas light installation",
      description: "Residential holiday lighting",
    },
    {
      id: 11,
      category: "Christmas Lights",
      src: `${baseUrl}gallery/gallery8.jpg`,
      alt: "Commercial Christmas lighting",
      description: "Business holiday lighting displays",
    },
    {
      id: 12,
      category: "Christmas Lights",
      src: `${baseUrl}gallery/gallery12.jpg`,
      alt: "Custom holiday light designs",
      description: "Custom holiday lighting solutions",
    },
  ];

  // Rest of the component remains the same
  const [filter, setFilter] = useState<string>("All");
  const categories: string[] = [
    "All",
    "Window Cleaning",
    "Gutter Cleaning",
    "Pressure Washing",
    "Christmas Lights",
  ];

  const filteredImages: GalleryImage[] =
    filter === "All"
      ? galleryImages
      : galleryImages.filter((img) => img.category === filter);

  const handleImageLoad = (): void => {
    setLoading(false);
  };

  const Modal: React.FC<ModalProps> = ({ image, onClose }) => {
    const currentIndex = galleryImages.findIndex((img) => img.id === image.id);

    const handleNext = (e: React.MouseEvent): void => {
      e.stopPropagation();
      const nextImage = galleryImages[currentIndex + 1];
      if (nextImage) setSelectedImage(nextImage);
    };

    const handlePrev = (e: React.MouseEvent): void => {
      e.stopPropagation();
      const prevImage = galleryImages[currentIndex - 1];
      if (prevImage) setSelectedImage(prevImage);
    };

    return (
      <div
        className="fixed inset-0 bg-black/90 z-50 p-4 md:p-8 backdrop-blur-sm"
        onClick={onClose}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/80 hover:text-white z-50"
          aria-label="Close modal"
        >
          <X className="w-8 h-8" />
        </button>

        <div
          className="h-full flex items-center justify-center"
          onClick={(e: React.MouseEvent) => e.stopPropagation()}
        >
          {currentIndex > 0 && (
            <button
              onClick={handlePrev}
              className="absolute left-4 text-white/80 hover:text-white transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
          )}

          <div className="relative max-h-full max-w-5xl mx-auto">
            <img
              src={image.src}
              alt={image.alt}
              className="max-h-[85vh] w-auto mx-auto rounded-lg shadow-2xl"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 rounded-b-lg">
              <p className="text-white text-sm md:text-base font-medium">
                {image.alt}
              </p>
              <p className="text-white/80 text-xs md:text-sm mt-1">
                {image.description}
              </p>
            </div>
          </div>

          {currentIndex < galleryImages.length - 1 && (
            <button
              onClick={handleNext}
              className="absolute right-4 text-white/80 hover:text-white transition-colors"
              aria-label="Next image"
            >
              <ChevronRight className="w-8 h-8" />
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Category Filter */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-4 scrollbar-hide">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setFilter(category)}
            className={`px-6 py-3 rounded-full text-sm font-medium transition-all whitespace-nowrap
              ${
                filter === category
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredImages.map((image) => (
          <div
            key={image.id}
            className="aspect-[4/3] group relative cursor-pointer overflow-hidden rounded-xl bg-gray-100 shadow-md hover:shadow-xl transition-shadow duration-300"
            onClick={() => setSelectedImage(image)}
          >
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
              </div>
            )}
            <img
              src={image.src}
              alt={image.alt}
              onLoad={handleImageLoad}
              className={`object-cover w-full h-full transition-all duration-500 
                group-hover:scale-105 ${loading ? "opacity-0" : "opacity-100"}`}
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0 
              opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="text-white text-sm font-medium">{image.alt}</p>
                <p className="text-white/90 text-xs mt-1">
                  {image.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedImage && (
        <Modal image={selectedImage} onClose={() => setSelectedImage(null)} />
      )}
    </div>
  );
};

export default ModernGallery;
