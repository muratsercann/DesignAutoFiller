import PagePreview from "./PagePreview";
import { designs } from "../../data";
export default function Design() {
  return (
    <div className="savings">
      {designs.map((design) => {
        return (
          <div key={design.id} className="item-container">
            <PagePreview scale={0.8} settings={design.pages[0]} />
            <div className="title">{design.title}</div>
          </div>
        );
      })}
    </div>
  );
}
