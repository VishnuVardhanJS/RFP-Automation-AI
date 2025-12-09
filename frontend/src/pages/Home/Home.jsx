import { useState } from "react"

import RfpCard from "../../components/RfpCard/RfpCard"
import "./Home.css"

function Home() {

  const [rfpQuery, setRfpQuery] = useState("")

  const [isOpen, setIsOpen] = useState(false)



  return (
    <div className="home-container">

      <textarea onChange={(event) => setRfpQuery(event.target.value)}
        value={rfpQuery} placeholder="enter your query here"></textarea>

      <button onClick={() => setIsOpen(true)}>send rfp</button>

      {isOpen ? <RfpCard setIsOpen={setIsOpen} rfpQuery={rfpQuery} setRfpQuery={setRfpQuery} /> : null}

    </div>
  )
}

export default Home
