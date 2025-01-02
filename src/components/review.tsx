import React, { useState } from "react";
import { Star } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Review {
  name: string;
  comment: string;
  service: string;
}

const reviews: Review[] = [
  {
    name: "Sharon Casey",
    comment:
      "I had my windows cleaned today. I have a lot of windows. Hunter did an excellent job at a fair price. They were a mess after all of the pollen from spring in addition to the storms. He worked hard and it shows. Even the screens look new.",
    service: "Window Cleaning",
  },
  {
    name: "Catherine B",
    comment:
      "I hired CFWC to clean my gutters. He was on time, had good communication, did good work, and charged a good price.",
    service: "Gutter Cleaning",
  },
  {
    name: "Valorie Kilbourne",
    comment:
      "Hunter has excellent work ethic. He does a thorough job, he cleaned our gutters and down spouts cleaned up and placed debris by road. He also cleaned our screen porch cover and screens.",
    service: "Gutter & Screen Cleaning",
  },
  {
    name: "Steve-O",
    comment:
      "Hunter installed our permanent Govee lighting and did an excellent job! We will definitely have him back to install more!",
    service: "Lighting Installation",
  },
];

const ReviewCard: React.FC<{ review: Review; onClick: () => void }> = ({
  review,
  onClick,
}) => (
  <div
    onClick={onClick}
    className="bg-white rounded-xl p-6 shadow-lg transition-all duration-300 hover:shadow-xl cursor-pointer group"
  >
    <div className="flex items-center gap-3 mb-4">
      <div className="bg-gradient-to-br from-blue-500 to-blue-600 w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold group-hover:scale-105 transition-transform">
        {review.name.charAt(0)}
      </div>
      <div>
        <h3 className="font-semibold text-gray-900">{review.name}</h3>
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={14}
              className="fill-yellow-400 text-yellow-400"
            />
          ))}
        </div>
      </div>
    </div>

    <div className="mb-4">
      <span className="inline-block px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-medium group-hover:bg-blue-100 transition-colors">
        {review.service}
      </span>
    </div>

    <p className="text-gray-600 line-clamp-4 group-hover:text-gray-900 transition-colors">
      {review.comment}
    </p>

    <div className="mt-4 flex items-center gap-2">
      <img src="/googleicon.svg" alt="Google Review" className="w-5 h-5" />
      <span className="text-xs text-gray-500">Verified Google Review</span>
    </div>
  </div>
);

const ExpandedReview: React.FC<{ review: Review }> = ({ review }) => (
  <div className="p-4">
    <div className="flex items-center gap-4 mb-6">
      <div className="bg-gradient-to-br from-blue-500 to-blue-600 w-16 h-16 rounded-full flex items-center justify-center text-white text-xl font-semibold">
        {review.name.charAt(0)}
      </div>
      <div>
        <h3 className="text-xl font-semibold text-gray-900">{review.name}</h3>
        <div className="flex items-center gap-1 mt-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={18}
              className="fill-yellow-400 text-yellow-400"
            />
          ))}
        </div>
        <span className="inline-block px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-medium mt-2">
          {review.service}
        </span>
      </div>
    </div>

    <p className="text-gray-700 text-lg leading-relaxed mb-6">
      {review.comment}
    </p>

    <div className="flex items-center gap-2 pt-4 border-t">
      <img src="/googleicon.svg" alt="Google Review" className="w-6 h-6" />
      <span className="text-sm text-gray-500">Verified Google Review</span>
    </div>
  </div>
);

const Reviews = () => {
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Customer Reviews
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            See what our customers are saying about their experience with our
            services
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((review, index) => (
            <ReviewCard
              key={index}
              review={review}
              onClick={() => setSelectedReview(review)}
            />
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow-md">
            <div className="flex -space-x-2">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 border-2 border-white flex items-center justify-center text-white text-xs"
                >
                  {String.fromCharCode(65 + i)}
                </div>
              ))}
            </div>
            <span className="text-gray-600 font-medium">
              Join 50+ happy customers
            </span>
          </div>
        </div>
      </div>

      <Dialog
        open={selectedReview !== null}
        onOpenChange={() => setSelectedReview(null)}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Customer Review</DialogTitle>
          </DialogHeader>
          {selectedReview && <ExpandedReview review={selectedReview} />}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Reviews;
