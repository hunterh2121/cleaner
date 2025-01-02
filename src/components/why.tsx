import React from "react";

const WhyChooseUs: React.FC = () => {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
          Why Choose Us
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-[#00b0f0] font-bold text-2xl mb-2">
              Small Business
            </div>
            <div className="text-gray-600">Locally Operated</div>
          </div>
          <div className="text-center">
            <div className="text-[#00b0f0] font-bold text-2xl mb-2">50+</div>
            <div className="text-gray-600">Happy Customers</div>
          </div>
          <div className="text-center">
            <div className="text-[#00b0f0] font-bold text-2xl mb-2">100%</div>
            <div className="text-gray-600">Satisfaction Guaranteed</div>
          </div>
          <div className="text-center">
            <div className="text-[#00b0f0] font-bold text-2xl mb-2">
              Attention To Detail
            </div>
            <div className="text-gray-600">
              We Pride In Our Ability To Clean Your Windows, Gutters, And More!
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
