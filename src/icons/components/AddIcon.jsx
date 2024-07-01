import React from 'react';
import { StyleSheet, Image, View, StatusBar } from 'react-native';
import { Svg, Polygon, Line, Defs, RadialGradient, Stop } from 'react-native-svg';

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
  const hexagonPoints = generateHexagonPoints(75, 75, 30)
  return (
      <Svg width="150" height="150"
        style={{
          marginTop: -17,
          padding: 0,
          transform: [{
            rotate: '90deg'
          }]
        }}
      >
        <Defs>
          <RadialGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="100%" stopColor="#FF5B13" stopOpacity="1" />
            <Stop offset="0%" stopColor="#FF8F00" stopOpacity="1" />
          </RadialGradient>
        </Defs>
        <Polygon 
          points={hexagonPoints}
          fill="url(#grad)"
          strokeWidth="1"
        />
        <Line
          x1="60"
          y1="75"
          x2="90"
          y2="75"
          stroke="white"
          strokeWidth="3"
        />
        <Line
          x1="75"
          y1="60"
          x2="75"
          y2="90"
          stroke="white"
          strokeWidth="3"
        />
      </Svg>
  )
}