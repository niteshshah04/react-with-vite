import { Treemap, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "BPCL 256(-5%)", size: 4000, fill: "#E2515C" },
  { name: "IOC 256(-5%)", size: 3000, fill: "#E69BA2" },
  { name: "BHEL 256(-5%)", size: 2000, fill: "#FCC5CA" },
  { name: "BEL 256(-5%)", size: 2000, fill: "#85EFAC" },
  { name: "WIPRO 256(-5%)", size: 2000, fill: "#CBCBCB" },
  { name: "INFOSYS 256(-5%)", size: 4000, fill: "#12C14C" },
  { name: "TCS 256(-5%)", size: 3000, fill: "#85EFAC" },
  { name: "RELIANCE 256(-5%)", size: 2000, fill: "#85EFAC" },
  { name: "VEDL 256(-5%)", size: 3000, fill: "#E2515C" },
  { name: "TATAMOTORS 256(-5%)", size: 2000, fill: "#E2515C" },
  { name: "ABB 256(-5%)", size: 2000, fill: "#FCC5CA" },
  { name: "DEL 256(-5%)", size: 2000, fill: "#12C14C" },
  { name: "PERSISTENT 256(-5%)", size: 2000, fill: "#FCC5CA" },
  { name: "JIOFIN 256(-5%)", size: 2000, fill: "#CBCBCB" },
  { name: "GPIL 256(-5%)", size: 2000, fill: "#12C14C" },
  { name: "NMDC 256(-5%)", size: 2000, fill: "#E2515C" },
  { name: "CIPLA 256(-5%)", size: 2000, fill: "#E2515C" },
  { name: "GAIL 256(-5%)", size: 2000, fill: "#E2515C" },
  { name: "ONGC 256(-5%)", size: 2000, fill: "#E2515C" },
  { name: "RECL 256(-5%)", size: 2000, fill: "#CBCBCB" },
  { name: "BPCL 256(-5%)", size: 4000, fill: "#E2515C" },
  { name: "IOC 256(-5%)", size: 3000, fill: "#E69BA2" },
  { name: "BHEL 256(-5%)", size: 2000, fill: "#FCC5CA" },
  { name: "BEL 256(-5%)", size: 2000, fill: "#85EFAC" },
  { name: "WIPRO 256(-5%)", size: 2000, fill: "#CBCBCB" },
  { name: "INFOSYS 256(-5%)", size: 4000, fill: "#12C14C" },
  { name: "TCS 256(-5%)", size: 3000, fill: "#85EFAC" },
  { name: "RELIANCE 256(-5%)", size: 2000, fill: "#85EFAC" },
  { name: "VEDL 256(-5%)", size: 4000, fill: "#E2515C" },
  { name: "TATAMOTORS 256(-5%)", size: 2000, fill: "#E2515C" },
  { name: "ABB 256(-5%)", size: 2000, fill: "#FCC5CA" },
  { name: "DEL 256(-5%)", size: 2000, fill: "#12C14C" },
  { name: "PERSISTENT 256(-5%)", size: 2000, fill: "#FCC5CA" },
  { name: "JIOFIN 256(-5%)", size: 2000, fill: "#CBCBCB" },
  { name: "GPIL 256(-5%)", size: 2000, fill: "#12C14C" },
  { name: "NMDC 256(-5%)", size: 2000, fill: "#E2515C" },
  { name: "CIPLA 256(-5%)", size: 2000, fill: "#E2515C" },
  { name: "GAIL 256(-5%)", size: 2000, fill: "#E2515C" },
  { name: "ONGC 256(-5%)", size: 2000, fill: "#E2515C" },
  { name: "RECL 256(-5%)", size: 3000, fill: "#CBCBCB" },
  { name: "BPCL 256(-5%)", size: 4000, fill: "#E2515C" },
  { name: "IOC 256(-5%)", size: 3000, fill: "#E69BA2" },
  { name: "BHEL 256(-5%)", size: 2000, fill: "#FCC5CA" },
  { name: "BEL 256(-5%)", size: 4000, fill: "#85EFAC" },
  { name: "WIPRO 256(-5%)", size: 2000, fill: "#CBCBCB" },
  { name: "INFOSYS 256(-5%)", size: 4000, fill: "#12C14C" },
  { name: "TCS 256(-5%)", size: 3000, fill: "#85EFAC" },
  { name: "RELIANCE 256(-5%)", size: 2000, fill: "#85EFAC" },
  { name: "VEDL 256(-5%)", size: 4000, fill: "#E2515C" },
  { name: "TATAMOTORS 256(-5%)", size: 2000, fill: "#E2515C" },
  { name: "ABB 256(-5%)", size: 2000, fill: "#FCC5CA" },
  { name: "DEL 256(-5%)", size: 2000, fill: "#12C14C" },
  { name: "PERSISTENT 256(-5%)", size: 2000, fill: "#FCC5CA" },
  { name: "JIOFIN 256(-5%)", size: 2000, fill: "#CBCBCB" },
  { name: "GPIL 256(-5%)", size: 2000, fill: "#12C14C" },
  { name: "NMDC 256(-5%)", size: 2000, fill: "#E2515C" },
  { name: "CIPLA 256(-5%)", size: 2000, fill: "#E2515C" },
  { name: "GAIL 256(-5%)", size: 2000, fill: "#E2515C" },
  { name: "ONGC 256(-5%)", size: 2000, fill: "#E2515C" },
  { name: "RECL 256(-5%)", size: 2000, fill: "#CBCBCB" },
  { name: "WIPRO 256(-5%)", size: 2000, fill: "#CBCBCB" },
  { name: "INFOSYS 256(-5%)", size: 4000, fill: "#12C14C" },
  { name: "TCS 256(-5%)", size: 3000, fill: "#85EFAC" },
  { name: "RELIANCE 256(-5%)", size: 2000, fill: "#85EFAC" },
  { name: "VEDL 256(-5%)", size: 4000, fill: "#E2515C" },
  { name: "TATAMOTORS 256(-5%)", size: 2000, fill: "#E2515C" },
  { name: "ABB 256(-5%)", size: 2000, fill: "#FCC5CA" },
  { name: "DEL 256(-5%)", size: 2000, fill: "#12C14C" },
  { name: "PERSISTENT 256(-5%)", size: 2000, fill: "#FCC5CA" },
  { name: "JIOFIN 256(-5%)", size: 2000, fill: "#CBCBCB" },
  { name: "GPIL 256(-5%)", size: 3000, fill: "#12C14C" },
  { name: "NMDC 256(-5%)", size: 3000, fill: "#E2515C" },
  { name: "CIPLA 256(-5%)", size: 3000, fill: "#E2515C" },
  { name: "GAIL 256(-5%)", size: 3000, fill: "#E2515C" },
  { name: "ONGC 256(-5%)", size: 3000, fill: "#E2515C" },
  { name: "RECL 256(-5%)", size: 3000, fill: "#CBCBCB" },
  
];

const CustomContent = (props: any) => {
  const { x, y, width, height } = props;
  const fillColor = props.fill; // Correct color assignment
  console.log('-----fillColor---------', fillColor)
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
        data={data}
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
