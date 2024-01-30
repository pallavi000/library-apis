import { BrowserRouter as Router } from "react-router-dom";
import Navigation from "./routes/Navigation";
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
