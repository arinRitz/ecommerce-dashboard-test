// app/dashboard/register/page.tsx
'use client'
import { useState } from 'react'

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    image: null as File | null,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setForm((prev) => ({ ...prev, image: e.target.files![0] }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Product Registered:', form)
    alert('Product added successfully (check console)')
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Register New Product</h2>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow space-y-4">
        <input
          name="name"
          placeholder="Product Name"
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="number"
          name="stock"
          placeholder="Initial Stock"
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleFile}
          className="w-full p-2 border rounded"
        />
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
          Add Product
        </button>
      </form>
    </div>
  )
}
