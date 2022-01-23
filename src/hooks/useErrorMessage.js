import { useState } from "react";
export default function useErrorMessage(form) {
  const [errMessages, setErrMessages] = useState(form);

  const apiFirstErrMessage = errMessages[Object.keys(errMessages)[0]][0];

  const firstErrorMessage = apiFirstErrMessage && <span className="py-1 block bg-red-800 text-white px-2 mt-1 text-sm rounded-md font-semibold tracking-wider">{apiFirstErrMessage}</span>;

  function handleErrorMessages(name) {
    if (typeof name === "string") {
      setErrMessages((prevMessages) => {
        return {
          ...prevMessages,
          [name]: "",
        };
      });
      return;
    }

    setErrMessages(name);
  }

  return [firstErrorMessage, handleErrorMessages];
}
