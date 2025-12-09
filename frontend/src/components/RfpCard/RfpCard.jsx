import { useEffect, useState } from "react";
import "./RfpCard.css";
import Swal from "sweetalert2";
import { v4 as uuidv4 } from "uuid"

export default function RfpCard({ setIsOpen, rfpQuery, setRfpQuery }) {
  const [selected, setSelected] = useState([]);
  const [options, setOptions] = useState([]);
  const [refId, setRefId] = useState("")



  useEffect(() => {

    async function getVendors() {
      const res = await fetch(import.meta.env.VITE_BACKEND_URI + "vendor/")

      const data = await res.json()

      setOptions([...data])
    }

    getVendors()
    setRefId(generateRefUUID())

  }, [])


  function generateRefUUID(prefix = "RFQ") {
    const shortId = uuidv4().split("-")[0];
    return `${prefix}-${shortId}`;
  }


  const toggleSelect = (value) => {
    setSelected((prev) =>
      prev.includes(value)
        ? prev.filter((v) => v !== value)
        : [...prev, value]
    );
  };

  async function handleSubmit() {

    Swal.showLoading()

    if (selected.length == 0) {
      isSendingMail(false)
      alert("Select Atleast 1 vendor")
      Swal.hideLoading()
      return
    }

    for (const vendor of selected) {
      const mailBodyContents = {
        ...vendor,
        "my_company_name": localStorage.getItem("company_name"),
        "about_company": localStorage.getItem("about_us"),
        "query_data": rfpQuery,
        "ref_id": refId
      }
      await fetch(import.meta.env.VITE_BACKEND_URI + "mail/", {
        method: "POST", headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(mailBodyContents)
      })
        .catch(err => console.log(err))
    }

    Swal.hideLoading()
    console.log("all mails sent")
    handleClose()
    setRfpQuery("")
  };

  const handleClose = () => {
    setIsOpen(false)
    console.log(selected)
  }


  return (
    <div className="popup-overlay">
      <div className="popup-card">
        <textarea
          value={rfpQuery}
          onChange={(e) => setRfpQuery(e.target.value)}
          placeholder="Enter your query..."
          className="popup-textarea"
        />

        <div style={{ display: "flex", gap: "5px" }}>
          <h5>Reference Id : </h5>

          <input value={refId} onChange={(e) => setRefId(e.target.value)} placeholder="reference ID" />
        </div>


        <div className="popup-options-grid">
          {options.map((opt, key) => (
            <button
              key={key}
              onClick={() => toggleSelect(opt)}
              className={`popup-option ${selected.includes(opt) ? "selected" : ""}`}
            >
              {opt.vendor_name}
            </button>
          ))}
        </div>

        <div className="popup-actions">
          <button onClick={() => handleClose()} className="popup-btn cancel">Cancel</button>
          <button onClick={() => handleSubmit()} className="popup-btn submit">Submit</button>
        </div>
      </div>
    </div>
  );
}

