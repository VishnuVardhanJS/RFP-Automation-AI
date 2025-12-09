## Backend API Documentation

This service manages RFP outreach via Gmail + Gemini and stores vendors, reference IDs, and quotations in MongoDB.

### Prerequisites
- Node.js 18+
- MongoDB instance
- Gmail account with an App Password (for sending/receiving)
- Gemini API key

### Environment Variables
Create a `.env` file with:
- `MONGODB_URI`
- `GMAIL_ADDRESS`
- `GMAIL_APP_PASSWORD`
- `GEMINI_API_KEY`

### Run
```bash
npm install
node server.js
```

### Base URL
```
http://localhost:5000
```

---

## Endpoints

### Vendors
- **POST `/vendor`** — create vendor  
  - Body: `{ "vendor_name": "Acme", "vendor_email": "a@acme.com" }`  
  - 201 → vendor JSON
- **GET `/vendor`** — list vendors  
  - 200 → `[vendor]`
- **GET `/vendor/:id`** — vendor by Mongo `_id`  
  - 200 → vendor JSON, 404 if not found
- **DELETE `/vendor/:vendor_email`** — delete by email  
  - 200 on success, 500 if not found

### Gemini (RFP draft generation)
- **POST `/gemini`** — generate RFP email draft  
  - Body: `{ "company_name": "...", "query_data": "...", "my_company_name": "..." }`  
  - 200 → `{ "subject": "...", "body": "<html...>" }`

### Mail (send RFP via Gmail + Gemini)
- **POST `/mail`** — generate with Gemini then send via Gmail  
  - Body:  
    ```json
    {
      "my_company_name": "Your Co",
      "vendor_name": "Vendor Co",
      "query_data": "We need laptops...",
      "about_company": "What you do",
      "ref_id": "RFQ-1234ABCD",
      "vendor_email": "vendor@example.com"
    }
    ```
  - Behavior: sends mail, stores `ref_id` with query in DB
  - 200 → `{ "message": "mail sent successfully" }`

### Ref IDs
- **GET `/refid`** — list open ref IDs  
  - 200 → `[ { "ref_id": "...", "is_open": true, "rfs_query": "..." } ]`
- **PATCH `/refid`** — mark ref as closed  
  - Body: `{ "id": "<RefId _id>" }`  
  - 200 → `{ "message": "refId update Successful" }`

### Quotations
- **GET `/quotations/:id`** — quotations by `rfp_id` (e.g., `RFQ-XXXX`)  
  - 200 → `[ { "rfp_id": "...", "vendor_name": "...", "quotation": { "item": price } } ]`

---

## Email Listener (Inbound RFQ Replies)
- File: `inobx/EmailListener.js`
- Connects to Gmail IMAP using `GMAIL_ADDRESS`/`GMAIL_APP_PASSWORD`.
- Watches `INBOX`; when an email body contains `RFQ-<8 hex>` matching an open `ref_id`, it:
  - Parses prices via Gemini (`rfqParse`)
  - Finds vendor by `vendor_email`
  - Stores quotation in Mongo and marks message `\Seen`

Ensure the Gmail account is allowed IMAP access and App Password is valid.

---

## Models (Mongo)
- `Vendor`: `vendor_name`, `vendor_email (unique)`
- `RefId`: `ref_id (unique)`, `is_open`, `rfs_query`
- `Quotations`: `rfp_id`, `vendor_name`, `quotation` (Map of Number)

---
