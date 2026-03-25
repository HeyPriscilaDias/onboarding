import { jsx as _jsx } from "react/jsx-runtime";
import * as React from 'react'; // We've added the optional 'color' prop to this interface for type safety.
const SvgCircleDashed = React.forwardRef(({ size = 24, color = 'currentColor', ...props }, ref) => React.cloneElement(_jsx("svg", { xmlns: "http://www.w3.org/2000/svg", width: "1em", height: "1em", fill: "none", viewBox: "0 0 24 24", ...props, children: _jsx("path", { stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 1.5, d: "M9.75 3.28a8.95 8.95 0 0 1 4.5 0M3.33 9.59a8.96 8.96 0 0 1 2.25-3.9M5.58 18.31a8.96 8.96 0 0 1-2.25-3.9M14.25 20.72a8.95 8.95 0 0 1-4.5 0M20.67 14.41a8.96 8.96 0 0 1-2.25 3.9M18.42 5.69a8.96 8.96 0 0 1 2.25 3.9" }) }), {
    ...props,
    ref,
    width: size,
    height: size,
    style: {
        ...props.style,
        color: color
    }
}));
SvgCircleDashed.displayName = "SvgCircleDashed";
export default SvgCircleDashed;
