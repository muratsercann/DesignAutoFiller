import PagePreview from "./PagePreview";


export default function List() {
  const data = JSON.parse(localStorage.getItem("userData"));
  const importedData = JSON.parse(localStorage.getItem("importedData"));
  const tagFieldRelations = JSON.parse(localStorage.getItem("tagFieldRelation"));

  const width = 0;
  const height = 0;

  return (
    <div>
      <PagePreview scale={0.8} data={data} />
    </div>
  );
}
