export const generateHighRiskBidsReport = (dataToExport) => {
  return `
    <html>
      <head>
        <title>Saudagar</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; }
          h1 { color: #dc2626; text-align: center; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
          th { background-color: #fef2f2; color: #dc2626; }
          .amount { color: #dc2626; font-weight: bold; }
        </style>
      </head>
      <body>
        <h1>High Risk Bids Report</h1>
        <p>Generated on: ${new Date().toLocaleDateString()}</p>
        <p>Total Records: ${dataToExport.length}</p>
        <table>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Agent Name</th>
              <th>Game</th>
              <th>Game Type</th>
              <th>Number</th>
              <th>Amount</th>
              <th>Village</th>
              <th>Session</th>
            </tr>
          </thead>
          <tbody>
            ${dataToExport.map((bid, index) => `
              <tr>
                <td>${index + 1}</td>
                <td>${bid.agent_name || 'N/A'}</td>
                <td>${bid.game_name || 'N/A'}</td>
                <td>${bid.bid_type_name || 'N/A'}</td>
                <td>${bid.bid_number || 'N/A'}</td>
                <td class="amount">₹${Number(bid.amount || 0).toLocaleString()}</td>
                <td>${bid.village || 'N/A'}</td>
                <td>${(bid.session_type || 'N/A').toUpperCase()}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </body>
    </html>
  `
}