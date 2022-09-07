import Alert from "react-bootstrap/Alert";

// danger bootstrap alert to display when there are 0 book results

function WarningSign({ text }) {
  return <Alert variant="danger">{text}</Alert>;
}

export default WarningSign;
