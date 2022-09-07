import Alert from 'react-bootstrap/Alert';

function WarningSign({text}) {
  return (
        <Alert variant="danger">
          {text}
        </Alert>
  );
}

export default WarningSign;