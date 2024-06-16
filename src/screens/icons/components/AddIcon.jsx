import React from 'react';
import { StyleSheet, Image, View, StatusBar } from 'react-native';
import { Svg, Polygon, Line, Path, G } from 'react-native-svg';

const generateHexagonPoints = (centerX, centerY, radius) => {
  const points = []
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 3) * i
    const x = centerX + radius * Math.cos(angle)
    const y = centerY + radius * Math.sin(angle)
    points.push(`${x},${y}`)
  }
  return points.join(' ')
}

export const AddIcon = () => {
  const hexagonPoints = generateHexagonPoints(100, 100, 35)
  return (
      <Svg width="200" height="200"
        style={{
          marginTop: -40,
          padding: 0,
          transform: [{
            rotate: '90deg'
          }]
        }}
      >
        <Polygon 
          points={hexagonPoints}
          fill="#FF8F00"
          strokeWidth="1"
        />
        <Line
          x1="85"
          y1="100"
          x2="115"
          y2="100"
          stroke="white"
          strokeWidth="4"
        />
        <Line
          x1="100"
          y1="85"
          x2="100"
          y2="115"
          stroke="white"
          strokeWidth="4"
        />
      </Svg>
  )
}