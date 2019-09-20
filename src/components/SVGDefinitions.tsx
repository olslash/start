import * as React from 'react';
import screenDoorOverlay from '../../resources/selected-overlay-screen-40.svg';

const SVGDefinitions = () => (
  <svg width="0" height="0">
    <defs>
      <filter id="screendoor" width="40px" height="40px">
        <feImage
          result="screendoor-overlay"
          href={screenDoorOverlay}
          width="40px"
          height="40px"
        />
        <feTile result="screendoor-tiled" in="screendoor-overlay" />

        <feFlood floodColor="#0000AA" floodOpacity="0.6" result="flood" />

        <feBlend
          result="screened"
          in="SourceGraphic"
          in2="screendoor-tiled"
          mode="darken"
        />
        <feBlend in="flood" in2="screened" mode="lighten" />
      </filter>
    </defs>
  </svg>
);

export default SVGDefinitions;
