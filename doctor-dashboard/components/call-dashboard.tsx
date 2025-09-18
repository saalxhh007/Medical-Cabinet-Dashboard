"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Video, VideoOff, Mic, MicOff, Phone, PhoneOff, Search, Calendar, Clock, Users } from "lucide-react"

interface CallHistory {
  id: string
  patientName: string
  type: "video" | "audio"
  duration: string
  timestamp: string
  status: "completed" | "missed" | "cancelled"
}

interface ScheduledCall {
  id: string
  patientName: string
  scheduledTime: string
  type: "video" | "audio"
  status: "upcoming" | "in-progress"
}

export function CallDashboard() {
  const [isInCall, setIsInCall] = useState(false)
  const [isVideoEnabled, setIsVideoEnabled] = useState(true)
  const [isAudioEnabled, setIsAudioEnabled] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")

  const callHistory: CallHistory[] = [
    {
      id: "1",
      patientName: "John Smith",
      type: "video",
      duration: "15:30",
      timestamp: "2 hours ago",
      status: "completed",
    },
    {
      id: "2",
      patientName: "Sarah Johnson",
      type: "audio",
      duration: "8:45",
      timestamp: "1 day ago",
      status: "completed",
    },
    {
      id: "3",
      patientName: "Mike Davis",
      type: "video",
      duration: "0:00",
      timestamp: "2 days ago",
      status: "missed",
    },
  ]

  const scheduledCalls: ScheduledCall[] = [
    {
      id: "1",
      patientName: "Emma Wilson",
      scheduledTime: "2:00 PM Today",
      type: "video",
      status: "upcoming",
    },
    {
      id: "2",
      patientName: "Robert Brown",
      scheduledTime: "4:30 PM Today",
      type: "audio",
      status: "upcoming",
    },
  ]

  const handleStartCall = (patientName: string, type: "video" | "audio") => {
    setIsInCall(true)
    setIsVideoEnabled(type === "video")
  }

  const handleEndCall = () => {
    setIsInCall(false)
    setIsVideoEnabled(true)
    setIsAudioEnabled(true)
  }

  if (isInCall) {
    return (
      <div className="h-full bg-black rounded-lg relative overflow-hidden">
        {/* Video Call Interface */}
        <div className="absolute inset-0 flex items-center justify-center">
          {isVideoEnabled ? (
            <div className="w-full h-full bg-gray-900 flex items-center justify-center">
              <div className="text-white text-center">
                <Avatar className="h-32 w-32 mx-auto mb-4">
                  <AvatarFallback className="text-4xl">JS</AvatarFallback>
                </Avatar>
                <h2 className="text-2xl font-semibold mb-2">John Smith</h2>
                <p className="text-gray-400">Connected • 05:23</p>
              </div>
            </div>
          ) : (
            <div className="text-white text-center">
              <Avatar className="h-32 w-32 mx-auto mb-4">
                <AvatarFallback className="text-4xl">JS</AvatarFallback>
              </Avatar>
              <h2 className="text-2xl font-semibold mb-2">John Smith</h2>
              <p className="text-gray-400">Audio Call • 05:23</p>
            </div>
          )}
        </div>

        {/* Call Controls */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="flex items-center gap-4">
            <Button
              variant={isAudioEnabled ? "secondary" : "destructive"}
              size="lg"
              className="rounded-full h-14 w-14"
              onClick={() => setIsAudioEnabled(!isAudioEnabled)}
            >
              {isAudioEnabled ? <Mic className="h-6 w-6" /> : <MicOff className="h-6 w-6" />}
            </Button>

            <Button
              variant={isVideoEnabled ? "secondary" : "destructive"}
              size="lg"
              className="rounded-full h-14 w-14"
              onClick={() => setIsVideoEnabled(!isVideoEnabled)}
            >
              {isVideoEnabled ? <Video className="h-6 w-6" /> : <VideoOff className="h-6 w-6" />}
            </Button>

            <Button variant="destructive" size="lg" className="rounded-full h-14 w-14" onClick={handleEndCall}>
              <PhoneOff className="h-6 w-6" />
            </Button>
          </div>
        </div>

        {/* Self Video Preview */}
        {isVideoEnabled && (
          <div className="absolute top-4 right-4 w-48 h-36 bg-gray-800 rounded-lg overflow-hidden">
            <div className="w-full h-full flex items-center justify-center text-white">
              <p className="text-sm">Your Video</p>
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="h-full">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-[#16697A]">Video Calls</h1>
        <div className="flex gap-2">
          <Button className="text-[#16697A] border-[#16697A] hover:bg-[#16697A] hover:text-white bg-transparent">
            <Calendar className="h-4 w-4 mr-2" />
            Schedule Call
          </Button>
          <Button className="bg-[#82C0CC] hover:bg-[#489FB5] cursor-pointer">
            <Video className="h-4 w-4 mr-2" />
            Start Call
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Quick Stats */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-[#16697A]">
              <Clock className="h-5 w-5" />
              Today's Calls
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-2 text-[#489DB5]">4</div>
            <p className="text-muted-foreground">2 completed, 2 scheduled</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-[#16697A]">
              <Users className="h-5 w-5" />
              Total Patients
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-2 text-[#489DB5]">28</div>
            <p className="text-muted-foreground">Available for calls</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Scheduled Calls */}
        <Card>
          <CardHeader className="text-[#16697A]">
            <CardTitle>Scheduled Calls</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px]">
              <div className="space-y-4">
                {scheduledCalls.map((call) => (
                  <div key={call.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="text-[#16697A]">
                          {call.patientName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-[#489DB5]">{call.patientName}</p>
                        <p className="text-sm text-muted-foreground">{call.scheduledTime}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={call.type === "video" ? "bg-[#FFA62B]" : "bg-[#d5d1cf]"}>
                        {call.type === "video" ? (
                          <Video className="h-3 w-3 mr-1" />
                        ) : (
                          <Phone className="h-3 w-3 mr-1" />
                        )}
                        {call.type}
                      </Badge>
                      <Button size="sm" onClick={() => handleStartCall(call.patientName, call.type)}
                      className="bg-[#82C0CC] hover:bg-[#489FB5] cursor-pointer"
                      >
                        Join
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Call History */}
        <Card>
          <CardHeader>
            <CardTitle className="text-[#16697A]">Recent Calls</CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search call history..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px]">
              <div className="space-y-4">
                {callHistory.map((call) => (
                  <div key={call.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="text-[#16697A]">
                          {call.patientName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-[#489DB5]">{call.patientName}</p>
                        <p className="text-sm text-muted-foreground">{call.timestamp}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        className={
                          call.status === "completed"
                            ? "bg-[#16697A]"
                            : call.status === "missed"
                              ? "bg-[#960018]"
                              : "secondary"
                        }
                      >
                        {call.status}
                      </Badge>
                      <span className="text-sm text-muted-foreground">{call.duration}</span>
                      {call.type === "video" ? (
                        <Video className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Phone className="h-4 w-4 text-muted-foreground" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}