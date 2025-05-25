'use client';
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useInventoryStore } from "@/lib/store";
import { useState } from "react";

export function ProductForm() {
  const { register, handleSubmit, reset } = useForm();
  const addProduct = useInventoryStore((state) => state.addProduct);
  const [preview, setPreview] = useState<string>();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setPreview(URL.createObjectURL(file));
  };

  const onSubmit = (data: any) => {
    addProduct({
      ...data,
      id: Date.now().toString(),
      stock: Number(data.stock),
      price: Number(data.price),
      image: preview || '',
    });
    reset();
    setPreview(undefined);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-2xl">
      <div className="grid grid-cols-2 gap-4">
        <Input {...register("name")} placeholder="Product Name" required />
        <Input
          {...register("price")}
          type="number"
          placeholder="Price"
          required
        />
        <Input
          {...register("stock")}
          type="number"
          placeholder="Initial Stock"
          required
        />
        <div className="col-span-2">
          <Input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
          />
          {preview && (
            <img
              src={preview}
              className="mt-2 h-32 w-32 object-cover rounded-lg"
              alt="Preview"
            />
          )}
        </div>
      </div>
      <Button type="submit" className="w-full">
        Add Product
      </Button>
    </form>
  );
}