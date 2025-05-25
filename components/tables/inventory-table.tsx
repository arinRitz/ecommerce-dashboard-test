import { products } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useInventoryStore } from "@/lib/store";

export function InventoryTable() {
  const { products, updateStock } = useInventoryStore();
  const [sortKey, setSortKey] = useState<keyof Products>('name');
  const [search, setSearch] = useState('');

  const sortedProducts = [...products]
    .filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => a[sortKey] > b[sortKey] ? 1 : -1);

  return (
    <div className="space-y-4">
      <Input 
        placeholder="Search products..." 
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      
      <div className="border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted">
            <tr>
              <th className="p-4 text-left cursor-pointer" onClick={() => setSortKey('name')}>
                Product {sortKey === 'name' && '▲'}
              </th>
              <th className="p-4 text-left cursor-pointer" onClick={() => setSortKey('stock')}>
                Stock {sortKey === 'stock' && '▲'}
              </th>
              <th className="p-4 text-left">Price</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedProducts.map((product) => (
              <tr key={product.id} className="border-t">
                <td className="p-4">{product.name}</td>
                <td className="p-4">
                  <Input
                    type="number"
                    value={product.stock}
                    onChange={(e) => updateStock(product.id, Number(e.target.value))}
                    className="w-20"
                  />
                </td>
                <td className="p-4">${product.price}</td>
                <td className="p-4">
                  {product.stock < 10 ? (
                    <Badge variant="destructive">Low Stock</Badge>
                  ) : (
                    <Badge variant="outline">In Stock</Badge>
                  )}
                </td>
                <td className="p-4">
                  <Button variant="ghost" size="sm">
                    Edit
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}