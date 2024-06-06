import PagePreview from "./PagePreview";
import { designs } from "../data";
export default function Design() {
  const previewWidth = 150;
  const previewHeight = 240;
  return (
    <>
      {designs.map((design) => {
        return (
          <>
            <div style={{ width: "auto", height: "auto" }} className="item">
              <PagePreview
                previewWidth={previewWidth}
                previewHeight={previewHeight}
                settings={design.pages[0]}
              />

              <div
              className="item-design-title">
                {design.title}
              </div>
            </div>
          </>
        );
      })}
    </>
  );
}
