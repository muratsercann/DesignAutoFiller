import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

export default function HorizontalAlignment({ value, onChange }) {
  const handleChanges = (e) => {
    onChange(e);
  };

  const focusedButton = "bg-secondary text-white";

  return (
    <>
      <InputGroup className="mb-3">
        <Form.Control
          className={value === "Left" && focusedButton}
          type="button"
          onClick={handleChanges}
          value="Left"
        />

        <Form.Control
          className={value === "Center" && focusedButton}
          type="button"
          onClick={handleChanges}
          value="Center"
        />

        <Form.Control
          className={value === "Right" && focusedButton}
          type="button"
          onClick={handleChanges}
          value="Right"
        />
      </InputGroup>
    </>
  );
}
