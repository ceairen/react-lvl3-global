import { useEffect, useState } from "react";
import "./CustomSelect.css";
import CustomSelectItem from "./CustomSelectItem";

type CustomSelectProps<T extends Object> = {
  customPlaceholder?: string;
  data: T[];
  dataFilteredKey: string;
  dataSelected: (obj: T) => void;
};

export default function CustomSelect<T extends Object>({
  customPlaceholder,
  data,
  dataFilteredKey,
  dataSelected,
}: CustomSelectProps<T>) {
  const [displayedData, setDisplayedData] = useState<string[] | null>(null);
  const [searchValue, setSearchValue] = useState<string>("");

  useEffect(() => {
    if (searchValue.length > 0) {
      setDisplayedData(
        data.reduce((p: string[], c) => {
          const value = c.hasOwnProperty(dataFilteredKey)
            ? JSON.parse(JSON.stringify(c))[dataFilteredKey]
            : null;
          if (value !== null) {
            if (value.toLowerCase().includes(searchValue.toLowerCase()))
              p.push(value);
          }
          return p;
        }, [])
      );
    } else {
      setDisplayedData(null);
    }
  }, [searchValue]);

  function handleValueChange(value: string) {
    const selectedData = data.find(
      (d) => JSON.parse(JSON.stringify(d))[dataFilteredKey] === value
    );
    if (selectedData) {
      setSearchValue(value);
      dataSelected(selectedData);
      setTimeout(() => {
        setDisplayedData(null);
      }, 20);
    }
  }

  return (
    <div className="SearchSelect">
      <input
        type="text"
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder={customPlaceholder ? customPlaceholder : "Search any data..."}
        value={searchValue}
      />
      {displayedData &&
        (displayedData.length === 0 ? (
          <ul className="NoResults">
            <li>No results</li>
          </ul>
        ) : (
          <ul>
            {displayedData.map((data, dataIndex) => {
              return (
                <CustomSelectItem
                  key={dataIndex}
                  searchValue={searchValue}
                  value={data}
                  valueChange={handleValueChange}
                />
              );
            })}
          </ul>
        ))}
    </div>
  );
}
