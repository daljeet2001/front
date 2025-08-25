// src/pages/LandingPage.jsx
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { CheckCircle, Code2, Mail, Users } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import FAQAccordian from '../components/FAQAccodian'

export default function LandingPage() {
  return (
    <div className="font-chewy text-gray-900">
{/* Hero Section */}
<section className="relative min-h-[60vh] flex flex-col md:flex-row items-center justify-center">
 
  <div className="w-full md:w-1/2 flex flex-col justify-center md:pl-10 text-center md:text-left mt-6 md:mt-0">
    <h1 className="text-3xl md:text-6xl font-bold mb-4">
      Streamline Your Frontend Interviews
    </h1>
    <p className="text-base md:text-xl mb-6 text-gray-600">
      Recruiters can define tasks, candidates can solve and submit, and you
      can review—all in one place.
    </p>
    <div className="flex gap-4 justify-center md:justify-start">
<Link
  className="bg-black text-white rounded-full px-8 py-3 text-lg font-semibold shadow-md hover:bg-gray-800 transition"
  to="/register"
>
  Get Started
</Link>

    </div>
  </div>
</section>
<FAQAccordian/>






    </div>
  );
}

