"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import axios from "axios"
import { toast } from "sonner"

interface Patient {
  id: number
  firstName: string
  lastName: string
  phone: string
  email: string
  dateOfBirth: string
  address: string
  createdAt?: string
}

interface AddPatientDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AddPatientDialog({ open, onOpenChange }: AddPatientDialogProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    phone: "",
    email: "",
    address: "",
    emergencyContact: {
      name: "",
      phone: "",
      relationship: "",
    },
  })
  const apiUrl = process.env.NEXT_PUBLIC_DASHBOARD_API_URL

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    axios.post(`${apiUrl}/api/v1/patient`, formData)
      .then((response) => {
        toast.success("Patient Added!")
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed To Add Patient!")
      })
      .finally(() => {
        setFormData({
          firstName: "",
          lastName: "",
          dateOfBirth: "",
          phone: "",
          email: "",
          address: "",
          emergencyContact: {
            name: "",
            phone: "",
            relationship: "",
          },
        })
        onOpenChange(false)
      })
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleEmergencyContactChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      emergencyContact: {
        ...prev.emergencyContact,
        [field]: value,
      },
    }))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-[#16697A]">Add New Patient</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 text-[#489FB5]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name *</Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name *</Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="dateOfBirth">Date of Birth *</Label>
              <Input
                id="dateOfBirth"
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Textarea
              id="address"
              value={formData.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
              rows={3}
            />
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Emergency Contact</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="emergencyName">Contact Name</Label>
                <Input
                  id="emergencyName"
                  value={formData.emergencyContact.name}
                  onChange={(e) => handleEmergencyContactChange("name", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="emergencyPhone">Contact Phone</Label>
                <Input
                  id="emergencyPhone"
                  type="tel"
                  value={formData.emergencyContact.phone}
                  onChange={(e) => handleEmergencyContactChange("phone", e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="emergencyRelationship">Relationship</Label>
              <Input
                id="emergencyRelationship"
                value={formData.emergencyContact.relationship}
                onChange={(e) => handleEmergencyContactChange("relationship", e.target.value)}
                placeholder="e.g., Spouse, Parent, Sibling"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" className="text-[#960018] cursor-pointer"
              variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-[#82C0CC] hover:bg-[#489FB5] cursor-pointer">
              Add Patient
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}