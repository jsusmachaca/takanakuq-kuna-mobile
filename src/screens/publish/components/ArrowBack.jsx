import React from "react";
import { Svg, Path } from "react-native-svg";
import { View, TouchableOpacity } from "react-native";

export const ArrowBack = (props) => {
  return (
    <View
          style={{
            width: 50,
            marginLeft: 10,
          }}
        >
          <TouchableOpacity onPress={() => props.onPress()}>
            <Svg
              viewBox="0 0 24 24"
              fill='none'
              style={{
                padding: 0,
                margin: 0,
                shadowOffset: {
                  width: 6,
                  height: 6
                },
                shadowOpacity: 0.5,
                elevation: 5,
              }}
              >
              <Path
                d="M6.3508 12.7499L11.2096 17.4615L10.1654 18.5383L3.42264 11.9999L10.1654 5.46148L11.2096 6.53833L6.3508 11.2499L21 11.2499L21 12.7499L6.3508 12.7499Z"
                stroke='#FF8F00'
                strokeWidth='1.5'
                fillRule="evenodd"
                clipRule="evenodd"
                />
            </Svg>
          </TouchableOpacity>
        </View>
  )
}