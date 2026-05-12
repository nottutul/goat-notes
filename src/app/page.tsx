import { getUser } from "@/auth/server";
import Link from "next/link";
import { ArrowRight, Sparkles, Shield, Zap } from "lucide-react";

export default async function Home() {
  const user = await getUser();

  return (
    <div className="relative flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] overflow-hidden bg-background">
      {/* Background gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/4 -right-1/4 w-[500px] h-[500px] rounded-full bg-primary/20 blur-[100px] opacity-60 dark:opacity-20"></div>
        <div className="absolute -bottom-1/4 -left-1/4 w-[500px] h-[500px] rounded-full bg-blue-500/20 blur-[100px] opacity-60 dark:opacity-20"></div>
      </div>

      <div className="z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center mt-12 md:mt-0 py-12">
        {/* Badge */}
        <div className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-8 backdrop-blur-sm">
          <Sparkles className="h-4 w-4 mr-2" />
          <span>The modern way to take notes</span>
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
          Capture your thoughts with{" "}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-blue-600 dark:from-primary dark:to-blue-400">
            Goat Notes
          </span>
        </h1>

        {/* Subheadline */}
        <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mb-10 leading-relaxed">
          A seamless, beautiful, and blazing fast note-taking experience designed to help you focus on what matters most.
        </p>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Link
            href={user ? "/mynotes" : "/login"}
            className="group inline-flex h-12 items-center justify-center rounded-full bg-primary px-8 text-base font-medium text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:scale-105 hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {user ? "Go to My Notes" : "Get Started"}
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="https://github.com/nottutul/goat-notes"
            target="_blank"
            className="inline-flex h-12 items-center justify-center rounded-full border border-input bg-background/50 backdrop-blur-sm px-8 text-base font-medium shadow-sm transition-all hover:bg-accent hover:text-accent-foreground hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            View GitHub
          </Link>
        </div>

        {/* Features Preview */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 shadow-sm transition-all hover:shadow-md hover:border-border hover:-translate-y-1">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
              <Zap className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Blazing Fast</h3>
            <p className="text-muted-foreground">Experience zero latency when writing and organizing your thoughts.</p>
          </div>
          <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 shadow-sm transition-all hover:shadow-md hover:border-border hover:-translate-y-1">
            <div className="h-12 w-12 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 mb-4">
              <Shield className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Secure & Private</h3>
            <p className="text-muted-foreground">Your notes are encrypted and securely stored in the cloud.</p>
          </div>
          <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 shadow-sm transition-all hover:shadow-md hover:border-border hover:-translate-y-1">
            <div className="h-12 w-12 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-500 mb-4">
              <Sparkles className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Beautiful UI</h3>
            <p className="text-muted-foreground">A distraction-free interface that lets your ideas shine brilliantly.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

 