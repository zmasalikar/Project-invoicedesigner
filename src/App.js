import React, { useState } from 'react';
import InvoiceForm from './components/InvoiceForm';
import InvoicePreview from './components/InvoicePreview';

export default function App() {
  const [invoice, setInvoice] = useState({
    clientName: '',
    clientAddress: '',
    invoiceNumber: '',
    invoiceDate: '',
    items: [],
    taxRate: 0.1,
  });

  return (
    <div className="min-h-screen bg-slate-100 py-10 px-4">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">🧾 Elegant Invoice Builder</h1>
      <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto">
        <InvoiceForm invoice={invoice} setInvoice={setInvoice} />
        <InvoicePreview invoice={invoice} />
      </div>
    </div>
  );
}
