import { Link } from "react-router-dom";

function Home() {
  return (
    <div class="flex h-screen">
      <div class="m-auto">
        <Link to="/demo1">
          <div className="btn">Demo 1</div>
        </Link>
        <Link to="/demo2">
          <div className="btn">Demo 2</div>
        </Link>
      </div>
    </div>
  );
}

export default Home;
