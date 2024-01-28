import * as React from "react";
import Svg, { Circle, Path } from "react-native-svg";
const SvgComponent = ({ color, factor, ...props }: { color: string; factor: number; props?: any }) => {

	return (
		<Svg width={48*factor} height={48*factor} fill="none" {...props}>
			<Circle cx={24*factor} cy={24*factor} r={24*factor} fill={color} />
			<Path
				stroke="#fff"
				strokeLinecap="round"
				strokeWidth={1.25*factor}
				scale={1.5*factor}
				d="M11.033 12.477c-2.05.464-3.075.695-3.319 1.48-.243.783.455 1.6 1.853 3.235l.361.422c.397.464.596.697.685.983.09.288.06.598 0 1.217l-.056.564c-.21 2.181-.316 3.271.322 3.755.639.485 1.598.043 3.517-.84l.497-.229c.545-.252.818-.377 1.107-.377.29 0 .562.125 1.108.377l.495.229c1.92.883 2.88 1.325 3.517.841.64-.485.533-1.575.322-3.756m.991-3.186c1.398-1.634 2.096-2.451 1.853-3.235-.244-.785-1.27-1.017-3.32-1.48l-.53-.12c-.582-.132-.873-.198-1.107-.375-.233-.178-.383-.447-.683-.985l-.274-.49C17.317 8.613 16.79 7.667 16 7.667c-.79 0-1.317.946-2.373 2.84"
			/>
		</Svg>
	);
};
export default SvgComponent;
