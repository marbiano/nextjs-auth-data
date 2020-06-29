import React, { useState } from "react";
import { useForm } from "react-hook-form";
import InputField from "./InputField";
import SearchButton from "./SearchButton";
import Calendar from "./Calendar";
import SelectSocialPlatform from "./SelectSocialPlatform";
import axios from "axios";

const defaultValues = {
  startDate: "",
  endDate: "",
  inputField: "",
  platformToSearch: ""
};

const SearchBar = () => {
  const [searchData, setSearchData] = useState({
    startDate: "",
    endDate: "",
    inputField: "",
    platformToSearch: ""
  });

  const [inputField, setInputField] = useState("");
  const { handleSubmit, register, reset } = useForm({ defaultValues });
  const [selectedStartDate, setSelectedStartDate] = useState(
    new Date("2014-08-18T21:11:54")
  );
  const [selectedEndDate, setSelectedEndDate] = useState(new Date());

  const handleInputField = event => {
    console.log("input event :", event.target.value);
    setInputField(event.target.value);
    console.log("input inputField :", inputField);
    //setSearchData(...searchData.inputField, inputField);
  };

  /*dropdown for social platforms*/
  const [query, setQuery] = useState([]);
  const [expanded, setExpanded] = useState(false);
  // const myRef = useRef(null);

  const showPlatformOptions = () => {
    if (!expanded) {
      setExpanded(true);
    } else {
      setExpanded(false);
    }
  };

  const handlePlatformQueryChange = event => {
    if (event.target.checked && !query.includes(event.target.value)) {
      setQuery([...query, event.target.value]);
    } else if (!event.target.checked && query.includes(event.target.value)) {
      setQuery(query.filter(q => q !== event.target.value));
    }

    setSearchData({ ...searchData.platformToSearch, query });
  };

  const handleStartDateChange = date => {
    setSelectedStartDate(date._d);
    setSearchData([...searchData.startDate, selectedStartDate]);
    console.log("Seclectd start date:", searchData.startDate);
  };
  const handleEndDateChange = date => {
    //console.log("Selected end date:", date)
    setSelectedEndDate(date._d);
    setSearchData(...searchData.endDate, selectedEndDate);
  };

  const onSubmit = data => {
    // The data that is returned from this call should be updated in the context api/store,
    // so the new information can be updated and displayed.
    //updated to store all the slected items from the form

    useEffect(() => {
      const fetchData = async () => {
        const top_post = await axios(
          `https://run.mocky.io/v3/919c5624-d2e3-49e5-9e36-0b97bbd970f5`
        );
      };
      fetchData();
    }, []);

    // console.log("Collected Data:", searchData);
    // console.log("searchData:", searchData);
    // alert(JSON.stringify(data, null, 2));
    // reset(defaultValues);
  };

  return (
    <div class="mt-8 border rounded shadow-sm">
      <form onSubmit={handleSubmit(data => onSubmit(data))}>
        <div className="flex items-stretch divide-x divide-gray-400">
          <SelectSocialPlatform
            query={query}
            expanded={expanded}
            onClick={showPlatformOptions}
            onChange={handlePlatformQueryChange}
          />
          <Calendar
            name="StartDate"
            label="Start Date"
            value={selectedStartDate}
            onChange={handleStartDateChange}
          />
          <Calendar
            name="EndDate"
            label="End Date"
            value={selectedEndDate}
            onChange={handleEndDateChange}
          />
          <div class="w-1/2 flex items-center">
            <InputField
              name="inputField"
              placeholder="Search by keywords, #hashtags, or @socialmediahandles"
              refs={register}
              onClick={handleInputField}
            />
            <SearchButton
              text="Search"
              onClick={handleSubmit(onSubmit)}
              type="submit"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
