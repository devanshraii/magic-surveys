import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Wand2, Edit, BarChart2 } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-16 flex items-center bg-white border-b">
        <Link href="#" className="flex items-center justify-center">
          <Wand2 className="h-6 w-6 text-indigo-600" />
          <span className="ml-2 text-xl font-bold">Magic Surveys</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Button asChild variant="ghost">
            <Link href="/sign-in">Sign In</Link>
          </Button>
          <Button asChild className="bg-indigo-600 hover:bg-indigo-700">
            <Link href="/sign-up">Get Started</Link>
          </Button>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-slate-50">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Create Engaging Surveys in Seconds with AI
                  </h1>
                  <p className="max-w-[600px] text-slate-500 md:text-xl">
                    Magic Surveys uses the power of Gemini to generate relevant questions instantly. Go from idea to feedback faster than ever before.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild size="lg" className="bg-indigo-600 hover:bg-indigo-700">
                    <Link href="/sign-up">Create Your First Survey</Link>
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-center">
                  <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-xl">
                      <h3 className="font-bold mb-2">Topic: Employee Feedback on Work Culture</h3>
                      <div className="space-y-3 mt-4 text-sm">
                          <div className="p-3 bg-indigo-50 rounded-md">How would you rate our company's communication?</div>
                          <div className="p-3 bg-slate-100 rounded-md">Are you satisfied with the professional development opportunities?</div>
                          <div className="p-3 bg-slate-100 rounded-md">Do you feel valued and recognized for your contributions?</div>
                      </div>
                  </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-slate-100 px-3 py-1 text-sm">Key Features</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">A Smarter Way to Gather Insights</h2>
                <p className="max-w-[900px] text-slate-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our platform is designed for speed and simplicity, without compromising on quality.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <div className="grid gap-1 text-center">
                <Wand2 className="h-10 w-10 mx-auto text-indigo-600"/>
                <h3 className="text-xl font-bold">Instant Question Generation</h3>
                <p className="text-slate-500">Just provide a topic and let our AI create a complete MCQ survey for you.</p>
              </div>
              <div className="grid gap-1 text-center">
                <Edit className="h-10 w-10 mx-auto text-indigo-600"/>
                <h3 className="text-xl font-bold">Full Customization</h3>
                <p className="text-slate-500">Easily edit, delete, or add your own questions to tailor the survey to your exact needs.</p>
              </div>
              <div className="grid gap-1 text-center">
                <BarChart2 className="h-10 w-10 mx-auto text-indigo-600"/>
                <h3 className="text-xl font-bold">Simple Analytics</h3>
                <p className="text-slate-500">View clean, easy-to-understand charts and percentages for all collected responses.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-slate-500">&copy; {new Date().getFullYear()} Magic Surveys. All rights reserved.</p>
      </footer>
    </div>
  );
}