import { BsCollection, BsDatabase, BsEye } from "react-icons/bs";
import { SlPrinter } from "react-icons/sl";
import { MdOutlineHelp } from "react-icons/md";
export default function SideMenu({ setActivePage, activePage }) {
  const iconSize = 24;

  const menuItems = [
    {
      title: "Editor",
      navigate: "edit",
      icon: <BsCollection size={iconSize} />,
    },
    {
      title: "Data Source",
      navigate: "data",
      icon: <BsDatabase size={iconSize} />,
    },
    { title: "Preview", navigate: "preview", icon: <BsEye size={iconSize} /> },
    {
      title: "Print",
      navigate: "print",
      icon: <SlPrinter size={iconSize} />,
    },
    {
      title: "Help",
      navigate: "help",
      icon: <MdOutlineHelp size={iconSize} />,
    },
  ];

  return (
    <div className="side-menu">
      {menuItems.map((item, index) => (
        <div
          key={index}
          className={`menu-item ${
            activePage === item.navigate ? "selected" : ""
          }`}
          title={item.title}
          onClick={() => {
            setActivePage(item.navigate);
          }}
        >
          <div className="icon">{item.icon}</div>
          <div className="label">{item.title}</div>
        </div>
      ))}
    </div>
  );
}
