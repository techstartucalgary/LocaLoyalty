import * as React from "react";
import Svg, { Ellipse, G, Path, Defs, ClipPath } from "react-native-svg";
const factor = 0.7;
const ExtraSmallStamp = (props: any) => (
	<Svg
		xmlns="http://www.w3.org/2000/svg"
		width={15}
		height={15}
		fill="none"
		viewBox="0 0 14 15"
		{...props}
	>
		<Ellipse cx={6.953} cy={7.5} fill="#EDEDED" rx={6.818} ry={6.9} />
		<Ellipse cx={6.953} cy={7.5} fill="#EDEDED" rx={6.818} ry={6.9} />
		<Ellipse cx={6.953} cy={7.5} fill="#000" rx={6.818} ry={6.9} />
		<G clipPath="url(#a)">
			<Path
				stroke="#fff"
				strokeLinecap="round"
				strokeWidth={2.188}
				d="M5.13 6.19c-.753.173-1.13.26-1.219.55-.09.292.167.596.68 1.203l.133.157c.146.172.219.259.251.365.033.107.022.222 0 .452l-.02.21c-.078.81-.116 1.215.118 1.395.234.18.587.016 1.291-.313l.183-.084c.2-.094.3-.14.406-.14.106 0 .206.046.407.14l.182.084c.704.329 1.057.493 1.29.313.235-.18.196-.585.119-1.395m.364-1.184c.513-.607.77-.91.68-1.202-.09-.292-.466-.378-1.219-.55l-.194-.045c-.214-.049-.32-.073-.407-.139-.085-.066-.14-.166-.25-.366l-.101-.182c-.388-.703-.581-1.055-.871-1.055-.29 0-.483.352-.871 1.055"
			/>
		</G>
		<Defs>
			<ClipPath id="a">
				<Path fill="#fff" d="M3.282 3.785h7.343v7.43H3.282z" />
			</ClipPath>
		</Defs>
	</Svg>
);
export default ExtraSmallStamp;
