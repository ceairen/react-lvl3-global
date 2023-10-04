import parse from "html-react-parser";

type CustomSelectItemProps = {
  searchValue: string;
  value: string;
  valueChange: (changedValue: string) => void;
};

export default function CustomSelectItem({
  value,
  searchValue,
  valueChange,
}: CustomSelectItemProps) {
  function stylize() {
    const searchIndex = value.toLowerCase().indexOf(searchValue.toLowerCase());
    const newValue =
      value.substring(0, searchIndex) +
      "<span>" +
      value.substring(searchIndex, searchIndex + searchValue.length) +
      "</span>" +
      value.substring(searchIndex + searchValue.length);
    return <>{parse(newValue)}</>;
  }
  return (
    <li onClick={() => valueChange(value)} className="SearchSelectListItem">
      {stylize()}
    </li>
  );
}
