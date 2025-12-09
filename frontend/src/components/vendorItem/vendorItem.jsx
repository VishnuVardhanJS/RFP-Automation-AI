import './vendorItem.css';

function VendorItem(props) {

  async function onDelete() {
    await fetch(import.meta.env.VITE_BACKEND_URI + "vendor/" + props.email, { method: 'DELETE' })
      .then(window.location.reload())
      .catch((err) => console.log(err))

  }
  return (
    <div className="note-item-container">
      <div>
        <h1>Vendor Name : {props.name}</h1>
        <h1>Vendor Email : {props.email}</h1>
      </div>

      <button
        className="delete-button"
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
      >
        Delete
      </button>
    </div>
  );
}

export default VendorItem;
