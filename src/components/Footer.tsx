import { Link } from "react-router-dom";
import { Mail } from "lucide-react";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-card mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <h3 className="font-bold text-lg">
              <span className="text-accent-green">Wormi</span>
            </h3>
            <p className="text-sm text-muted-foreground">
              Decentralized vermicomposting for visible circularity.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Navigate</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/events" className="text-muted-foreground hover:text-accent-green transition-colors">
                  Events
                </Link>
              </li>
              <li>
                <Link to="/locations" className="text-muted-foreground hover:text-accent-green transition-colors">
                  Locations
                </Link>
              </li>
              <li>
                <Link to="/education" className="text-muted-foreground hover:text-accent-green transition-colors">
                  Education
                </Link>
              </li>
              <li>
                <Link to="/data" className="text-muted-foreground hover:text-accent-green transition-colors">
                  Data & Transparency
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Get Involved</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/get-involved" className="text-muted-foreground hover:text-accent-green transition-colors">
                  Volunteer
                </Link>
              </li>
              <li>
                <Link to="/get-involved" className="text-muted-foreground hover:text-accent-green transition-colors">
                  Host a Node
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-accent-green transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Contact</h4>
            <a
              href="mailto:hello@wormihub.org"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-accent-green transition-colors"
            >
              <Mail className="h-4 w-4" />
              hello@wormihub.org
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>&copy; {year} Wormi Hub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
