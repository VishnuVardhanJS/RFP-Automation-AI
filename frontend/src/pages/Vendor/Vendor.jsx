import { useState, useEffect } from "react"
import VendorItem from "../../components/vendorItem/vendorItem"
import "./Vendor.css"


function Vendor() {

  const [vendors, setVendors] = useState([])
  const [vendorName, setVendorName] = useState("")
  const [vendorEmail, setVendorEmail] = useState("")

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(import.meta.env.VITE_BACKEND_URI + "vendor/")

      const data = await res.json()

      setVendors(data)
    }

    fetchData()
  }, [])

  async function createUser() {
    console.log(vendorEmail)
    await fetch(import.meta.env.VITE_BACKEND_URI + "vendor/",
      {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ vendor_name: vendorName, vendor_email: vendorEmail })
      }).then(() => {
        setVendors([...vendors, { vendor_name: vendorName, vendor_email: vendorEmail }])
        console.log(vendors)
        setVendorName("")
        setVendorEmail("")
      })


  }

  return (
    <div className="vendor-page">
      <div className="vendor-form">
        <h2>Add New Vendor</h2>
        <div className="vendor-form-group">
          <input 
            type="text" 
            name="vendor_name" 
            onChange={(data) => { setVendorName(data.target.value) }} 
            value={vendorName}
            placeholder="Vendor Name"
          />
          <input 
            type="email" 
            name="vendor_email" 
            onChange={(data) => { setVendorEmail(data.target.value) }} 
            value={vendorEmail}
            placeholder="Vendor Email"
          />
        </div>
        <button onClick={() => createUser()}>Create New Vendor</button>
      </div>

      <div className="vendor-list">
        {vendors.map((item, index) => (
          <VendorItem key={index} name={item.vendor_name} email={item.vendor_email} />
        ))}
      </div>
    </div>
  )
}

export default Vendor
