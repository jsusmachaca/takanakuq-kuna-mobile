import { Path, Svg, G, Circle, Line, Rect } from "react-native-svg"


export const CharIcon = ({ color }) => {
  return (
    <Svg viewBox="0 0 24 24" width='29' height='29' 
      strokeWidth='2'         
      fill={color}
      stroke={color === "#151515" ? "#151515" : '#3E3E3E'}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Rect 
        x="3" y="11" rx="2" width="18" height="10"
      />
      <Circle
        cx="12" cy="5" r="2"
      />
      <Path 
        d="M12 7v4" 
      />
      <Line
        x1="8" y1="16" x2="8" y2="16" stroke={color === "#151515" ? "#fff" : '#3E3E3E'}
      />
      <Line 
        x1="16" y1="16" x2="16" y2="16" stroke={color === "#151515" ? "#fff" : '#3E3E3E'}
      />
    </Svg>
  )
}