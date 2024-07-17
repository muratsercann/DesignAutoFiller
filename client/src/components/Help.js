export default function Help() {
  return (
    <article style={{ color: "var(--bs-gray-400)", fontWeight: "400" }}>
      <p>
        This app dublicates your design with data you import as xlsx, csv, json,
        txt files.
      </p>
      <p>
        <strong>Step 1 :</strong> Upload an image. (The allowed max size is 1024
        KB.)
      </p>
      <p>
        <strong>Step 2 :</strong> Add text items to your design and customize
        them.
      </p>
      <p>
        <strong>Step 3 :</strong> Import a datasource as an xlsx, csv, json, txt
        file for dublication.
        <p>Note: The file should have a header row.</p>
      </p>
      <p>
        <strong>Step 4 :</strong> Bind columns from your data source to the text
        items you added.
      </p>

      <p>
        <strong>Step 5 :</strong> Select the 'Print' from the menu in the left
        side and adjust size for design that will be dublicated using the data
        source and will be printed later.
      </p>

      <p>
        <strong>Step 6 :</strong> After adjusting the size, click 'Print' button
        and see your browser's print screen with the dublicated design.
      </p>
      <p>
        <strong>Finally :</strong> Congratulations! Now, you have dublicated
        design.
      </p>
    </article>
  );
}
