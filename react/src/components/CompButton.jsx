import "./CompButton.css";
function CompButton(props) {
  return (
    <button className={`${props.className}`} onClick={() => props.onClick(props.keyValue)}>
      {props.keyValue}
    </button>
  );
}
export default CompButton;
