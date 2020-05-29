import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  rootClass: {
    width: "130px",
    height: "27px",
    paddingLeft: "7px !important",
    paddingRight: "3px !important",
    backgroundColor: "#FFFFFF",
    border: "1px solid #E2E2E3",
    borderRadius: "3px",
    maxHeight: "25px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    color: "red !important",
  },

  resize: {
    fontSize: "10px !important",
    fontFamily: "Noto Sans",
    color: "#666666 !important",
  },
  upDownIconContainer: {
    display: "flex",
    flexDirection: "column",
  },
  upIcon: {
    color: "#666666",
    fontSize: "18px",
    cursor: "pointer",
  },
  downIcon: {
    color: "#666666",
    fontSize: "18px",
    marginTop: "-7px",
    cursor: "pointer",
  },
}));

export default useStyles;
