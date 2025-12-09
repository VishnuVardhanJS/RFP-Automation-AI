import "./Header.css"

function Header() {
  return (
    <div className="header-container">
      <img src="https://simpleicons.org/icons/chromatic.svg" alt="temp_logo" style={{ height: "50px" }} />
      <div className="header-opts">
        <div className="header-bts">
          <a href="/">
            Home
          </a>
        </div>

        <div className="header-bts">
          <a href="/rfp">
            RFP
          </a>

        </div>

        <div className="header-bts">
          <a href="/vendor">
            Vendors
          </a>
        </div>

        <div className="header-bts">
          <a href="/settings">
            Settings
          </a>
        </div>
      </div>
    </div>
  )
}

export default Header
