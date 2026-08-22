import Link from "next/link"
import { Leaf } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 md:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3 md:col-span-2">
            <Link href="/" className="flex items-center space-x-2">
              <Leaf className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold tracking-tight text-primary">EcoCommute</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              Promoting sustainable transportation for a greener future. Track your impact, earn rewards, and connect with carpoolers.
            </p>
          </div>
          <div>
            <h4 className="font-medium mb-3">Links</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/dashboard" className="hover:text-primary transition-colors">Dashboard</Link>
              </li>
              <li>
                <Link href="/plan" className="hover:text-primary transition-colors">Plan Commute</Link>
              </li>
              <li>
                <Link href="/impact" className="hover:text-primary transition-colors">Your Impact</Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-3">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} EcoCommute. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
