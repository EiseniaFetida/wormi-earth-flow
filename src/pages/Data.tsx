import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface Metric {
  key: string;
  label: string;
  value: number | string;
  unit: string;
  as_of: string;
}

interface Batch {
  batch_code: string;
  product: string;
  qc_status: string;
  tests: {
    GI: number | string;
    respiration: string;
    CN: string;
    EC: string;
    pH: string;
  };
  released_at: string | null;
  notes: string;
}

const Data = () => {
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [batches, setBatches] = useState<Batch[]>([]);

  useEffect(() => {
    fetch("/data/metrics.json")
      .then((res) => res.json())
      .then((data) => setMetrics(data));

    fetch("/data/batches.json")
      .then((res) => res.json())
      .then((data) => setBatches(data));
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pass":
        return "bg-accent-green/20 text-accent-green border-accent-green";
      case "pending":
        return "bg-accent-orange/20 text-accent-orange border-accent-orange";
      case "fail":
        return "bg-destructive/20 text-destructive border-destructive";
      default:
        return "";
    }
  };

  const getProductColor = (product: string) => {
    return product === "vermicast"
      ? "bg-accent-purple/20 text-accent-purple border-accent-purple"
      : "bg-accent-green/20 text-accent-green border-accent-green";
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-7xl">
        <header className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Data & Transparency</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Real-time metrics and batch-level quality control data from the Wormi network.
          </p>
        </header>

        {/* Metrics Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Network Metrics</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {metrics.map((metric) => (
              <Card key={metric.key} className="gradient-card p-6 text-center space-y-2">
                <div className="text-4xl font-bold text-accent-green">{metric.value}</div>
                <div className="text-sm text-muted-foreground">{metric.label}</div>
                <div className="text-xs text-muted-foreground">
                  as of {new Date(metric.as_of).toLocaleDateString()}
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Batch Data Section */}
        <section>
          <h2 className="text-3xl font-bold mb-6">Batch Quality Control</h2>
          
          <Card className="gradient-card overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Batch Code</TableHead>
                    <TableHead>Product</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>GI</TableHead>
                    <TableHead>Respiration</TableHead>
                    <TableHead>C:N</TableHead>
                    <TableHead>EC</TableHead>
                    <TableHead>pH</TableHead>
                    <TableHead>Released</TableHead>
                    <TableHead>Notes</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {batches.map((batch) => (
                    <TableRow key={batch.batch_code}>
                      <TableCell className="font-mono text-sm">{batch.batch_code}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={getProductColor(batch.product)}>
                          {batch.product}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={getStatusColor(batch.qc_status)}>
                          {batch.qc_status}
                        </Badge>
                      </TableCell>
                      <TableCell>{batch.tests.GI}</TableCell>
                      <TableCell>{batch.tests.respiration}</TableCell>
                      <TableCell>{batch.tests.CN}</TableCell>
                      <TableCell>{batch.tests.EC}</TableCell>
                      <TableCell>{batch.tests.pH}</TableCell>
                      <TableCell>
                        {batch.released_at
                          ? new Date(batch.released_at).toLocaleDateString()
                          : "—"}
                      </TableCell>
                      <TableCell className="max-w-xs">
                        <span className="text-sm text-muted-foreground">{batch.notes}</span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>
        </section>

        {/* Method Note */}
        <Card className="mt-12 gradient-card p-8 border-l-4 border-accent-purple">
          <h3 className="text-2xl font-bold mb-4 text-accent-purple">Testing Methods</h3>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              <strong>Germination Index (GI):</strong> Measures seed germination and root elongation
              in vermicast extract. A GI ≥80 indicates mature, plant-safe compost. We target ≥90 for
              release.
            </p>
            <p>
              <strong>Respiration Test:</strong> Measures CO₂ evolution rate. "Stable" means respiration
              is below 1 mg CO₂-C/g-OM/day, indicating mature compost. "Active" is acceptable for AVT.
            </p>
            <p>
              <strong>pH & EC (Electrical Conductivity):</strong> pH should be 6.5-7.5 for vermicast;
              AVT typically 6.5-7.2. EC measures soluble salts; high EC (&gt;3.0 mS/cm) may indicate
              contamination or immaturity.
            </p>
            <p>
              <strong>C:N Ratio:</strong> Carbon-to-nitrogen ratio. Mature vermicast typically ranges
              10:1 to 15:1. Not applicable for liquid AVT.
            </p>
            <p className="text-sm italic">
              All tests follow protocols outlined in our QA/QC documentation (see Education page).
              Batches that fail are quarantined and reprocessed. Out-of-spec products are never
              distributed.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Data;
