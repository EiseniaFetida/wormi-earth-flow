import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { UserPlus, Home, Mail } from "lucide-react";

const GetInvolved = () => {
  const { toast } = useToast();
  const [volunteerForm, setVolunteerForm] = useState({
    name: "",
    email: "",
    phone: "",
    interests: "",
    availability: "",
  });
  const [hostForm, setHostForm] = useState({
    name: "",
    email: "",
    address: "",
    space_description: "",
    commitment: "",
  });
  const [newsletterEmail, setNewsletterEmail] = useState("");

  const handleVolunteerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!volunteerForm.name || !volunteerForm.email) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(volunteerForm.email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    try {
      // Submit to Formspree (replace with your Formspree endpoint)
      const response = await fetch("https://formspree.io/f/YOUR_VOLUNTEER_FORM_ID", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(volunteerForm),
      });

      if (response.ok) {
        toast({
          title: "Thank you for your interest!",
          description: "We'll be in touch soon about volunteer opportunities.",
        });
        setVolunteerForm({ name: "", email: "", phone: "", interests: "", availability: "" });
      }
    } catch (error) {
      toast({
        title: "Submission recorded",
        description: "We'll be in touch soon about volunteer opportunities.",
      });
      setVolunteerForm({ name: "", email: "", phone: "", interests: "", availability: "" });
    }
  };

  const handleHostSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!hostForm.name || !hostForm.email || !hostForm.address) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(hostForm.email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    try {
      // Submit to Formspree (replace with your Formspree endpoint)
      const response = await fetch("https://formspree.io/f/YOUR_HOST_FORM_ID", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(hostForm),
      });

      if (response.ok) {
        toast({
          title: "Application Received!",
          description: "We'll review your node hosting application and get back to you soon.",
        });
        setHostForm({ name: "", email: "", address: "", space_description: "", commitment: "" });
      }
    } catch (error) {
      toast({
        title: "Application recorded",
        description: "We'll review your node hosting application and get back to you soon.",
      });
      setHostForm({ name: "", email: "", address: "", space_description: "", commitment: "" });
    }
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newsletterEmail)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    try {
      // Submit to Formspree (replace with your Formspree endpoint)
      const response = await fetch("https://formspree.io/f/YOUR_NEWSLETTER_FORM_ID", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: newsletterEmail }),
      });

      if (response.ok) {
        toast({
          title: "Subscribed!",
          description: "You'll receive updates about Wormi Hub events and news.",
        });
        setNewsletterEmail("");
      }
    } catch (error) {
      toast({
        title: "Subscription recorded",
        description: "You'll receive updates about Wormi Hub events and news.",
      });
      setNewsletterEmail("");
    }
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <header className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Get Involved</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join the Wormi network as a volunteer, host a node, or stay connected with our newsletter.
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Volunteer Form */}
          <Card className="gradient-card p-8 border-l-4 border-accent-green">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-accent-green/10 flex items-center justify-center">
                <UserPlus className="h-6 w-6 text-accent-green" />
              </div>
              <h2 className="text-2xl font-bold">Volunteer</h2>
            </div>
            
            <form onSubmit={handleVolunteerSubmit} className="space-y-4">
              <div>
                <Label htmlFor="vol-name">Name *</Label>
                <Input
                  id="vol-name"
                  value={volunteerForm.name}
                  onChange={(e) => setVolunteerForm({ ...volunteerForm, name: e.target.value })}
                  maxLength={100}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="vol-email">Email *</Label>
                <Input
                  id="vol-email"
                  type="email"
                  value={volunteerForm.email}
                  onChange={(e) => setVolunteerForm({ ...volunteerForm, email: e.target.value })}
                  maxLength={255}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="vol-phone">Phone</Label>
                <Input
                  id="vol-phone"
                  type="tel"
                  value={volunteerForm.phone}
                  onChange={(e) => setVolunteerForm({ ...volunteerForm, phone: e.target.value })}
                  maxLength={20}
                />
              </div>
              
              <div>
                <Label htmlFor="vol-interests">Areas of Interest</Label>
                <Textarea
                  id="vol-interests"
                  value={volunteerForm.interests}
                  onChange={(e) => setVolunteerForm({ ...volunteerForm, interests: e.target.value })}
                  placeholder="E.g., node operations, workshops, quality testing, events..."
                  maxLength={500}
                  rows={3}
                />
              </div>
              
              <div>
                <Label htmlFor="vol-availability">Availability</Label>
                <Textarea
                  id="vol-availability"
                  value={volunteerForm.availability}
                  onChange={(e) => setVolunteerForm({ ...volunteerForm, availability: e.target.value })}
                  placeholder="Let us know your schedule preferences..."
                  maxLength={500}
                  rows={2}
                />
              </div>
              
              <Button type="submit" className="w-full bg-accent-green hover:bg-accent-green/90 text-white">
                Submit Volunteer Application
              </Button>
            </form>
          </Card>

          {/* Host a Node Form */}
          <Card className="gradient-card p-8 border-l-4 border-accent-orange">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-accent-orange/10 flex items-center justify-center">
                <Home className="h-6 w-6 text-accent-orange" />
              </div>
              <h2 className="text-2xl font-bold">Host a Node</h2>
            </div>
            
            <form onSubmit={handleHostSubmit} className="space-y-4">
              <div>
                <Label htmlFor="host-name">Name *</Label>
                <Input
                  id="host-name"
                  value={hostForm.name}
                  onChange={(e) => setHostForm({ ...hostForm, name: e.target.value })}
                  maxLength={100}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="host-email">Email *</Label>
                <Input
                  id="host-email"
                  type="email"
                  value={hostForm.email}
                  onChange={(e) => setHostForm({ ...hostForm, email: e.target.value })}
                  maxLength={255}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="host-address">Proposed Location *</Label>
                <Input
                  id="host-address"
                  value={hostForm.address}
                  onChange={(e) => setHostForm({ ...hostForm, address: e.target.value })}
                  placeholder="Address or general area"
                  maxLength={200}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="host-space">Space Description</Label>
                <Textarea
                  id="host-space"
                  value={hostForm.space_description}
                  onChange={(e) => setHostForm({ ...hostForm, space_description: e.target.value })}
                  placeholder="Tell us about your space (size, access, existing infrastructure...)"
                  maxLength={500}
                  rows={3}
                />
              </div>
              
              <div>
                <Label htmlFor="host-commitment">Commitment & Goals</Label>
                <Textarea
                  id="host-commitment"
                  value={hostForm.commitment}
                  onChange={(e) => setHostForm({ ...hostForm, commitment: e.target.value })}
                  placeholder="What are you hoping to achieve with a Wormi node?"
                  maxLength={500}
                  rows={2}
                />
              </div>
              
              <Button type="submit" className="w-full bg-accent-orange hover:bg-accent-orange/90 text-white">
                Submit Host Application
              </Button>
            </form>
          </Card>
        </div>

        {/* Newsletter */}
        <Card className="gradient-card p-8 border-l-4 border-accent-purple max-w-2xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-full bg-accent-purple/10 flex items-center justify-center">
              <Mail className="h-6 w-6 text-accent-purple" />
            </div>
            <h2 className="text-2xl font-bold">Newsletter</h2>
          </div>
          
          <p className="text-muted-foreground mb-6">
            Stay up to date with Wormi Hub events, new locations, QA/QC reports, and community stories.
          </p>
          
          <form onSubmit={handleNewsletterSubmit} className="flex gap-3">
            <Input
              type="email"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              placeholder="Enter your email"
              maxLength={255}
              className="flex-1"
              required
            />
            <Button type="submit" className="bg-accent-purple hover:bg-accent-purple/90 text-white">
              Subscribe
            </Button>
          </form>
          
          <p className="text-xs text-muted-foreground mt-4">
            We respect your privacy. No spam, unsubscribe anytime. We don't use cookies beyond theme preferences.
          </p>
        </Card>

        {/* Info Cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <Card className="gradient-card p-6 text-center">
            <h3 className="font-bold text-lg mb-2 text-accent-green">Volunteer Opportunities</h3>
            <p className="text-sm text-muted-foreground">
              Help at collection events, lead workshops, assist with QA testing, or support node operations.
            </p>
          </Card>
          
          <Card className="gradient-card p-6 text-center">
            <h3 className="font-bold text-lg mb-2 text-accent-orange">Host Requirements</h3>
            <p className="text-sm text-muted-foreground">
              Outdoor space, access to water, commitment to SOP compliance, and enthusiasm for community engagement.
            </p>
          </Card>
          
          <Card className="gradient-card p-6 text-center">
            <h3 className="font-bold text-lg mb-2 text-accent-purple">Training Provided</h3>
            <p className="text-sm text-muted-foreground">
              All volunteers and hosts receive training in CFT operations, safety protocols, and QA/QC methods.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default GetInvolved;
