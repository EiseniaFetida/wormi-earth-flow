import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileText, Search, Download } from "lucide-react";

interface Resource {
  id: string;
  title: string;
  category: string;
  summary: string;
  file_url: string;
  version: string;
}

const Education = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [filteredResources, setFilteredResources] = useState<Resource[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  useEffect(() => {
    fetch("/data/resources.json")
      .then((res) => res.json())
      .then((data) => {
        setResources(data);
        setFilteredResources(data);
      });
  }, []);

  useEffect(() => {
    let filtered = resources;

    if (categoryFilter !== "All") {
      filtered = filtered.filter((r) => r.category === categoryFilter);
    }

    if (searchTerm.trim()) {
      filtered = filtered.filter(
        (r) =>
          r.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          r.summary.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredResources(filtered);
  }, [categoryFilter, searchTerm, resources]);

  const categories = ["All", "SOP", "QA/QC", "DIY CFT", "Safety", "Education"];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "SOP":
        return "text-accent-green border-accent-green bg-accent-green/10";
      case "QA/QC":
        return "text-accent-purple border-accent-purple bg-accent-purple/10";
      case "DIY CFT":
        return "text-accent-orange border-accent-orange bg-accent-orange/10";
      case "Safety":
        return "text-destructive border-destructive bg-destructive/10";
      default:
        return "text-muted-foreground border-muted bg-muted/10";
    }
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <header className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Education & Resources</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            SOPs, QA/QC protocols, DIY guides, and educational materials for the Wormi network.
          </p>
        </header>

        {/* Filters */}
        <div className="mb-8 flex flex-col md:flex-row gap-4">
          <div className="flex gap-2 flex-wrap">
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={categoryFilter === cat ? "default" : "outline"}
                size="sm"
                onClick={() => setCategoryFilter(cat)}
                className={
                  categoryFilter === cat ? "bg-accent-green hover:bg-accent-green/90" : ""
                }
              >
                {cat}
              </Button>
            ))}
          </div>
          <div className="relative flex-1 md:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search resources..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Resources Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {filteredResources.length === 0 ? (
            <Card className="col-span-2 p-12 text-center">
              <p className="text-muted-foreground">No resources found matching your criteria.</p>
            </Card>
          ) : (
            filteredResources.map((resource) => (
              <Card key={resource.id} className="gradient-card p-6 space-y-4 border-l-4 border-accent-green">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3 flex-1">
                    <FileText className="h-6 w-6 text-accent-green flex-shrink-0 mt-1" />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-xl mb-2">{resource.title}</h3>
                      <span
                        className={`inline-block text-xs px-3 py-1 rounded-full border ${getCategoryColor(
                          resource.category
                        )}`}
                      >
                        {resource.category}
                      </span>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    {resource.version}
                  </span>
                </div>

                <p className="text-muted-foreground">{resource.summary}</p>

                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="w-full"
                >
                  <a href={resource.file_url} target="_blank" rel="noopener noreferrer">
                    <Download className="h-4 w-4 mr-2" />
                    Open PDF
                  </a>
                </Button>
              </Card>
            ))
          )}
        </div>

        {/* Note Section */}
        <Card className="mt-12 gradient-card p-8 border-l-4 border-accent-purple">
          <h3 className="text-2xl font-bold mb-4 text-accent-purple">
            Contributing to Our Knowledge Base
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            These resources are living documents maintained by the Wormi community. If you have
            suggestions, corrections, or new protocols to share, please get in touch. Our SOPs and
            QA/QC methods evolve as we learn from each node and season.
          </p>
          <p className="text-sm text-muted-foreground italic">
            Note: All PDFs are version-controlled. Check back periodically for updates, especially
            after seasonal adjustments or new research findings.
          </p>
        </Card>
      </div>
    </div>
  );
};

export default Education;
