import * as React from "react"
import Svg, { Circle } from "react-native-svg"
const EmptyStamp = (props: any) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={48}
    height={48}
    fill="none"
    {...props}
  >
    <Circle cx={24} cy={24} r={24} fill="#EDEDED" />
  </Svg>
)
export default EmptyStamp
