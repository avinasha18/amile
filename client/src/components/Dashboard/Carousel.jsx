import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';

const carouselItems = [
  {
    type: "Certification courses",
    title: "Complete Generative AI Course",
    description: "This course covers the fundamentals of Generative AI, including deep learning, NLP, and computer vision.",
    buttonText: "Know more",
    color: "#007bff",
    icon: "🤖",
    rating: 4.7,
    participants: 1756,
    courseThumbnail: "https://ideausher.com/wp-content/uploads/2023/02/Generative-AI.webp"
  },
  {
    type: "Certification courses",
    title: "Natural Language Processing",
    description: "This course covers the basics of Natural Language Processing, including tokenization, parsing, and machine translation.",
    buttonText: "Know more",
    color: "#17a2b8",
    icon: "🧠",
    rating: 4.7,
    participants: 1750,
    courseThumbnail: "https://th.bing.com/th/id/OIP.GL0v5xy4w0Im4swDBd2eigHaE8?w=1080&h=720&...",
  },
  {
    type: "Certification courses",
    title: "Advanced Computer Vision",
    description: "Dive deep into advanced topics in computer vision, including object detection, segmentation, and 3D reconstruction.",
    buttonText: "Know more",
    color: "#28a745",
    icon: "👁️",
    rating: 4.9,
    participants: 1000,
    courseThumbnail: "https://i.pcmag.com/imagery/articles/061CyMCZV6G2sXUmreKHvXS-1.fit_lim..."
  },
  {
    type: "Certification courses",
    title: "Big Data Analytics",
    description: "Understand the techniques and tools for analyzing large datasets and extracting meaningful insights.",
    buttonText: "Know more",
    color: "#6c757d",
    icon: "📊",
    rating: 4.4,
    participants: 1800,
    courseThumbnail: "https://th.bing.com/th/id/OIP.oVoubtxh_jHCvkRcdMMUFAHaEK?rs=1&pid=ImgD..."
  }
];

const CarouselCard = ({ item }) => (
  <div
    className="carousel-card p-4 rounded-lg shadow-md flex flex-col justify-between items-start"
    style={{
      backgroundColor: item.color,
      width: '370px',  // Fixed width for consistency
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
    <Link to='/courses'>
    <button className="mt-auto bg-white text-black rounded px-4 py-2 hover:bg-gray-200">{item.buttonText}</button>
    </Link>
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
