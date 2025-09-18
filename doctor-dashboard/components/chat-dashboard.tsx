"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Search, Send, Phone, Video, MoreVertical, MessageCircle } from "lucide-react"

interface ChatContact {
  id: string
  name: string
  lastMessage: string
  timestamp: string
  unread: number
  status: "online" | "offline" | "away"
  avatar?: string
}

interface Message {
  id: string
  senderId: string
  content: string
  timestamp: string
  type: "text" | "image" | "file"
}

export function ChatDashboard() {
  const [selectedContact, setSelectedContact] = useState<string | null>(null)
  const [message, setMessage] = useState("")
  const [searchQuery, setSearchQuery] = useState("")

  const contacts: ChatContact[] = [
    {
      id: "1",
      name: "John Smith",
      lastMessage: "Thank you for the appointment reminder",
      timestamp: "2 min ago",
      unread: 2,
      status: "online",
    },
    {
      id: "2",
      name: "Sarah Johnson",
      lastMessage: "Can I reschedule my appointment?",
      timestamp: "1 hour ago",
      unread: 1,
      status: "away",
    },
    {
      id: "3",
      name: "Mike Davis",
      lastMessage: "Prescription refill request",
      timestamp: "3 hours ago",
      unread: 0,
      status: "offline",
    },
  ]

  const messages: Message[] = [
    {
      id: "1",
      senderId: "patient",
      content: "Hello doctor, I wanted to ask about my test results",
      timestamp: "10:30 AM",
      type: "text",
    },
    {
      id: "2",
      senderId: "doctor",
      content: "Hello! Your test results look good. Everything is within normal range.",
      timestamp: "10:32 AM",
      type: "text",
    },
    {
      id: "3",
      senderId: "patient",
      content: "Thank you for the appointment reminder",
      timestamp: "10:35 AM",
      type: "text",
    },
  ]

  const filteredContacts = contacts.filter((contact) => contact.name.toLowerCase().includes(searchQuery.toLowerCase()))

  const handleSendMessage = () => {
    if (message.trim()) {
      // Handle sending message
      setMessage("")
    }
  }

  return (
    <div className="h-full">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-[#16697A]">Patient Chat</h1>
        <div className="flex gap-2">
          <Button className="text-[#fff] bg-[#82C0CC] hover:bg-[#16697A]">
            <Phone className="h-4 w-4 mr-2" />
            Voice Call
          </Button>
          <Button variant="outline" className="text-[#16697A] hover:text-[#16697A]">
            <Video className="h-4 w-4 mr-2" />
            Video Call
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
        {/* Contacts List */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-[#16697A]">Patients</CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search patients..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[500px]">
              {filteredContacts.map((contact) => (
                <div
                  key={contact.id}
                  className={`p-4 cursor-pointer hover:bg-muted/50 border-b ${
                    selectedContact === contact.id ? "bg-muted" : ""
                  }`}
                  onClick={() => setSelectedContact(contact.id)}
                >
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={contact.avatar || "/placeholder.svg"} />
                        <AvatarFallback className="text-[#16697A]">
                          {contact.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div
                        className={`absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-background ${
                          contact.status === "online"
                            ? "bg-green-500"
                            : contact.status === "away"
                              ? "bg-yellow-500"
                              : "bg-gray-400"
                        }`}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="font-medium truncate text-[#489FB5]">{contact.name}</p>
                        <span className="text-xs text-muted-foreground">{contact.timestamp}</span>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">{contact.lastMessage}</p>
                    </div>
                    {contact.unread > 0 && (
                      <Badge variant="destructive" className="h-5 w-5 p-0 flex items-center justify-center text-xs">
                        {contact.unread}
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Chat Area */}
        <Card className="lg:col-span-2">
          {selectedContact ? (
            <>
              <CardHeader className="border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="text-[#16697A]">
                        {contacts
                          .find((c) => c.id === selectedContact)
                          ?.name.split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-[#16697A]">{contacts.find((c) => c.id === selectedContact)?.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {contacts.find((c) => c.id === selectedContact)?.status}
                      </p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-0 flex flex-col h-[400px]">
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    {messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex ${msg.senderId === "doctor" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[70%] p-3 rounded-lg ${
                            msg.senderId === "doctor" ? "bg-[#FFA62B] text-primary-foreground" : "bg-muted"
                          }`}
                        >
                          <p className="text-sm">{msg.content}</p>
                          <p className="text-xs opacity-70 mt-1">{msg.timestamp}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
                <Separator />
                <div className="p-4">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Type a message..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                      className="flex-1"
                    />
                    <Button onClick={handleSendMessage} className="bg-[#489FB5] hover:bg-[#16697A] cursor-pointer">
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </>
          ) : (
            <CardContent className="flex items-center justify-center h-full">
              <div className="text-center text-muted-foreground">
                <MessageCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Select a patient to start chatting</p>
              </div>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  )
}