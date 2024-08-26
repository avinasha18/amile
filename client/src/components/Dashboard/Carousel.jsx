import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const carouselItems = [
  {
    type: "Certification courses",
    title: "Master the in-demand skills!",
    description: "Get govt.-accredited certification and level-up your resume.",
    buttonText: "Know more",
    color: "#007bff",
    icon: "🎓"
  },
  {
    type: "Certification courses",
    title: "Special offer for students pursuing your degree!",
    description: "Get 55% + 10% OFF on online trainings",
    buttonText: "Know more",
    color: "#17a2b8",
    icon: "💼"
  },
  {
    type: "Campus Competition",
    title: "PepShe Supply Chain",
    description: "For female UG students across India",
    buttonText: "Register now",
    color: "#28a745",
    sponsor: "PEPSICO",
    bulletPoints: [
      "Chance to work for PepsiCo India",
      "Meet & learn from FMCG leaders"
    ]
  }
];

const CarouselCard = ({ item }) => (
  <div
    className="carousel-card p-4 rounded-lg shadow-md flex flex-col justify-between items-start"
    style={{
      backgroundColor: item.color,
      width: '400px',  // Fixed width for consistency
      height: '250px', // Fixed height for consistency
      margin: '2px',   // Adjust margin to create a 4px gap between cards (2px on each side)
    }}
  >
    <div className="card-content">
      <span className="card-type font-semibold text-sm">{item.type}</span>
      <h3 className="text-lg font-bold mt-2">{item.title}</h3>
      <p className="text-sm mt-2">{item.description}</p>
      {item.bulletPoints && (
        <ul className="list-disc list-inside mt-2">
          {item.bulletPoints.map((point, index) => (
            <li key={index} className="text-sm">{point}</li>
          ))}
        </ul>
      )}
    </div>
    <button className="mt-auto bg-white text-black rounded px-4 py-2 mt-4 hover:bg-gray-200">{item.buttonText}</button>
    {item.icon && <span className="card-icon text-3xl">{item.icon}</span>}
    {item.sponsor && <span className="card-sponsor mt-2 text-xs text-gray-500">{item.sponsor}</span>}
  </div>
);

const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,     // Enable infinite scrolling
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,     // Enable auto-scrolling
    autoplaySpeed: 2000, // Auto-scroll every 3 seconds
    pauseOnHover: true,  // Pause scrolling on hover
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  return (
    <Slider {...settings} className="carousel-container">
      {carouselItems.map((item, index) => (
        <CarouselCard key={index} item={item} />
      ))}
    </Slider>
  );
};

export default Carousel;
