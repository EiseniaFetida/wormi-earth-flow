import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Recycle, FlaskConical, Sprout, Calendar } from "lucide-react";

interface Event {
  id: string;
  title: string;
  type: string;
  start: string;
  venue: string;
  city: string;
}

interface Metric {
  key: string;
  label: string;
  value: number | string;
  unit: string;
  as_of: string;
}

const Index = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [metrics, setMetrics] = useState<Metric[]>([]);

  useEffect(() => {
    fetch("/data/events.json")
      .then((res) => res.json())
      .then((data) => {
        const upcoming = data
          .filter((e: Event) => new Date(e.start) > new Date())
          .sort((a: Event, b: Event) => new Date(a.start).getTime() - new Date(b.start).getTime())
          .slice(0, 3);
        setEvents(upcoming);
      });

    fetch("/data/metrics.json")
      .then((res) => res.json())
      .then((data) => setMetrics(data));
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="gradient-hero py-24 px-4">
        <div className="container mx-auto text-center space-y-6">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground">
            eat dirt
          </h1>
          <p className="text-xl md:text-2xl text-foreground/90 max-w-2xl mx-auto">
            not trash
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button asChild size="lg" className="bg-accent-green hover:bg-accent-green/90 text-white">
              <Link to="/locations">
                feed soil <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-2">
              <Link to="/events">
                enter wormhole
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="gradient-card p-8 text-center space-y-4 border-2 border-accent-green/20 hover:border-accent-green/50 transition-all">
              <div className="w-16 h-16 mx-auto rounded-full bg-accent-green/10 flex items-center justify-center">
                <Recycle className="h-8 w-8 text-accent-green" />
              </div>
              <h3 className="text-2xl font-bold text-accent-green">Collect</h3>
              <p className="text-muted-foreground">
                Drop off food scraps at public nodes. Biofiltered, ≤24h dwell time, clear rules posted.
              </p>
            </Card>

            <Card className="gradient-card p-8 text-center space-y-4 border-2 border-accent-purple/20 hover:border-accent-purple/50 transition-all">
              <div className="w-16 h-16 mx-auto rounded-full bg-accent-purple/10 flex items-center justify-center">
                <FlaskConical className="h-8 w-8 text-accent-purple" />
              </div>
              <h3 className="text-2xl font-bold text-accent-purple">Process</h3>
              <p className="text-muted-foreground">
                DIY CFT vermireactors transform organics into premium vermicast and AVT with full QA/QC.
              </p>
            </Card>

            <Card className="gradient-card p-8 text-center space-y-4 border-2 border-accent-orange/20 hover:border-accent-orange/50 transition-all">
              <div className="w-16 h-16 mx-auto rounded-full bg-accent-orange/10 flex items-center justify-center">
                <Sprout className="h-8 w-8 text-accent-orange" />
              </div>
              <h3 className="text-2xl font-bold text-accent-orange">Apply</h3>
              <p className="text-muted-foreground">
                Dispense QA-verified products with batch labels. GI/respiration tested, pH/EC monitored.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Metrics Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Impact Metrics</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {metrics.map((metric) => (
              <Card key={metric.key} className="gradient-card p-6 text-center space-y-2">
                <div className="text-4xl font-bold text-accent-green">
                  {metric.value}
                </div>
                <div className="text-sm text-muted-foreground">{metric.label}</div>
                <div className="text-xs text-muted-foreground">
                  as of {new Date(metric.as_of).toLocaleDateString()}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Upcoming in Charlottesville</h2>
            <Button asChild variant="outline">
              <Link to="/events">View All Events</Link>
            </Button>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {events.map((event) => (
              <Card key={event.id} className="gradient-card p-6 space-y-3 border-l-4 border-accent-green">
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-accent-green mt-1 flex-shrink-0" />
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">
                      {new Date(event.start).toLocaleDateString("en-US", {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </div>
                    <h3 className="font-semibold text-lg mb-1">{event.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {event.venue}, {event.city}
                    </p>
                    <span className="inline-block mt-2 text-xs px-2 py-1 rounded-full bg-accent-purple/20 text-accent-purple border border-accent-purple/30">
                      {event.type}
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* QA/QC Note */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <Card className="gradient-card p-8 border-l-4 border-accent-purple">
            <h3 className="text-2xl font-bold mb-4 text-accent-purple">Quality Assurance & Control</h3>
            <p className="text-muted-foreground leading-relaxed">
              Every batch of vermicast and AVT undergoes rigorous testing before release. We measure maturity 
              through germination index (GI) and respiration tests, monitor pH and electrical conductivity (EC), 
              and apply unique batch labels for full traceability. Products that don't meet our standards are 
              quarantined and reprocessed. Transparency is core to building trust in decentralized systems.
            </p>
            <Button asChild variant="outline" className="mt-6">
              <Link to="/data">View Batch Data</Link>
            </Button>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Index;
