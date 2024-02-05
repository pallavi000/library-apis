import { BrowserRouter as Router } from "react-router-dom";

//routes
import Navigation from "./routes/Navigation";

//component
import ScrollToTop from "./component/ScrollToTop";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Navigation />
    </Router>
  );
}

export default App;
