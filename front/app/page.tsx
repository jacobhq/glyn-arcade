"use client"
import { useState, useEffect } from 'react';
import { motion } from 'motion/react';

export default function Home() {
  const [lines, setLines] = useState([[""]]);

  useEffect(() => {
    const calculateLines = () => {
      const lineHeight = 100;
      const viewportHeight = window.innerHeight;
      const numberOfLines = Math.ceil(viewportHeight / lineHeight) * 2;

      const generatedLines = Array.from({ length: numberOfLines }, (_, lineIndex) => {
        const textCount = 20;
        return Array(textCount).fill('Glyn Robotics');
      });

      setLines(generatedLines);
    };

    // Calculate on mount and resize
    calculateLines();
    window.addEventListener('resize', calculateLines);
    return () => window.removeEventListener('resize', calculateLines);
  }, []);

  const createLineVariants = (lineIndex: number) => ({
    initial: { x: (lineIndex % 2 == 0 ? '0%': '50%'), opacity: 0 },
    animate: {
      x: [(lineIndex % 2 == 0 ? '0%': '50%'), (lineIndex % 2 == 0 ? '20%': '70%'), (lineIndex % 2 == 0 ? '80%': '130%'), (lineIndex % 2 == 0 ? '100%': '150%')],
      opacity: [0, 1, 1, 0],
      transition: {
        duration: 6,
        times: [0, 0.2, 0.8, 1],
        easing: "ease-in-out",
        repeat: 0
      }
    }
  });

  return (
    <div className="relative w-full h-screen overflow-hidden flex items-center justify-center">
      <div className="flex flex-col items-center justify-center space-y-8"> {/* Increased space between lines */}
        {lines.map((line, lineIndex) => (
          <motion.div
            key={lineIndex}
            className="flex space-x-16" // Increased spacing between text elements
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {line.map((text, textIndex) => (
              <motion.div
                key={textIndex}
                className={`text-6xl font-bold whitespace-nowrap ${((textIndex % 2 == 0 && lineIndex % 2 == 0) || (textIndex % 2 != 0 && lineIndex % 2 != 0)) && "text-neutral-400"}`}
                variants={createLineVariants(lineIndex)}
                initial="initial"
                animate="animate"
              >
                {text}
              </motion.div>
            ))}
          </motion.div>
        ))}
      </div>
    </div>
  );
};
