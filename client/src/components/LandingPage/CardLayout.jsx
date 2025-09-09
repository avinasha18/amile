import React, { useState } from "react";
import { motion } from "framer-motion";
import { Code, ClipboardList, FolderKanban, BarChart3 } from "lucide-react";
import './CardLayout.css';

const Card = ({ icon: Icon, title, description, gradientClass, isActive, onClick }) => (
  <motion.div
    className={`card ${gradientClass} ${isActive ? 'active' : ''}`}
    onClick={onClick}
    initial={{ opacity: isActive ? 1 : 0.3 }}
    animate={{ opacity: isActive ? 1 : 0.3 }}
    transition={{ duration: 0.3 }}
    style={{ pointerEvents: isActive ? 'auto' : 'none' }} // Disable pointer events for inactive cards
  >
    <Icon size={32} />
    <h3>{title}</h3>
    <p>{description}</p>
  </motion.div>
);

const CardLayout = () => {
  const [activeCard, setActiveCard] = useState(0); // Start with the first card selected

  const cards = [
    { icon: Code, title: "Coding Practice", description: "Enhance coding skills through rigorous practice and problem-solving challenges.", gradientClass: "card1" },
    { icon: ClipboardList, title: "Interview Preparation", description: "Utilize AI-driven mock interviews to sharpen your skills and excel in real assessments.", gradientClass: "card2" },
    { icon: FolderKanban, title: "Projects", description: "Showcase your capabilities through a diverse range of practical projects. Visualize your work.", gradientClass: "card3" },
    { icon: BarChart3, title: "Skill Assessment", description: "Benchmark your expertise with a comprehensive array of evaluation questions.", gradientClass: "card4" }
  ];

  const handleNextClick = () => {
    setActiveCard((prev) => (prev + 1) % cards.length); // Move to the next card, wrap around if at the end
  };

  const handlePrevClick = () => {
    setActiveCard((prev) => (prev - 1 + cards.length) % cards.length); // Move to the previous card, wrap around if at the start
  };

  return (
    <div className="card-layout">
      <button onClick={handlePrevClick} className="arrow-button arrow-prev">{"<"}</button>
      <div className="card-container">
        {cards.map((card, index) => (
          <Card
            key={index}
            icon={card.icon}
            title={card.title}
            description={card.description}
            gradientClass={card.gradientClass}
            isActive={activeCard === index}
            onClick={() => setActiveCard(index)}
          />
        ))}
      </div>
      <button onClick={handleNextClick} className="arrow-button arrow-next">{">"}</button>
    </div>
  );
};

export default CardLayout;