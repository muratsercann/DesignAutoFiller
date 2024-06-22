import "./style.css";
export default function TextColMatcher({}) {
  const columns = ["col1", "col2", "col3"];
  const texts = ["Murat", "sercan", "54165695"];
  let mappings = texts.map((text)=> {
    return {[text] : ""};
  });

  console.log(mappings);
  return (
    <div className="matcher">
      <div className="container">
        {texts.map((text) => (
          <div className="row mb-3">
            <div className="col-5">{text}</div>
            <div className="col-1">=</div>
            <div className="col">
              <select>
                {columns.map((col) => (
                  <option>{col}</option>
                ))}
              </select>
            </div>
          </div>
        ))}

        {/* <div className="row mb-3">
          <div className="col-5">Text_1</div>
          <div className="col-1">=</div>
          <div className="col">
            <select>
              <option>Col1</option>
              <option>Col2</option>
              <option>Col3</option>
            </select>
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-5">Name Surname</div>
          <div className="col-1">=</div>
          <div className="col">
            <select>
              <option>Col1</option>
              <option>Col2</option>
              <option>Col3</option>
            </select>
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-5">Address</div>
          <div className="col-1">=</div>
          <div className="col">
            <select>
              <option>Col1</option>
              <option>Col2</option>
              <option>Col3</option>
            </select>
          </div>
        </div> */}
      </div>
    </div>
  );
}
