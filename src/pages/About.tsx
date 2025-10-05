import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Target, Users, Lightbulb, ExternalLink } from "lucide-react";

interface Person {
  name: string;
  role: string;
  link: string | null;
  photo_url: string | null;
}

const About = () => {
  const [people, setPeople] = useState<Person[]>([]);

  useEffect(() => {
    fetch("/data/people.json")
      .then((res) => res.json())
      .then((data) => setPeople(data));
  }, []);

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-5xl">
        <header className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Wormi Hub</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Building a decentralized network for visible, verifiable organic waste circularity.
          </p>
        </header>

        {/* Mission Section */}
        <section className="mb-12">
          <Card className="gradient-card p-8 border-l-4 border-accent-green">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-accent-green/10 flex items-center justify-center">
                <Target className="h-6 w-6 text-accent-green" />
              </div>
              <h2 className="text-3xl font-bold">Mission</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Wormi Hub is a decentralized vermicomposting network that transforms community organic waste
              into high-quality soil amendments through transparent, locally-managed nodes. We believe
              circularity should be visible, verifiable, and accessible to everyone.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              By operating public-facing drop-off and dispensing nodes, running DIY Continuous Flow Through
              (CFT) vermireactors, and releasing QA-verified vermicast and actively aerated vermicompost tea
              (AVT), we demonstrate that effective waste diversion doesn't require industrial infrastructure—just
              good design, community engagement, and rigorous quality control.
            </p>
          </Card>
        </section>

        {/* Theory of Change */}
        <section className="mb-12">
          <Card className="gradient-card p-8 border-l-4 border-accent-purple">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-accent-purple/10 flex items-center justify-center">
                <Lightbulb className="h-6 w-6 text-accent-purple" />
              </div>
              <h2 className="text-3xl font-bold">Theory of Change</h2>
            </div>
            <div className="space-y-4 text-muted-foreground">
              <div>
                <h3 className="font-semibold text-foreground mb-2">1. Make circularity visible</h3>
                <p>
                  When people see where their food scraps go and can access the finished product, they
                  understand the full cycle. Visibility builds trust and participation.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">2. Decentralize operations</h3>
                <p>
                  Multiple small nodes are more resilient, accessible, and community-responsive than
                  centralized facilities. DIY CFT systems can be built and maintained by trained volunteers.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">3. Verify quality rigorously</h3>
                <p>
                  QA/QC testing (GI, respiration, pH/EC) ensures products are safe and effective. Batch
                  labels and transparent data build confidence in decentralized production.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">4. Share knowledge openly</h3>
                <p>
                  SOPs, testing protocols, and DIY guides are freely available. Anyone can replicate a
                  Wormi node. Networks grow through shared learning, not proprietary control.
                </p>
              </div>
            </div>
          </Card>
        </section>

        {/* People Section */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-full bg-accent-orange/10 flex items-center justify-center">
              <Users className="h-6 w-6 text-accent-orange" />
            </div>
            <h2 className="text-3xl font-bold">People & Partners</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {people.map((person) => (
              <Card key={person.name} className="gradient-card p-6">
                <h3 className="font-bold text-xl mb-1">{person.name}</h3>
                <p className="text-muted-foreground mb-3">{person.role}</p>
                {person.link && (
                  <Button asChild variant="outline" size="sm">
                    <a href={person.link} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Learn More
                    </a>
                  </Button>
                )}
              </Card>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <Card className="gradient-card p-8 text-center border-2 border-accent-green/30">
          <h2 className="text-2xl font-bold mb-4">Join the Network</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Interested in starting a node in your community, volunteering, or learning more about our methods?
            We'd love to hear from you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-accent-green hover:bg-accent-green/90 text-white">
              <Link to="/get-involved">Get Involved</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/education">View Resources</Link>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default About;
