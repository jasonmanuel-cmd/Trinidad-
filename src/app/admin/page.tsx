import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { PRODUCTS } from "@/data/mockProducts";
import { LayoutDashboard, Package, ShoppingCart, Users, Settings, Plus } from "lucide-react";

export default function AdminDashboard() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <aside className="w-full md:w-64 space-y-4">
            <div className="p-6 bg-card border border-border rounded-2xl space-y-6">
              <h2 className="text-xl font-black uppercase italic text-primary">Admin Console</h2>
              <nav className="space-y-2">
                <button className="w-full flex items-center gap-3 p-3 bg-secondary rounded-xl text-sm font-bold transition-all">
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Overview</span>
                </button>
                <button className="w-full flex items-center gap-3 p-3 hover:bg-secondary rounded-xl text-sm font-bold text-muted-foreground hover:text-foreground transition-all">
                  <Package className="w-4 h-4" />
                  <span>Products</span>
                </button>
                <button className="w-full flex items-center gap-3 p-3 hover:bg-secondary rounded-xl text-sm font-bold text-muted-foreground hover:text-foreground transition-all">
                  <ShoppingCart className="w-4 h-4" />
                  <span>Orders</span>
                </button>
                <button className="w-full flex items-center gap-3 p-3 hover:bg-secondary rounded-xl text-sm font-bold text-muted-foreground hover:text-foreground transition-all">
                  <Users className="w-4 h-4" />
                  <span>Customers</span>
                </button>
                <button className="w-full flex items-center gap-3 p-3 hover:bg-secondary rounded-xl text-sm font-bold text-muted-foreground hover:text-foreground transition-all">
                  <Settings className="w-4 h-4" />
                  <span>Settings</span>
                </button>
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 space-y-8">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-black uppercase tracking-tight">Product Management</h1>
              <button className="bg-primary text-primary-foreground px-6 py-2 rounded-xl font-bold flex items-center gap-2 hover:scale-105 transition-transform">
                <Plus className="w-4 h-4" />
                <span>Add Product</span>
              </button>
            </div>

            <div className="bg-card border border-border rounded-3xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-secondary/50 border-b border-border">
                    <tr>
                      <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-muted-foreground">Product</th>
                      <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-muted-foreground">Category</th>
                      <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-muted-foreground">Price</th>
                      <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-muted-foreground">Stock</th>
                      <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-muted-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {PRODUCTS.map((product) => (
                      <tr key={product.id} className="hover:bg-secondary/20 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-muted rounded-lg" />
                            <div>
                              <div className="font-bold">{product.name}</div>
                              <div className="text-xs text-muted-foreground">{product.brand}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm">{product.category}</td>
                        <td className="px-6 py-4 text-sm font-bold">${product.price.toFixed(2)}</td>
                        <td className="px-6 py-4">
                          <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-full border ${
                            product.stockStatus === 'In Stock' ? 'bg-accent/20 text-accent border-accent/30' : 
                            product.stockStatus === 'Low Stock' ? 'bg-amber-500/20 text-amber-500 border-amber-500/30' : 
                            'bg-primary/20 text-primary border-primary/30'
                          }`}>
                            {product.stockStatus}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <button className="text-primary text-sm font-bold hover:underline">Edit</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
