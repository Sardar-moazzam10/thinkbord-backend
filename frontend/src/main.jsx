import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { ReactQueryDevtoolsPanel } from "@tanstack/react-query-devtools";

function MainApp() {
  // const [isOpen, setIsOpen] = useState(false);

  return (
    <StrictMode>
      <BrowserRouter>
        {/* <QueryClientProvider client={queryClient}> */}
        <App />
        {/* DevTools Toggle Button */}
        {/* <div className="fixed z-50 bottom-4 left-4"> */}
        {/* <button
              onClick={() => setIsOpen(!isOpen)}
              className="btn btn-sm btn-outline btn-primary"
            > */}
        {/* {isOpen ? "Close Devtools" : "Open Devtools"} */}
        {/* </button> */}
        {/* </div> */}

        {/* DevTools Panel */}
        {/* {isOpen && (
            <div className="fixed bottom-0 left-0 w-full h-[300px] z-40 bg-white border-t">
              <ReactQueryDevtoolsPanel onClose={() => setIsOpen(false)} />
            </div>
          )}
        </QueryClientProvider> */}
      </BrowserRouter>
    </StrictMode>
  );
}
createRoot(document.getElementById("root")).render(<MainApp />);
