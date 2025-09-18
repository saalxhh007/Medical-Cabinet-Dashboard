"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DollarSign, TrendingUp, TrendingDown, Receipt, CreditCard, FileText, Plus, Search, Filter } from "lucide-react"
import axios from "axios"

interface Transaction {
  id: string
  type: "revenue" | "expense"
  category: string
  description: string
  amount: number
  date: string
  patient?: string
  status: "paid" | "pending" | "overdue"
}

interface MaterialUsage {
  id: string
  materialName: string
  quantity: number
  unitCost: number
  totalCost: number
  usedFor: string
  date: string
}

export function BillingDashboard() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [transactions, setTransactions] = useState<Transaction[]>([])

  const apiUrl = process.env.NEXT_PUBLIC_DASHBOARD_API_URL

  const materialUsage: MaterialUsage[] = [
    {
      id: "1",
      materialName: "Disposable Gloves",
      quantity: 50,
      unitCost: 0.25,
      totalCost: 12.5,
      usedFor: "General Consultations",
      date: "2024-01-15",
    },
    {
      id: "2",
      materialName: "Dental Filling Material",
      quantity: 2,
      unitCost: 45.0,
      totalCost: 90.0,
      usedFor: "Dental Treatment - Mike Davis",
      date: "2024-01-14",
    },
    {
      id: "3",
      materialName: "Syringes",
      quantity: 10,
      unitCost: 1.2,
      totalCost: 12.0,
      usedFor: "Vaccinations",
      date: "2024-01-13",
    },
  ]

  const totalRevenue = transactions.filter((t) => t.type === "revenue").reduce((sum, t) => sum + t.amount, 0)

  const totalExpenses = transactions.filter((t) => t.type === "expense").reduce((sum, t) => sum + t.amount, 0)

  const materialCosts = materialUsage.reduce((sum, m) => sum + m.totalCost, 0)

  const netProfit = totalRevenue - totalExpenses - materialCosts

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      transaction.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.category.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = filterStatus === "all" || transaction.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const fetchTransactions = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/v1/transaction`)
      setTransactions(response.data)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchTransactions
  }, [])
  return (
    <div className="h-full">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-[#16697A]">Billing & Finance</h1>
        <div className="flex gap-2">
          <Button 
            className="text-[#16697A] border-[#16697A] hover:bg-[#16697A] hover:text-white bg-transparent">
            <FileText className="h-4 w-4 mr-2" />
            Generate Report
          </Button>
          <Button className="bg-[#489FB5] hover:bg-[#16697A] cursor-pointer">
            <Plus className="h-4 w-4 mr-2" />
            Add Transaction
          </Button>
        </div>
      </div>

      {/* Financial Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-[#16697A]">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">${totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline h-3 w-3 mr-1" />
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-[#16697A]">Total Expenses</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">${totalExpenses.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingDown className="inline h-3 w-3 mr-1" />
              -5% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-[#16697A]">Material Costs</CardTitle>
            <Receipt className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">${materialCosts.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline h-3 w-3 mr-1" />
              +8% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-[#16697A]">Net Profit</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${netProfit >= 0 ? "text-green-600" : "text-red-600"}`}>
              ${netProfit.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              {netProfit >= 0 ? (
                <TrendingUp className="inline h-3 w-3 mr-1" />
              ) : (
                <TrendingDown className="inline h-3 w-3 mr-1" />
              )}
              {netProfit >= 0 ? "+" : ""}15% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="transactions" className="space-y-4">
        <TabsList>
          <TabsTrigger className="text-[#16697A]" value="transactions">Transactions</TabsTrigger>
          <TabsTrigger className="text-[#16697A]" value="materials">Material Usage</TabsTrigger>
          <TabsTrigger className="text-[#16697A]" value="invoices">Invoices</TabsTrigger>
        </TabsList>

        <TabsContent value="transactions" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-[#16697A]">Recent Transactions</CardTitle>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search transactions..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 w-64"
                    />
                  </div>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-32">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="paid">Paid</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="overdue">Overdue</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredTransactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div
                        className={`p-2 rounded-full ${
                          transaction.type === "revenue" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                        }`}
                      >
                        {transaction.type === "revenue" ? (
                          <TrendingUp className="h-4 w-4" />
                        ) : (
                          <TrendingDown className="h-4 w-4" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{transaction.description}</p>
                        <p className="text-sm text-muted-foreground">
                          {transaction.category} • {transaction.date}
                          {transaction.patient && ` • ${transaction.patient}`}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge
                        variant={
                          transaction.status === "paid"
                            ? "default"
                            : transaction.status === "pending"
                              ? "secondary"
                              : "destructive"
                        }
                      >
                        {transaction.status}
                      </Badge>
                      <span
                        className={`font-semibold ${
                          transaction.type === "revenue" ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {transaction.type === "revenue" ? "+" : "-"}${transaction.amount}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="materials" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-[#16697A]">Material Usage & Costs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {materialUsage.map((material) => (
                  <div key={material.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">{material.materialName}</p>
                      <p className="text-sm text-muted-foreground">
                        {material.usedFor} • {material.date}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">${material.totalCost.toFixed(2)}</p>
                      <p className="text-sm text-muted-foreground">
                        {material.quantity} × ${material.unitCost.toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="invoices" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-[#16697A]">Invoice Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">Invoice management coming soon</p>
                <Button className="mt-4">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Invoice
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}