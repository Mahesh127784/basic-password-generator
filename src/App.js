import { useCallback, useEffect, useState, useRef } from "react";
import "./App.css";

function App() {
  const ref = useRef(null);
  const [slider, setSlider] = useState(8);
  const [num, setNum] = useState(false);
  const [special, setSpecial] = useState(false);
  const [password, setPassword] = useState("");

  const PasswordGenerator = useCallback(() => {
    let ans = "";
    let passcode = "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm";

    if (num) passcode += "1234567890";
    if (special) passcode += "!@#$%^&*/|?";

    for (let i = 1; i <= slider; i++) {
      const finder = Math.floor(Math.random() * passcode.length + 1);
      // console.log(finder);
      let an = passcode.charAt(finder);
      ans += an;
    }
    setPassword(ans);
  }, [slider, num, special, password]);

  useEffect(() => {
    // console.log(ref);
    ref.current.style.backgroundColor = "red";
    PasswordGenerator();
  }, [num, special, slider]);
  return (
    <div
      className="App"
      style={{
        margin: "100px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <h1>Password Generator</h1>
      <div
        style={{
          backgroundColor: "white",
          color: "black",
          width: "400px",
          height: "35px",
          borderRadius: "12px",
          fontSize: "22px",
          marginBottom: "15px",
          display: "inline",
        }}
      >
        {password}
        <button
          onClick={() => {
            navigator.clipboard.writeText(password);
          }}
          style={{
            backgroundColor: "yellowgreen",
            color: "black",
            borderRadius: "12px",
            fontSize: "18px",
            display: "inline",
            position: "absolute",
            margin: "4px 98px",
          }}
        >
          Copy
        </button>
      </div>
      <div>
        <div style={{ display: "inline " }}>
          <input
            id="slider"
            type="range"
            min="6"
            max="20"
            value={slider}
            onChange={(e) => setSlider(e.target.value)}
          />
          <label htmlFor="slider">Length: {slider}</label>
        </div>

        <div style={{ display: "inline", margin: "0 10px" }}>
          <input
            id="slider"
            type="checkBox"
            onChange={(e) => {
              setNum((prev) => !prev);
            }}
          />
          <label>Numbers</label>
        </div>

        <div ref={ref} style={{ display: "inline" }}>
          <input
            type="checkBox"
            onChange={(e) => {
              setSpecial((prev) => !prev);
            }}
          />
          <label>SpecialChars</label>
        </div>
      </div>
    </div>
  );
}

export default App;
