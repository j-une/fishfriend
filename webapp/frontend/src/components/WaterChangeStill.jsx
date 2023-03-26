import "../styles/WaterChange.css";

function WaterChangeStill(props) {
  return <div className={props.full ? "tankFull" : "tankEmpty"}></div>;
}

export default WaterChangeStill;
