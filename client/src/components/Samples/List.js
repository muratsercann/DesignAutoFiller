import PagePreview from "./PagePreview";
import * as utils from "../Edit/utils"

export default function List() {
  const data = JSON.parse(utils.getSettingsFromStorage());
  const importedData = utils.getImportedDataFromStorage();
  const tagFieldRelations = JSON.parse(localStorage.getItem("tagFieldRelation"));

  const width = 0;
  const height = 0;

  return (
    <div>
      <PagePreview scale={0.8} data={data} />
    </div>
  );
}
