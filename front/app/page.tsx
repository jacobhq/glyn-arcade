"use client";
import { motion } from "motion/react";

const sponsors = [
  ['Sponsor 1', 'Sponsor 2', 'Sponsor 3'],
  ['Sponsor 4', 'Sponsor 5', 'Sponsor 6'],
  ['Sponsor 7', 'Sponsor 8', 'Sponsor 9'],
  ['Sponsor 10', 'Sponsor 11', 'Sponsor 12'],
];

export default function Home() {
  return (
    <div>
      <div className="overflow-hidden w-full">
        {sponsors.map((line, index) => (
          <motion.div
            key={index}
            className="flex space-x-4"
            initial={{ x: '0%', opacity: 0 }} // Start from off-screen to the left with opacity 0
            animate={{ x: '50%', opacity: 1 }} // Move to the visible area (left edge) with full opacity
            exit={{ x: '100%', opacity: 0 }} // Move off-screen to the right with opacity 0
            transition={{
              x: {
                duration: 10, // Total duration of the x-axis animation
                ease: 'easeInOut',
                keyframes: [
                  '0%',
                  '20%',
                  '80%',
                  '100%',
                ],
              },
              opacity: {
                duration: 10, // Duration for the fade-in/fade-out effect (same as x-axis)
                ease: 'easeInOut',
                keyframes: [0, 1, 1, 0], // Fade in, hold, then fade out
              },
              delay: index * 0.5, // Staggered start for each line
            }}
            style={{
              transform: `translateY(${index * 20}px)`, // Vertical offset for each line
            }}
          >
            {line.map((sponsor, i) => (
              <div key={i} className="flex-shrink-0 text-lg font-semibold text-black">
                {sponsor}
              </div>
            ))}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
