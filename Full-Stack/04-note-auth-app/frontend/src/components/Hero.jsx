import { ArrowRight, Zap } from "lucide-react";
import React from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { getData } from "@/context/userContext";

const Hero = () => {
  const { user, authLoading } = getData();
  const navigate = useNavigate();
  return (
    <div className="relative w-full md:h-165 h-screen bg-gray-100 overflow-hidden">
      <section className=" w-full py-12 md:py-24 lg:py-32 xl:py-28 ">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            {authLoading ? (
              <div className="h-8 w-48 bg-gray-200 animate-pulse rounded-lg mb-10" />
            ) : (
              user && (
                <h1 className="font-bold mb-10 text-center text-2xl">
                  Welcome {user.fullName}
                </h1>
              )
            )}
            <div className="space-y-2">
              <Badge variant="secondary" className="mb-6 border border-black">
                <Zap className="w-3 h-3 mr-1" />
                New: AI-powered note organization
              </Badge>
              <h1 className="text-orange-600 lg:mb-6 text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                Your thoughts, organized and accessible
                <span className="text-gray-800"> everywhere</span>
              </h1>
              <p className="mx-auto lg:mb-4 max-w-175 text-muted-foreground md:text-xl">
                Capture ideas, organize thoughts, and collaborate seamlessly.
                The modern note-taking app that grows with you and keeps your
                ideas secure in the cloud.
              </p>
            </div>
            <div className="space-x-4">
              <Button
                onClick={() => navigate("/notes")}
                size="lg"
                className="h-12 px-8 relative cursor-pointer bg-orange-600 hover:bg-orange-500"
              >
                Start Taking Notes
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="h-12 px-8 bg-white cursor-pointer"
                onClick={() => navigate("/watch-demo")}
              >
                Watch Demo
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              Free forever • No credit card required • 2 minutes setup
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
