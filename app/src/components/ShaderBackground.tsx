import { ShaderGradientCanvas, ShaderGradient } from '@shadergradient/react';

interface ShaderBackgroundProps {
  className?: string;
  opacity?: number;
}

export const ShaderBackground = ({ className = "", opacity = 1 }: ShaderBackgroundProps) => {
  return (
    <div className={`absolute inset-0 ${className}`} style={{ opacity }}>
      <ShaderGradientCanvas
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
      >
        <ShaderGradient
          // Motion settings
          animate="on"
          uSpeed={0.2}
          range="enabled"
          rangeStart={0}
          rangeEnd={40}

          // Colors
          color1="#F3F3F5"
          color2="#1A1B1A"
          color3="#D6D6DE"

          // Background colors
          bgColor1="#737373"
          bgColor2="#F3F3F5"

          // Visual settings
          grain="on"
          brightness={0.5}

          // View settings
          cDistance={3.6}
          cAzimuthAngle={180}
          cPolarAngle={90}
          fov={10}

          // Object position
          positionX={-1.4}
          positionY={0}
          positionZ={0}

          // Object rotation
          rotationX={0}
          rotationY={10}
          rotationZ={50}

          // Type
          type="plane"

          // Other defaults
          uDensity={1.3}
          uFrequency={5.5}
          uStrength={4}
          uAmplitude={0}
        />
      </ShaderGradientCanvas>
    </div>
  );
};

export default ShaderBackground;
