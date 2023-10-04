import { useState } from "react";
import CustomSelect from "../CustomSelect/CustomSelect";
import "./MainRight.css";

type CustomCountry = {
  country: string;
};

export default function MainRight() {
  const [selectedCountry, setSelectedCountry] = useState<CustomCountry | null>(
    null
  );
  const [countries, setCountries] = useState<CustomCountry[]>(loadCountries());

  function loadCountries() {
    const countries: CustomCountry[] = [
      {
        country: "France",
      },
      {
        country: "Espagne",
      },
      {
        country: "Allemagne",
      },
      {
        country: "Etats Unis",
      },
      {
        country: "Pologne",
      },
      {
        country: "Algérie",
      },
      {
        country: "Italie",
      },
    ];
    return countries;
  }

  return (
    <div>
      <div>
        <label>
          {selectedCountry === null
            ? "Choisir un pays"
            : selectedCountry.country}
        </label>
        {countries !== null && (
          <CustomSelect
            customPlaceholder="Search any country..."
            data={countries}
            dataFilteredKey={"country"}
            dataSelected={setSelectedCountry}
          />
        )}
      </div>
    </div>
  );
}
