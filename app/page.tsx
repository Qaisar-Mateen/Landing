'use client';

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export default function Home() {
  const prefix = "Get Visa for ";
  const countries = ["UAE", "Germany", "Maldives", "Canada", "UK", "Australia"];
  const [placeholderText, setPlaceholderText] = useState(prefix + countries[0]);

  useEffect(() => {
    let idx = 0;
    let charIdx = 0;
    let typing = true;
    let timer: ReturnType<typeof setTimeout>;

    function run() {
      const full = countries[idx];
      if (typing) {
        if (charIdx <= full.length) {
          setPlaceholderText(prefix + full.slice(0, charIdx));
          charIdx++;
          timer = setTimeout(run, 120);
        } else {
          typing = false;
          timer = setTimeout(run, 1200);
        }
      } else {
        if (charIdx >= 0) {
          setPlaceholderText(prefix + full.slice(0, charIdx));
          charIdx--;
          timer = setTimeout(run, 60);
        } else {
          typing = true;
          idx = (idx + 1) % countries.length;
          charIdx = 0;
          timer = setTimeout(run, 300);
        }
      }
    }

    timer = setTimeout(run, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-white dark:bg-black px-4 sm:px-0">
      <div className="text-center space-y-6 max-w-2xl z-5 py-16 sm:py-0">
        <p className="py-1 px-3 bg-zinc-100/30 dark:bg-zinc-900/30 backdrop-blur-sm font-light rounded-full text-zinc-900 dark:text-white inline-block text-sm sm:text-base shadow-m">99% Approval Rate</p>
        <div className="space-y-3">
          <h1 className="text-4xl pb-2 sm:text-7xl tracking-tight bg-clip-text bg-linear-to-r from-primary via-primary to-blue-300 text-transparent font-semibold leading-tight">Visa Made Simple</h1>
          {/* <h3 className="text-4xl sm:text-7xl tracking-tight bg-clip-text bg-linear-to-r from-purple-500 via-pink-500 to-blue-500 text-transparent font-semibold leading-tight"></h3> */}
        </div>
        <p className="text-gray-400 text-lg text-pretty">
          Apply online in minutes with a simplified process designed for faster decisions and higher approval rates.
        </p>

        

        <div className="space-x-3 pt-10">
          <div className="flex items-center justify-center">
            <div className="w-full max-w-xl">
              <label htmlFor="hero-search" className="sr-only">Search</label>
              <div className="relative h-12 shadow-m rounded-full bg-zinc-100/50 dark:bg-zinc-900/50">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-zinc-400" aria-hidden="true" />
                <input id="hero-search" type="search" placeholder={placeholderText} className="w-full h-12 pl-12 pr-4 py-3 bg-transparent rounded-lg text-sm placeholder:text-gray-400 outline-none text-zinc-900 dark:text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
