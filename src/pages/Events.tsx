import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, MapPin, Download, Filter } from "lucide-react";
import { downloadICS } from "@/utils/icsGenerator";

interface Event {
  id: string;
  title: string;
  type: string;
  start: string;
  end: string;
  venue: string;
  address: string;
  city: string;
  state: string;
  description: string;
  registration_url?: string;
}

const Events = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [typeFilter, setTypeFilter] = useState<string>("All");
  const [cityFilter, setCityFilter] = useState<string>("");

  useEffect(() => {
    fetch("/data/events.json")
      .then((res) => res.json())
      .then((data) => {
        const sorted = data.sort(
          (a: Event, b: Event) => new Date(a.start).getTime() - new Date(b.start).getTime()
        );
        setEvents(sorted);
        setFilteredEvents(sorted);
      });
  }, []);

  useEffect(() => {
    let filtered = events;

    if (typeFilter !== "All") {
      filtered = filtered.filter((e) => e.type === typeFilter);
    }

    if (cityFilter.trim()) {
      filtered = filtered.filter((e) =>
        e.city.toLowerCase().includes(cityFilter.toLowerCase())
      );
    }

    setFilteredEvents(filtered);
  }, [typeFilter, cityFilter, events]);

  const handleDownloadICS = (event: Event) => {
    downloadICS(
      {
        title: event.title,
        description: event.description,
        location: `${event.venue}, ${event.address}, ${event.city}, ${event.state}`,
        start: new Date(event.start),
        end: new Date(event.end),
        url: event.registration_url,
      },
      `${event.id}.ics`
    );
  };

  const types = ["All", "Workshop", "Pop-up", "Volunteer Shift"];

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <header className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Events</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join workshops, pop-ups, and volunteer shifts across the Wormi network.
          </p>
        </header>

        {/* Filters */}
        <div className="mb-8 flex flex-col md:flex-row gap-4">
          <div className="flex gap-2 flex-wrap">
            <Filter className="h-5 w-5 text-muted-foreground mt-2" />
            {types.map((type) => (
              <Button
                key={type}
                variant={typeFilter === type ? "default" : "outline"}
                size="sm"
                onClick={() => setTypeFilter(type)}
                className={typeFilter === type ? "bg-accent-green hover:bg-accent-green/90" : ""}
              >
                {type}
              </Button>
            ))}
          </div>
          <Input
            placeholder="Search by city..."
            value={cityFilter}
            onChange={(e) => setCityFilter(e.target.value)}
            className="md:max-w-xs"
          />
        </div>

        {/* Events List */}
        <div className="space-y-6">
          {filteredEvents.length === 0 ? (
            <Card className="p-12 text-center">
              <p className="text-muted-foreground">No events found matching your filters.</p>
            </Card>
          ) : (
            filteredEvents.map((event) => (
              <Card key={event.id} className="gradient-card p-6 border-l-4 border-accent-green">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-start gap-3">
                      <Calendar className="h-5 w-5 text-accent-green mt-1 flex-shrink-0" />
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">
                          {new Date(event.start).toLocaleDateString("en-US", {
                            weekday: "long",
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          })}{" "}
                          •{" "}
                          {new Date(event.start).toLocaleTimeString("en-US", {
                            hour: "numeric",
                            minute: "2-digit",
                          })}{" "}
                          -{" "}
                          {new Date(event.end).toLocaleTimeString("en-US", {
                            hour: "numeric",
                            minute: "2-digit",
                          })}
                        </div>
                        <h3 className="font-bold text-xl mb-2">{event.title}</h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                          <MapPin className="h-4 w-4" />
                          <span>
                            {event.venue} • {event.address}, {event.city}, {event.state}
                          </span>
                        </div>
                        <p className="text-muted-foreground">{event.description}</p>
                        <span className="inline-block mt-3 text-xs px-3 py-1 rounded-full bg-accent-purple/20 text-accent-purple border border-accent-purple/30">
                          {event.type}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 md:ml-4">
                    <Button
                      onClick={() => handleDownloadICS(event)}
                      variant="outline"
                      size="sm"
                      className="whitespace-nowrap"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Add to Calendar
                    </Button>
                    {event.registration_url && (
                      <Button
                        asChild
                        size="sm"
                        className="bg-accent-orange hover:bg-accent-orange/90 text-white whitespace-nowrap"
                      >
                        <a href={event.registration_url} target="_blank" rel="noopener noreferrer">
                          Register
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Events;
