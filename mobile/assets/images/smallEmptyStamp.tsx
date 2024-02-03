import * as React from "react";
import Svg, { Circle } from "react-native-svg";
const SmallEmptyStamp = (props: any) => (
	<Svg width={44} height={42} fill="none" {...props}>
		<Circle cx={20.4435} cy={20.4435} r={20.4435} fill="#EDEDED" />
	</Svg>
);
export default SmallEmptyStamp;
