import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Menu, X, Sparkles, ChevronDown, Briefcase, Users, Building2, BookOpen, Globe } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";

const Header = () => {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  const NavItem = ({ to, children, active }) => (
    <Link
      to={to}
      className={`text-sm font-medium transition-colors ${
        active ? "text-brand-700" : "text-slate-600 hover:text-slate-900"
      }`}
    >
      {children}
    </Link>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/70 bg-white/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="relative h-9 w-9 rounded-xl bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center shadow-sm">
              <Sparkles className="h-5 w-5 text-white" strokeWidth={2.5} />
            </div>
            <div className="font-display text-xl font-bold text-slate-900">
              vizarto<span className="text-brand-600">.</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium text-slate-600 hover:text-slate-900 outline-none">
                For Candidates <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-64">
                <DropdownMenuItem asChild>
                  <Link to="/jobs" className="flex items-start gap-3 py-2">
                    <Briefcase className="h-4 w-4 mt-0.5 text-brand-600" />
                    <div>
                      <div className="text-sm font-medium">Browse Jobs</div>
                      <div className="text-xs text-slate-500">15,000+ AI-matched roles</div>
                    </div>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/candidates/signup" className="flex items-start gap-3 py-2">
                    <Sparkles className="h-4 w-4 mt-0.5 text-brand-600" />
                    <div>
                      <div className="text-sm font-medium">Build Skill Profile</div>
                      <div className="text-xs text-slate-500">Import from LinkedIn / GitHub</div>
                    </div>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-start gap-3 py-2">
                  <BookOpen className="h-4 w-4 mt-0.5 text-brand-600" />
                  <div>
                    <div className="text-sm font-medium">Career Resources</div>
                    <div className="text-xs text-slate-500">Guides, interviews, salaries</div>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium text-slate-600 hover:text-slate-900 outline-none">
                For Employers <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-64">
                <DropdownMenuItem asChild>
                  <Link to="/candidates" className="flex items-start gap-3 py-2">
                    <Users className="h-4 w-4 mt-0.5 text-brand-600" />
                    <div>
                      <div className="text-sm font-medium">Search Candidates</div>
                      <div className="text-xs text-slate-500">85,000+ verified talent</div>
                    </div>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/employers/post-job" className="flex items-start gap-3 py-2">
                    <Building2 className="h-4 w-4 mt-0.5 text-brand-600" />
                    <div>
                      <div className="text-sm font-medium">Post a Job</div>
                      <div className="text-xs text-slate-500">AI-crafted job descriptions</div>
                    </div>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-start gap-3 py-2">
                  <Sparkles className="h-4 w-4 mt-0.5 text-brand-600" />
                  <div>
                    <div className="text-sm font-medium">AI Matching Engine</div>
                    <div className="text-xs text-slate-500">See how ranking works</div>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <NavItem to="/jobs" active={pathname === "/jobs"}>Jobs</NavItem>
            <NavItem to="/candidates" active={pathname === "/candidates"}>Talent</NavItem>
            <NavItem to="/pricing" active={pathname === "/pricing"}>Pricing</NavItem>
          </nav>

          {/* Right actions */}
          <div className="hidden md:flex items-center gap-3">
            <button className="flex items-center gap-1.5 text-sm text-slate-600 hover:text-slate-900">
              <Globe className="h-4 w-4" /> EN
            </button>
            <Button variant="ghost" className="text-slate-700">Sign in</Button>
            <Link to="/candidates/signup">
              <Button className="bg-slate-900 hover:bg-slate-800 text-white rounded-full px-5">
                Get started
              </Button>
            </Link>
          </div>

          {/* Mobile toggle */}
          <button className="md:hidden p-2 text-slate-700" onClick={() => setOpen(!open)}>
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-slate-200 bg-white">
          <div className="px-5 py-4 space-y-3">
            <Link to="/jobs" className="block py-2 text-slate-700 font-medium">Browse Jobs</Link>
            <Link to="/candidates" className="block py-2 text-slate-700 font-medium">Search Talent</Link>
            <Link to="/pricing" className="block py-2 text-slate-700 font-medium">Pricing</Link>
            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
              <Button variant="ghost" className="w-full justify-start">Sign in</Button>
              <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white rounded-full">
                Get started
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
