import React from "react";
import ELXRow from "./../Row/ELXRow";
import useStyle from "./ELXAngleInput.styles";

const AngleInput = (props) => {
  const classes = useStyle();
  return (
    <ELXRow
      className={classes.container}
      style={{
        width: props.size,
        height: props.size,
        borderRadius: props.size / 2,
      }}
    >
      <ELXRow
        className={classes.diameter}
        style={{
          width: props.size,
          transform: `rotate(-${props.angle}deg)`,
        }}
      >
        <ELXRow
          className={classes.inVisibleLine}
          style={{ width: props.size / 2 }}
        ></ELXRow>
        <ELXRow
          className={classes.visibleLine}
          style={{ width: props.size / 2 }}
        ></ELXRow>
      </ELXRow>
    </ELXRow>
  );
}; //........................
AngleInput.defaultProps = {
  size: 50,
  angle: 0,
};

const areEqual = (prevProps, nextProps) => {
  return prevProps.size == nextProps.size && prevProps.angle == nextProps.angle;
};
export default React.memo(AngleInput, areEqual);
