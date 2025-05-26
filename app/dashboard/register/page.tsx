'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { addProduct } from '@/lib/store'
import { toast } from '@/hooks/use-toast'
import { salesData } from '@/lib/data/sales'
import { products } from '@/lib/data/products'

const formSchema = z.object({
  name: z.string().min(1, 'Product name is required'),
  category: z.string().min(1, 'Category is required'),
  description: z.string().min(1, 'Description is required'),
  price: z.coerce.number().gt(0, 'Price must be greater than 0'),
  stock: z.coerce.number().int().min(0, 'Stock must be non-negative'),
})

export default function RegisterPage() {
  const [image, setImage] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      category: '',
      description: '',
      price: 0,
      stock: 0,
    },
  })

// Update onSubmit handler
const onSubmit = (data: any) => {
  const newProduct = {
    ...data,
    id: Date.now().toString(),
    image: preview || ''
  }
  
  const updatedProducts = [...JSON.parse(localStorage.getItem('products') || []), newProduct]
  localStorage.setItem('products', JSON.stringify(updatedProducts))
  
  // Update sales data
  const newSale = {
    date: new Date().toISOString(),
    category: data.category,
    revenue: 0,
    orders: 0
  }
  const updatedSales = [...salesData, newSale]
  localStorage.setItem('salesData', JSON.stringify(updatedSales))
  
  toast({ title: 'Success', description: 'Product added successfully!' })
  reset()
  setPreview(null)
}
  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImage(file)
      setPreview(URL.createObjectURL(file))
    }
  }

  return (
    <div className="max-w-2xl space-y-6">
      <h2 className="text-2xl font-bold">Register New Product</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label>Product Name</Label>
          <Input {...register('name')} />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>

        <div>
          <Label>Category</Label>
          <Input {...register('category')} />
          {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
        </div>

        <div>
          <Label>Description</Label>
          <Textarea {...register('description')} />
          {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>Price ($)</Label>
            <Input type="number" {...register('price')} />
            {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
          </div>

          <div>
            <Label>Stock</Label>
            <Input type="number" {...register('stock')} />
            {errors.stock && <p className="text-red-500 text-sm">{errors.stock.message}</p>}
          </div>
        </div>

        <div>
          <Label>Product Image</Label>
          <Input type="file" accept="image/*" onChange={handleImage} />
          {preview && (
            <img src={preview} alt="Preview" className="mt-2 w-32 h-32 object-cover rounded" />
          )}
        </div>

        <Button type="submit">Add Product</Button>
      </form>
    </div>
  )
}
