import { Treemap, Tooltip, ResponsiveContainer } from "recharts";
import HeatMapdata from '../Mock/getHeatMapData.json'

const CustomContent = (props: any) => {
  const { x, y, width, height } = props;
  const fillColor = props.fill; // Correct color assignment
//   console.log('-----fillColor---------', fillColor)
  return (
    <g>
      <rect x={x} y={y} width={width} height={height} fill={fillColor} stroke="white" />
      {width > 30 && height > 20 && ( // Only show text if box is big enough
        <text
          x={x + width / 2}
          y={y + height / 2}
          textAnchor="middle"
          dominantBaseline="middle"
        //   fill="white"
          fontSize={12}
        >
          {props.name}
        </text>
      )}
    </g>
  );
};

// Custom Tooltip Component
const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            color: "white",
            padding: "8px",
            borderRadius: "5px",
            fontSize: "14px",
          }}
        >
          <strong>{payload[0].payload.name}</strong>
        </div>
      );
    }
    return null;
  };

const HeatMap = () => {
  return (
    <ResponsiveContainer width="100%" height={700}>
      <Treemap
        data={HeatMapdata}
        dataKey="size"
        stroke="black"
        content={<CustomContent />}
      >
        <Tooltip content={<CustomTooltip />} />
      </Treemap>
    </ResponsiveContainer>
  );
};

export default HeatMap;
