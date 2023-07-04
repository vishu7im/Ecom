import React, { createContext, useContext, useEffect } from "react";
import Alert from "@mui/material/Alert";

export const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = React.useState(null);
  const [loder, setLoder] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlert(null);
  };

  useEffect(() => {
    setTimeout(() => {
      setAlert(null);
    }, 2500);
  }, [alert]);

  return (
    <AlertContext.Provider value={{ setAlert, setLoder, loder }}>
      {alert && (
        <div className="fixed inset-x-0 top-0 z-50 flex justify-center">
          <div className="mt-6">
            <Alert severity={alert.type} onClose={handleClose}>
              {alert.message}
            </Alert>
          </div>
        </div>
      )}
      {children}
    </AlertContext.Provider>
  );
};

export const AlertApi = () => {
  return useContext(AlertContext);
};
