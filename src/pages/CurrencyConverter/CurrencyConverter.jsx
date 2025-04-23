import { useState, useEffect } from "react";
import axios from "axios";
import "./CurrencyConverter.css" ;
const CurrencyConverter = () => {
  const [amount1, setAmount1] = useState(1);
  const [amount2, setAmount2] = useState(0);
  const [currency1, setCurrency1] = useState("TND");
  const [currency2, setCurrency2] = useState("EUR");
  const [rates, setRates] = useState({});

  const API_KEY = import.meta.env.VITE_EXCHANGE_RATE_API_KEY;

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await axios.get(
          `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${currency1}`
        );
        setRates(response.data.conversion_rates);
      } catch (error) {
        console.error("Error fetching exchange rates:", error);
      }
    };

    fetchRates();
  }, [currency1 , API_KEY]);

  useEffect(() => {
    if (rates[currency2]) {
      setAmount2((amount1 * rates[currency2]).toFixed(2));
    }
  }, [amount1, currency2, rates]);

  const handleAmount1Change = (e) => {
    setAmount1(e.target.value);
    if (rates[currency2]) {
      setAmount2((e.target.value * rates[currency2]).toFixed(2));
    }
  };

  const handleAmount2Change = (e) => {
    setAmount2(e.target.value);
    if (rates[currency2]) {
      setAmount1((e.target.value / rates[currency2]).toFixed(2));
    }
  };
  console.log("API_KEY:", API_KEY);

  return (
    <main>
    <div className="converter d-flex align-items-center justify-content-center flex-column mt-5">
      <h2>Currency Converter</h2>
      <div className="input-group  justify-content-center">
        <input type="number" value={amount1} onChange={handleAmount1Change} />
        <select value={currency1} onChange={(e) => setCurrency1(e.target.value)}>
          {Object.keys(rates).map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>

      <div className="input-group  justify-content-center">
        <input type="number" value={amount2} onChange={handleAmount2Change} />
        <select value={currency2} onChange={(e) => setCurrency2(e.target.value)}>
          {Object.keys(rates).map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>
    </div>
    </main>
  );
};

export default CurrencyConverter;
