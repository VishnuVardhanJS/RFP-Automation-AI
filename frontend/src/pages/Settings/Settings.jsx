import { useState, useEffect } from "react"
import "./Settings.css"

function Settings() {

  const [companyName, setCompanyName] = useState("")

  const [companyEmail, setCompanyEmail] = useState("")

  const [aboutUs, setAboutUS] = useState("")


  useEffect(() => {

    const company_name = localStorage.getItem("company_name")

    const company_email = localStorage.getItem("company_email")

    const about_us = localStorage.getItem("about_us")


    if (company_name != null) {
      setCompanyName(company_name)
    }

    if (company_email != null) {
      setCompanyEmail(company_email)
    }

    if (about_us != null) {
      setAboutUS(about_us)
    }

  }, [])

  function updateSettings() {

    if (companyName == "" || companyEmail == "" || aboutUs == "") {
      alert("Enter all the details")
      return
    }

    localStorage.setItem("company_name", companyName)

    localStorage.setItem("company_email", companyEmail)

    localStorage.setItem("about_us", aboutUs)

    alert("Settings updated Successfully")

  }

  return (
    <div className="settings-container">
      <h2>Settings</h2>
      <div className="settings-form">
        <div className="settings-form-group">
          <label htmlFor="company_name">Company Name</label>
          <input 
            id="company_name"
            name="company_name" 
            value={companyName} 
            onChange={(data) => { setCompanyName(data.target.value) }}
            placeholder="Enter your company name"
          />
        </div>
        <div className="settings-form-group">
          <label htmlFor="company_email">Company Email</label>
          <input 
            id="company_email"
            type="email"
            name="company_email" 
            value={companyEmail} 
            onChange={(data) => { setCompanyEmail(data.target.value) }}
            placeholder="Enter your company email"
          />
        </div>
        <div className="settings-form-group">
          <label htmlFor="about_us">About Us</label>
          <textarea 
            id="about_us"
            name="about_us" 
            value={aboutUs} 
            onChange={(data) => { setAboutUS(data.target.value) }}
            placeholder="Enter information about your company"
            rows={6}
          />
        </div>
        <button onClick={() => updateSettings()}>Update Settings</button>
      </div>
    </div>
  )
}

export default Settings
