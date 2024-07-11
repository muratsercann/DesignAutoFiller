import { FaImages } from "react-icons/fa6";
import CreateNew from "./CreateNew";
import { useNavigate } from "react-router-dom";
export default function Header({ page, setPage, setImageDetails }) {
  const navigate = useNavigate();
  return (
    <div className="header">
      <div className="d-flex">
        <FaImages size={24} />
      </div>
      <div>
        <h2>Designify</h2>
      </div>
      <div className="header-right">
        <CreateNew
          page={page}
          setPage={setPage}
          setImageDetails={setImageDetails}
          onSuccess={() => {
            navigate("/");
          }}
        />
      </div>
    </div>
  );
}
