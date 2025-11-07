export const generateReceiptTemplate = (receipt, bidDetails) => {
  return `
    <html>
      <head>
        <title>Receipt - ${receipt.receipt_no}</title>
        <style>
          body { 
            font-family: Arial, sans-serif; 
            margin: 0;
            padding: 20px;
            max-width: 400px;
            background: white;
          }
          .receipt-container {
            border: 2px solid #333;
            border-radius: 12px;
            padding: 20px;
            background: white;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          }
          .header {
            display: flex;
            align-items: center;
            margin-bottom: 20px;
          }
          .logo {
            width: 60px;
            height: 60px;
            background: #1e3a8a;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 15px;
            overflow: hidden;
          }
          .logo img {
            width: 45px;
            height: 45px;
            object-fit: contain;
          }
          .header-text h1 {
            margin: 0;
            font-size: 20px;
            color: #333;
          }
          .header-text .subtitle {
            color: #e53e3e;
            font-size: 14px;
            margin: 2px 0 0 0;
          }
          .receipt-info {
            text-align: center;
            margin: 20px 0;
            font-size: 12px;
            color: #666;
          }
          .receipt-number {
            font-size: 14px;
            color: #333;
            margin-bottom: 5px;
          }
          .agent-section {
            display: flex;
            justify-content: space-between;
            margin: 15px 0;
            font-size: 14px;
          }
          .agent-label {
            color: #666;
          }
          .agent-name {
            font-weight: bold;
            color: #333;
          }
          .bid-status {
            text-align: center;
            margin: 20px 0;
          }
          .status-badge {
            background: #fef2f2;
            color: #dc2626;
            padding: 8px 16px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 500;
            display: inline-block;
          }
          .bid-details-title {
            font-size: 16px;
            font-weight: bold;
            margin: 20px 0 10px 0;
            color: #333;
          }
          .bid-table {
            width: 100%;
            border-collapse: collapse;
            font-size: 12px;
            margin-bottom: 20px;
          }
          .bid-table th {
            background: #f8f9fa;
            padding: 8px 4px;
            text-align: left;
            font-weight: 600;
            color: #374151;
            border-bottom: 1px solid #e5e7eb;
          }
          .bid-table td {
            padding: 8px 4px;
            border-bottom: 1px solid #f3f4f6;
          }
          .bid-table tr:last-child td {
            border-bottom: none;
          }
          .bid-number {
            font-weight: bold;
            color: #333;
          }
          .bid-amount {
            color: #059669;
            font-weight: bold;
          }
          .total-section {
            border-top: 2px solid #333;
            padding-top: 15px;
            margin-top: 20px;
          }
          .total-amount {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 16px;
            font-weight: bold;
          }
          .total-value {
            color: #059669;
            font-size: 18px;
          }
          @media print {
            body { margin: 0; padding: 10px; }
            .receipt-container { border: none; }
          }
        </style>
      </head>
      <body>
        <div class="receipt-container">
          <div class="header">
            <div class="logo">
              <img src="/images/icon.png" alt="Saudagar" />
            </div>
            <div class="header-text">
              <h1>Receipt</h1>
              <div class="subtitle">Nivana Morning</div>
            </div>
          </div>
          
          <div class="receipt-info">
            <div class="receipt-number">#${receipt.receipt_no}</div>
            <div>${new Date(receipt.receipt_date).toLocaleDateString('en-GB')}</div>
          </div>

          <div class="agent-section">
            <span class="agent-label">Agent Name</span>
            <span class="agent-name">${receipt.agent_name}</span>
          </div>

          <div class="bid-details-title">Bid Details</div>
          
          <table class="bid-table">
            <thead>
              <tr>
                <th>No.</th>
                <th>Type</th>
                <th>Number</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              ${bidDetails.map((bid, index) => `
                <tr>
                  <td>#${index + 1}</td>
                  <td>${bid.bid_type_name || 'Single Digit'}</td>
                  <td class="bid-number">${bid.bid_number}</td>
                  <td class="bid-amount">₹${bid.amount}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>

          <div class="total-section">
            <div class="total-amount">
              <span>Total Bid Amount:</span>
              <span class="total-value">₹${Number(receipt.total_amount).toLocaleString()}</span>
            </div>
          </div>
        </div>
      </body>
    </html>
  `;
};