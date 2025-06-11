import React from 'react';

export default function InvoicePreview({ invoice }) {
  const calculateTotals = () => {
    const subTotal = invoice.items.reduce((sum, item) => sum + item.quantity * item.rate, 0);
    const tax = subTotal * invoice.taxRate;
    const total = subTotal + tax;
    return { subTotal, tax, total };
  };

  const totals = calculateTotals();

  return (
    <div className="bg-white p-8 rounded-3xl shadow-2xl space-y-6">
      <h2 className="text-2xl font-bold text-slate-700">Invoice</h2>

      <div className="space-y-1 text-slate-600">
        <p><strong>Invoice Number:</strong> {invoice.invoiceNumber}</p>
        <p><strong>Date:</strong> {invoice.invoiceDate}</p>
        <p><strong>Bill To:</strong> {invoice.clientName}</p>
        <p>{invoice.clientAddress}</p>
      </div>

      <table className="w-full border mt-4">
        <thead className="bg-slate-100 text-slate-700">
          <tr>
            <th className="p-2 text-left">Description</th>
            <th className="p-2 text-right">Quantity</th>
            <th className="p-2 text-right">Rate</th>
            <th className="p-2 text-right">Amount</th>
          </tr>
        </thead>
        <tbody>
          {invoice.items.map((item, i) => (
            <tr key={i} className="border-t">
              <td className="p-2">{item.description}</td>
              <td className="p-2 text-right">{item.quantity}</td>
              <td className="p-2 text-right">₹{item.rate.toFixed(2)}</td>
              <td className="p-2 text-right">₹{(item.quantity * item.rate).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="text-right text-slate-700 space-y-1">
        <p>Subtotal: <span className="font-semibold text-slate-900">₹{totals.subTotal.toFixed(2)}</span></p>
        <p>Tax (10%): <span className="font-semibold text-slate-900">₹{totals.tax.toFixed(2)}</span></p>
        <p className="text-xl font-bold text-slate-900">Total: ₹{totals.total.toFixed(2)}</p>
      </div>

      <button
        onClick={() => window.print()}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition"
      >
        Download PDF
      </button>
    </div>
  );
}
