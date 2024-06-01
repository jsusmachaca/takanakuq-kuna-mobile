import { StyleSheet, Image, View, StatusBar } from 'react-native';
import { Svg, Polygon, Line, Path, G } from 'react-native-svg';


const Bar = () => {
  return (
    <View style={
      {
        backgroundColor: 'white',
        height: 55,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 5
        },
        shadowOpacity: 1,
        shadowRadius: 6.65,
        elevation: 7,
      }}
    >
      <Svg
        width='30'
        height='30'
        viewBox='0 0 24 24'
        fill='#fff'
      >
        <Path
          d='M22 12.2039V13.725C22 17.6258 22 19.5763 20.8284 20.7881C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.7881C2 19.5763 2 17.6258 2 13.725V12.2039C2 9.91549 2 8.77128 2.5192 7.82274C3.0384 6.87421 3.98695 6.28551 5.88403 5.10813L7.88403 3.86687C9.88939 2.62229 10.8921 2 12 2C13.1079 2 14.1106 2.62229 16.116 3.86687L18.116 5.10812C20.0131 6.28551 20.9616 6.87421 21.4808 7.82274'
          strokeLinecap='round'
          strokeWidth='3'
          stroke='#1C274C'
          />
        <Path
          d='M15 18H9'
          strokeLinecap='round'
          strokeWidth='2'
          stroke='#1C274C'
        />
      </Svg>

      <Svg width="200" height="200"
        style={{
          marginTop: -40,
          transform: [{
            rotate: '90deg'
          }]
        }}
      >
        <Polygon 
          points={hexagonPoints}
          fill="orange"
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

      <Svg
        width='30'
        height='30'
        viewBox='0 0 24 24'
        fill='none'
      >
        <Path
          d='M15.7 4C18.87 4 21 6.98 21 9.76C21 15.39 12.16 20 12 20C11.84 20 3 15.39 3 9.76C3 6.98 5.13 4 8.3 4C10.12 4 11.31 4.91 12 5.71C12.69 4.91 13.88 4 15.7 4Z'
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth='3'
          stroke='#1C274C'
          />
      </Svg>
    </View>
  )
}