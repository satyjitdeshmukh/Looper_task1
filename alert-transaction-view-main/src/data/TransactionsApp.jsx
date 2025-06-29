import React, { useEffect, useState } from 'react';

// Mock data
const mockTransactions = [
  { id: '1', date: '2024-01-15', description: 'Revenue Transaction - user_001', category: 'Revenue', amount: 1500.0, type: 'income', status: 'completed', account: 'Main Account', reference: 'TXN-001' },
  { id: '2', date: '2024-02-21', description: 'Expense Transaction - user_002', category: 'Technology', amount: -1200.50, type: 'expense', status: 'completed', account: 'Operating Account', reference: 'TXN-002' },

];

export default function TransactionsApp() {
  const [txns, setTxns] = useState([]);

  // Upload mock data
  const upload = async () => {
    try {
      const res = await fetch('http://localhost:8080/api/transactions/bulk-add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(mockTransactions),
      });
      const data = await res.json();
      console.log('Uploaded:', data);
      fetchData();
    } catch (err) {
      console.error('Upload error:', err);
    }
  };

  // Fetch stored transactions
  const fetchData = async () => {
    try {
      const res = await fetch('http://localhost:8080/api/transactions');
      const data = await res.json();
      setTxns(data);
    } catch (err) {
      console.error('Fetch error:', err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <button onClick={upload}>Upload Transactions</button>
      <ul>
        {txns.map(t => (
          <li key={t._id}>{t.description}: ${t.amount}</li>
        ))}
      </ul>
    </div>
  );
}