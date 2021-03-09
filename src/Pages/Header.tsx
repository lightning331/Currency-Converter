import React, {useState} from 'react';
import { Link } from "react-router-dom";

function Header() {
  const [index, setIndex] = useState(0)
  return (
    <div className="header">
        <div className="tabmenu">
            <ul>
                <li style={{backgroundColor: index === 0 ? "#15255E" : "transparent"}}>
                    <Link to="/" onClick={() => setIndex(0)}>CURRENCY CONVERTER</Link>
                </li>
                <li style={{backgroundColor: index === 1 ? "#15255E" : "transparent"}}>
                    <Link to="/rates" onClick={() => setIndex(1)}>URRENT EXCHANGE RATES</Link>
                </li>
            </ul>
        </div>
    </div>
  );
}
export default Header;