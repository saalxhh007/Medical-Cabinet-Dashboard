"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import axios from "axios";
import { useEffect, useState } from "react";

interface TimelineEvent {
  time: string
  title: string
  type: 'appointment' | 'surgery' | 'break'
}

interface TodayTimelineProps {
  day: Date | undefined
}

const getEventColor = (type: string) => {
  switch (type) {
    case 'surgery':
      return 'bg-medical-danger'
    case 'break':
      return 'bg-medical-warning'
    default:
      return 'bg-medical-primary'
  }
}

export function TodayTimeline({ day }: TodayTimelineProps) {
  const [events, setEvents] = useState<any[]>([])

  const today = new Date()
  const tomorrow = new Date()
  tomorrow.setDate(today.getDate() + 1)

  const todayDate = today.getDate()
  const tomorrowDate = tomorrow.getDate()

  const apiUrl = process.env.NEXT_PUBLIC_DASHBOARD_API_URL

  const fetchEvents = async () => {
    try {
      const response = await axios.post(`${apiUrl}/api/v1/appointment/get/events`, {
        day
      })
      setEvents(response.data)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchEvents()
  }, [day])
  return (
    <Card className="bg-gradient-card shadow-card border-0">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          Timeline - {
            day
              ? day.getDate() === todayDate
                ? "Today"
                : day.getDate() === tomorrowDate
                  ? "Tomorrow"
                  : day.toDateString()
              : "No Date"
          }
        </CardTitle>

      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {events.map((event, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="flex flex-col items-center">
                <div className={`w-3 h-3 rounded-full ${getEventColor(event.type)}`} />
                {index < events.length - 1 && (
                  <div className="w-px h-8 bg-border mt-2" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-foreground">{event.title}</p>
                  <span className="text-xs text-muted-foreground">{event.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}