

import React from "react";
const FormContext = React.createContext(undefined);

function FormProvider({ children, value }) {
  return (
    <FormContext.Provider value={value}>{children}</FormContext.Provider>
  );
}

function useFormContext() {
  const context = React.useContext(FormContext);
  if (context === undefined) {
    throw new Error("useFormContext must be used within a FormProvider");
  }
  return context;
}

export { FormProvider, useFormContext };