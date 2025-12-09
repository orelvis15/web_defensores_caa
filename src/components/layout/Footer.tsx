import { Link } from "react-router-dom";
import { Mail, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container-wide py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                <svg
                  viewBox="0 0 40 40"
                  className="w-6 h-6"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20 4L6 10V20C6 28.284 12.716 35 20 38C27.284 35 34 28.284 34 20V10L20 4Z"
                    fill="white"
                    fillOpacity="0.2"
                    stroke="white"
                    strokeWidth="2"
                  />
                  <path
                    d="M15 18C17 16 20 15 23 16C25 17 26 19 25 21C24 23 21 24 18 23L14 26L16 22L15 18Z"
                    fill="white"
                  />
                </svg>
              </div>
              <div>
                <span className="font-bold block">Defenders of the CAA</span>
                <span className="text-sm opacity-80">and Freedom, Inc.</span>
              </div>
            </div>
            <p className="text-sm opacity-80 mb-4">
              A non-partisan, community-based non-profit organization defending
              the rights of Cuban migrants through education, advocacy, and
              community support.
            </p>
            <div className="flex flex-col gap-2 text-sm opacity-80">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>Florida, United States</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>contact@defenderscaa.org</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm opacity-80">
              <li>
                <Link to="/about" className="hover:opacity-100 transition-opacity">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/our-work" className="hover:opacity-100 transition-opacity">
                  Our Work
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:opacity-100 transition-opacity">
                  Blog & News
                </Link>
              </li>
              <li>
                <Link to="/resources" className="hover:opacity-100 transition-opacity">
                  Resources
                </Link>
              </li>
            </ul>
          </div>

          {/* Get Involved */}
          <div>
            <h4 className="font-semibold mb-4">Get Involved</h4>
            <ul className="space-y-2 text-sm opacity-80">
              <li>
                <Link to="/take-action" className="hover:opacity-100 transition-opacity">
                  Donate
                </Link>
              </li>
              <li>
                <Link to="/get-involved" className="hover:opacity-100 transition-opacity">
                  Become a Member
                </Link>
              </li>
              <li>
                <Link to="/get-involved" className="hover:opacity-100 transition-opacity">
                  Volunteer
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:opacity-100 transition-opacity">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <p className="text-sm opacity-80 mb-4">
              Defenders of the CAA and Freedom, Inc. is a non-profit
              organization under Chapter 617 of the Florida Statutes, eligible
              for 501(c)(3) status.
            </p>
            <p className="text-xs opacity-60">
              This website does not provide legal advice. For legal counsel,
              please consult a licensed attorney.
            </p>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm opacity-60">
            © {new Date().getFullYear()} Defenders of the CAA and Freedom, Inc.
            All rights reserved.
          </p>
          <div className="flex gap-6 text-sm opacity-60">
            <Link to="/privacy" className="hover:opacity-100 transition-opacity">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:opacity-100 transition-opacity">
              Terms of Use
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
