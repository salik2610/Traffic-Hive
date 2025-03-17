import { useEffect, useRef } from 'react';
import './styles.css';

const colors = [
  '#ff6666', '#6666ff', '#66ff66', '#ffff66', 
  '#ff66ff', '#66ffff', '#ff9966', '#66ff99',
  '#ff4d94', '#4dffdb', '#db4dff', '#ffdb4d'
];

// Create an evenly distributed grid of positions
const createPositions = () => {
  const positions = [];
  const rows = 2;  // Reduced from 3
  const cols = 2;  // Reduced from 3
  
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const baseX = col * 45 + 15;  // Adjusted spacing and offset
      const baseY = row * 45 + 15;
      positions.push({
        baseX: baseX,
        baseY: baseY,
        x: baseX,
        y: baseY,
        size: 350 + Math.random() * 100,  // Made spheres slightly larger
        color: colors[Math.floor(Math.random() * colors.length)],
        blur: 100 + Math.random() * 30,
        breatheSpeed: 2 + Math.random() * 2,
        colorChangeSpeed: 3 + Math.random() * 3,
        offset: Math.random() * Math.PI * 2,
        vibrateOffset: Math.random() * Math.PI * 2,
        vibrateSpeed: 0.5 + Math.random() * 0.5
      });
    }
  }

  // Add just 2 extra spheres in strategic gaps
  const extraPositions = [
    { x: 30, y: 30 },    // Center
    { x: 70, y: 70 }     // Bottom right
  ];

  extraPositions.forEach(pos => {
    positions.push({
      baseX: pos.x,
      baseY: pos.y,
      x: pos.x,
      y: pos.y,
      size: 300 + Math.random() * 100,
      color: colors[Math.floor(Math.random() * colors.length)],
      blur: 100 + Math.random() * 30,
      breatheSpeed: 2 + Math.random() * 2,
      colorChangeSpeed: 3 + Math.random() * 3,
      offset: Math.random() * Math.PI * 2,
      vibrateOffset: Math.random() * Math.PI * 2,
      vibrateSpeed: 0.5 + Math.random() * 0.5
    });
  });

  return positions;
};

const AmbientSpheres = () => {
  const spheresRef = useRef(createPositions());
  const animationFrameRef = useRef();
  const timeRef = useRef(0);

  const updateSpheres = () => {
    timeRef.current += 0.01;
    const spheres = spheresRef.current;

    spheres.forEach((sphere) => {
      // Breathing animation
      const breatheFactor = Math.sin(timeRef.current * sphere.breatheSpeed + sphere.offset) * 0.15 + 1;
      sphere.currentSize = sphere.size * breatheFactor;

      // Vibrating motion
      const vibrateAmount = 3; // Maximum pixels to move
      sphere.x = sphere.baseX + Math.sin(timeRef.current * sphere.vibrateSpeed + sphere.vibrateOffset) * vibrateAmount;
      sphere.y = sphere.baseY + Math.cos(timeRef.current * sphere.vibrateSpeed + sphere.vibrateOffset * 1.5) * vibrateAmount;

      // Color change
      if (Math.random() < 0.001 * sphere.colorChangeSpeed) {
        const nextColorIndex = (colors.indexOf(sphere.color) + 1) % colors.length;
        sphere.color = colors[nextColorIndex];
      }
    });

    spheresRef.current = [...spheres];
    animationFrameRef.current = requestAnimationFrame(updateSpheres);
  };

  useEffect(() => {
    animationFrameRef.current = requestAnimationFrame(updateSpheres);
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <div className="ambient-spheres">
      {spheresRef.current.map((sphere, index) => (
        <div
          key={index}
          className="sphere"
          style={{
            '--size': `${sphere.currentSize || sphere.size}px`,
            '--color': sphere.color,
            '--x': `${sphere.x}%`,
            '--y': `${sphere.y}%`,
            '--blur': `${sphere.blur}px`,
          }}
        />
      ))}
    </div>
  );
};

export default AmbientSpheres; 