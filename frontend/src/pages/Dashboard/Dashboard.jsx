import { useEffect, useState, useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import { useParams } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = () => {

  const { refid } = useParams();
  const [data, setData] = useState([])


  useEffect(() => {


    async function fetchData() {

      try {
        const res = await fetch(import.meta.env.VITE_BACKEND_URI + "quotations/" + refid);

        const resData = await res.json();

        setData(resData)

      } catch (err) {
        console.log(err);
      }
    }


    fetchData()
  }, [])


  const products = useMemo(() => {
    if (!data?.length) return [];
    return Object.keys(data[0].quotation);
  }, [data]);

  const [selectedProduct, setSelectedProduct] = useState(products[0]);

  const chartData = useMemo(() => {
    return data.map(vendor => ({
      vendor: vendor.vendor_name,
      price: Number(vendor.quotation[selectedProduct]),
    }));
  }, [data, selectedProduct]);

  const minPriceVendor = useMemo(() => {
    if (!chartData.length) return null;
    return chartData.reduce((min, current) => 
      current.price < min.price ? current : min
    );
  }, [chartData]);

  useEffect(() => {
    if (products.length > 0 && !selectedProduct) {
      setSelectedProduct(products[0]);
    }
  }, [products]);

  return (
    <div className="dashboard-container">
      <h2>Product Comparison</h2>

      <div className="product-selector">
        {products.map((p) => (
          <button
            key={p}
            onClick={() => setSelectedProduct(p)}
            className={`product-button ${selectedProduct === p ? "active" : ""}`}
          >
            {p}
          </button>
        ))}
      </div>

      <div className="chart-container">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis 
              dataKey="vendor" 
              stroke="var(--text-secondary)"
              tick={{ fill: "var(--text-secondary)" }}
            />
            <YAxis 
              stroke="var(--text-secondary)"
              tick={{ fill: "var(--text-secondary)" }}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: "var(--bg-secondary)",
                border: "1px solid var(--border)",
                borderRadius: "4px",
                color: "var(--text-primary)"
              }}
            />
            <Bar 
              dataKey="price" 
              fill="var(--primary)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {minPriceVendor && (
        <div className="min-price-info">
          <p>
            <strong>Best Price:</strong> {minPriceVendor.vendor} - ${minPriceVendor.price.toFixed(2)}
          </p>
        </div>
      )}
    </div>);
};

export default Dashboard;
