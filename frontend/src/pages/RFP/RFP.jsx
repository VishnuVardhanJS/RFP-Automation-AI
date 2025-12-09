import { useState, useEffect } from "react"
import "./RFP.css"
import RfpSentCard from "../../components/RfpSentCard/RfpSentCard"

function RFP() {

  const [rfp, setRfp] = useState([])

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(import.meta.env.VITE_BACKEND_URI + "refid/")

      const data = await res.json()

      setRfp(data)
    }

    fetchData()
  }, [])




  return (
    <div className="rfp-page">
      <h2>Request for Proposals</h2>
      <div className="rfp-list">
        {rfp.map((item, index) => (
          <RfpSentCard 
            key={index}
            query_data={item.rfs_query} 
            ref_id={item.ref_id} 
            item_id={item._id} 
          />
        ))}
      </div>
    </div>
  )
}

export default RFP
