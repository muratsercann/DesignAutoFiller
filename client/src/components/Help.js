export default function Help() {
  const strongStyle = {
    color: "#1bb88b",
  };
  return (
    <article style={{ color: "var(--bs-gray-400)", fontWeight: "400" }}>
      <p>
        This app dublicates your design with data you import as xlsx, csv, json,
        txt files.
      </p>
      <p>
        <div>
          <strong style={strongStyle}>Step 1 :</strong>
        </div>{" "}
        Upload an image. (The allowed max size is 1024 KB.)
      </p>
      <p>
        <div>
          <strong style={strongStyle}>Step 2 :</strong>
        </div>{" "}
        Add text items to your design and customize them.
      </p>
      <p>
        <div>
          <strong style={strongStyle}>Step3 :</strong>
        </div>{" "}
        Import a datasource as an xlsx, csv, json, txt file for dublication.
        <p>Note: The file should have a header row.</p>
      </p>
      <p>
        <div>
          <strong style={strongStyle}>Step 4 :</strong>
        </div>{" "}
        Bind columns from your data source to the text items you added.
      </p>

      <p>
        <div>
          <strong style={strongStyle}>Step 5 :</strong>
        </div>{" "}
        Select the 'Print' from the menu in the left side and adjust size for
        design that will be dublicated using the data source and will be printed
        later.
      </p>

      <p>
        <div>
          <strong style={strongStyle}>Step 6 :</strong>
        </div>{" "}
        After adjusting the size, click 'Print' button and see your browser's
        print screen with the dublicated design.
      </p>
      <p>
        <div>
          <strong style={strongStyle}>Finally :</strong>
        </div>{" "}
        Congratulations! Now, you have dublicated design.
      </p>
    </article>
  );
}
