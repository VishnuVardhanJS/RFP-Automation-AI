import './RfpSentCard.css';
import { useNavigate } from 'react-router-dom';

function RfpSentCard(props) {
  const navigate = useNavigate();

  async function onDelete() {
    console.log(props.item_id)
    await fetch(import.meta.env.VITE_BACKEND_URI + "refid", {
      method: 'PATCH', headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ "id": props.item_id })
    })
      .then(window.location.reload())
      .catch((err) => console.log(err))

  }
  return (
    <div className="rfp-item-container">
      <div onClick={() => navigate(`/dashboard/${props.ref_id}`)} style={{ cursor: 'pointer', flex: 1 }}>
        <h3>RefId : {props.ref_id}</h3>
        <p>{props.query_data}</p>
      </div>

      <div style={{ display: 'flex', gap: 'var(--spacing-sm)' }}>
        <button
          className="view-button"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/dashboard/${props.ref_id}`);
          }}
        >
          View Dashboard
        </button>
        <button
          className="delete-button"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
        >
          Complete Rfp
        </button>
      </div>
    </div>
  );
}

export default RfpSentCard;
