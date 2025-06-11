import React from 'react';

export default function InvoiceForm({ invoice, setInvoice }) {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInvoice({ ...invoice, [name]: value });
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...invoice.items];
    newItems[index][field] = value;
    setInvoice({ ...invoice, items: newItems });
  };

  const addItem = () => {
    setInvoice({
      ...invoice,
      items: [...invoice.items, { description: '', quantity: 1, rate: 0, amount: 0 }],
    });
  };

  const removeItem = (index) => {
    const newItems = invoice.items.filter((_, i) => i !== index);
    setInvoice({ ...invoice, items: newItems });
  };

  const calculateTotals = () => {
    const subTotal = invoice.items.reduce(
      (sum, item) => sum + item.quantity * item.rate,
      0
    );
    const tax = subTotal * invoice.taxRate;
    const total = subTotal + tax;
    return { subTotal, tax, total };
  };

  const totals = calculateTotals();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 py-10 px-4 flex items-center justify-center">
      <div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-5xl">
        <h2 className="text-3xl font-semibold text-slate-700 mb-6 text-center">🧾 Elegant Invoice Builder</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
          <input
            type="text"
            name="clientName"
            placeholder="Client Name"
            value={invoice.clientName}
            onChange={handleInputChange}
            className="input-style"
          />
          <input
            type="text"
            name="clientAddress"
            placeholder="Client Address"
            value={invoice.clientAddress}
            onChange={handleInputChange}
            className="input-style"
          />
          <input
            type="text"
            name="invoiceNumber"
            placeholder="Invoice Number"
            value={invoice.invoiceNumber}
            onChange={handleInputChange}
            className="input-style"
          />
          <input
            type="date"
            name="invoiceDate"
            value={invoice.invoiceDate}
            onChange={handleInputChange}
            className="input-style"
          />
        </div>

        <h3 className="text-xl font-medium text-slate-600 mb-4">Invoice Items</h3>
        <div className="space-y-3">
          {invoice.items.map((it, index) => (
            <div key={index} className="flex flex-col md:flex-row gap-3 md:items-center">
              <input
                type="text"
                placeholder="Description"
                value={it.description}
                onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                className="input-style flex-1"
              />
              <input
                type="number"
                placeholder="Qty"
                value={it.quantity}
                onChange={(e) => handleItemChange(index, 'quantity', Number(e.target.value))}
                className="input-style w-24"
              />
              <input
                type="number"
                placeholder="Rate"
                value={it.rate}
                onChange={(e) => handleItemChange(index, 'rate', Number(e.target.value))}
                className="input-style w-24"
              />
              <span className="font-medium text-slate-700 w-28 text-right">₹{(it.quantity * it.rate).toFixed(2)}</span>
              <button
                onClick={() => removeItem(index)}
                className="text-sm text-red-500 hover:text-red-700 transition"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <button
          onClick={addItem}
          className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition"
        >
          + Add Item
        </button>

        <div className="mt-8 border-t pt-4 text-right space-y-2 text-slate-600">
          <p>Subtotal: <span className="font-semibold text-slate-800">₹{totals.subTotal.toFixed(2)}</span></p>
          <p>Tax: <span className="font-semibold text-slate-800">₹{totals.tax.toFixed(2)}</span></p>
          <p className="text-xl font-bold text-slate-800">Total: ₹{totals.total.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
}
