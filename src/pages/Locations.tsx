import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, CheckCircle, Search } from "lucide-react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface Location {
  id: string;
  name: string;
  type: "dropoff" | "dispense" | "popup";
  address: string;
  city: string;
  hours: string;
  accepted: string;
  rules: string;
  lat: number;
  lng: number;
  active: boolean;
}

const Locations = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [filteredLocations, setFilteredLocations] = useState<Location[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [map, setMap] = useState<L.Map | null>(null);
  const [markers, setMarkers] = useState<L.Marker[]>([]);

  useEffect(() => {
    fetch("/data/locations.json")
      .then((res) => res.json())
      .then((data) => {
        setLocations(data);
        setFilteredLocations(data);
      });
  }, []);

  useEffect(() => {
    if (locations.length === 0) return;

    const mapInstance = L.map("map").setView([38.0293, -78.4767], 12);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(mapInstance);

    setMap(mapInstance);

    return () => {
      mapInstance.remove();
    };
  }, [locations]);

  useEffect(() => {
    if (!map) return;

    // Remove existing markers
    markers.forEach((marker) => marker.remove());

    // Add new markers
    const newMarkers = filteredLocations.map((loc) => {
      const iconColor =
        loc.type === "dropoff" ? "#10b981" : loc.type === "dispense" ? "#f97316" : "#a855f7";

      const icon = L.divIcon({
        className: "custom-marker",
        html: `<div style="background-color: ${iconColor}; width: 24px; height: 24px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
        iconSize: [24, 24],
        iconAnchor: [12, 12],
      });

      const marker = L.marker([loc.lat, loc.lng], { icon }).addTo(map);

      marker.bindPopup(`
        <div style="min-width: 200px;">
          <h3 style="font-weight: bold; margin-bottom: 8px; font-size: 16px;">${loc.name}</h3>
          <p style="margin-bottom: 4px; font-size: 13px;"><strong>Type:</strong> ${loc.type}</p>
          <p style="margin-bottom: 4px; font-size: 13px;"><strong>Hours:</strong> ${loc.hours}</p>
          <p style="font-size: 13px;"><strong>Address:</strong> ${loc.address}</p>
        </div>
      `);

      return marker;
    });

    setMarkers(newMarkers);
  }, [map, filteredLocations]);

  useEffect(() => {
    let filtered = locations;

    if (typeFilter !== "all") {
      filtered = filtered.filter((loc) => loc.type === typeFilter);
    }

    if (searchTerm.trim()) {
      filtered = filtered.filter(
        (loc) =>
          loc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          loc.address.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredLocations(filtered);
  }, [typeFilter, searchTerm, locations]);

  const getTypeColor = (type: string) => {
    switch (type) {
      case "dropoff":
        return "text-accent-green border-accent-green bg-accent-green/10";
      case "dispense":
        return "text-accent-orange border-accent-orange bg-accent-orange/10";
      case "popup":
        return "text-accent-purple border-accent-purple bg-accent-purple/10";
      default:
        return "";
    }
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-7xl">
        <header className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Locations</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Find drop-off nodes, dispensing stations, and pop-up locations near you.
          </p>
        </header>

        {/* Map */}
        <Card className="mb-8 overflow-hidden">
          <div id="map" className="w-full h-[500px]"></div>
        </Card>

        {/* Filters */}
        <div className="mb-6 flex flex-col md:flex-row gap-4">
          <div className="flex gap-2 flex-wrap">
            <Button
              variant={typeFilter === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setTypeFilter("all")}
              className={typeFilter === "all" ? "bg-accent-green hover:bg-accent-green/90" : ""}
            >
              All
            </Button>
            <Button
              variant={typeFilter === "dropoff" ? "default" : "outline"}
              size="sm"
              onClick={() => setTypeFilter("dropoff")}
              className={typeFilter === "dropoff" ? "bg-accent-green hover:bg-accent-green/90" : ""}
            >
              Drop-off
            </Button>
            <Button
              variant={typeFilter === "dispense" ? "default" : "outline"}
              size="sm"
              onClick={() => setTypeFilter("dispense")}
              className={typeFilter === "dispense" ? "bg-accent-orange hover:bg-accent-orange/90 text-white" : ""}
            >
              Dispense
            </Button>
            <Button
              variant={typeFilter === "popup" ? "default" : "outline"}
              size="sm"
              onClick={() => setTypeFilter("popup")}
              className={typeFilter === "popup" ? "bg-accent-purple hover:bg-accent-purple/90 text-white" : ""}
            >
              Pop-up
            </Button>
          </div>
          <div className="relative flex-1 md:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name or address..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Locations List */}
        <div className="grid md:grid-cols-2 gap-6">
          {filteredLocations.map((loc) => (
            <Card key={loc.id} className="gradient-card p-6 space-y-4">
              <div className="flex items-start justify-between">
                <h3 className="font-bold text-xl">{loc.name}</h3>
                {loc.active && (
                  <CheckCircle className="h-5 w-5 text-accent-green flex-shrink-0" />
                )}
              </div>

              <span
                className={`inline-block text-xs px-3 py-1 rounded-full border ${getTypeColor(
                  loc.type
                )}`}
              >
                {loc.type}
              </span>

              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">{loc.address}</span>
                </div>
                <div className="flex items-start gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">{loc.hours}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-border space-y-2">
                <div>
                  <span className="font-semibold text-sm">Accepted:</span>
                  <p className="text-sm text-muted-foreground mt-1">{loc.accepted}</p>
                </div>
                <div>
                  <span className="font-semibold text-sm">Rules:</span>
                  <p className="text-sm text-muted-foreground mt-1">{loc.rules}</p>
                </div>
              </div>

              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={() => {
                  const marker = markers.find(
                    (m) => m.getLatLng().lat === loc.lat && m.getLatLng().lng === loc.lng
                  );
                  if (marker && map) {
                    map.setView([loc.lat, loc.lng], 15);
                    marker.openPopup();
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }
                }}
              >
                View on Map
              </Button>
            </Card>
          ))}
        </div>

        {filteredLocations.length === 0 && (
          <Card className="p-12 text-center">
            <p className="text-muted-foreground">No locations found matching your criteria.</p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Locations;
