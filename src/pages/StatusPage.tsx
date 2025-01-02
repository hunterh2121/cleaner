// src/pages/StatusPage.tsx
import React from "react";
import {
  AlertTriangle,
  Construction,
  Clock,
  Home,
  RefreshCcw,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

type StatusType =
  | "404"
  | "500"
  | "maintenance"
  | "coming-soon"
  | "success"
  | "unauthorized";

interface StatusPageProps {
  type?: StatusType;
}

const StatusPage: React.FC<StatusPageProps> = ({ type = "404" }) => {
  const navigate = useNavigate();

  const content = {
    "404": {
      icon: <AlertTriangle className="h-16 w-16 text-yellow-500" />,
      title: "Oops! Did someone say window cleaning?",
      message:
        "Because this page seems to have vanished into thin air! Let's get you back on track.",
      action: "Back to Homepage",
    },
    "500": {
      icon: <AlertTriangle className="h-16 w-16 text-red-500" />,
      title: "Well, this is embarrassing...",
      message:
        "Our systems are having a moment. Give us a second to polish things up!",
      action: "Try Again",
    },
    maintenance: {
      icon: <Construction className="h-16 w-16 text-blue-500" />,
      title: "Quick Clean-up in Progress!",
      message:
        "Just like a spotless window, we'll be crystal clear again very soon.",
      action: "Check Status",
    },
    "coming-soon": {
      icon: <Clock className="h-16 w-16 text-blue-500" />,
      title: "Something Sparkling is Coming!",
      message: "We're putting the finishing touches on something special.",
      action: "Notify Me",
    },
    success: {
      icon: <CheckCircle2 className="h-16 w-16 text-green-500" />,
      title: "Everything's Crystal Clear!",
      message: "Your request has been successfully processed.",
      action: "View Details",
    },
    unauthorized: {
      icon: <AlertTriangle className="h-16 w-16 text-orange-500" />,
      title: "Hold Up! VIP Area",
      message:
        "Looks like you need special access for this area. Let's get you sorted.",
      action: "Login",
    },
  };

  const { icon, title, message, action } = content[type];

  const handleAction = () => {
    switch (type) {
      case "404":
        navigate("/");
        break;
      case "500":
        window.location.reload();
        break;
      case "maintenance":
      case "coming-soon":
        // Add notification logic
        break;
      case "success":
        // Add details view logic
        break;
      case "unauthorized":
        navigate("/login");
        break;
      default:
        navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="max-w-md w-full">
        <CardContent className="pt-6 text-center">
          <div className="mx-auto flex justify-center mb-4">{icon}</div>

          <h1 className="text-2xl font-bold text-gray-900 mb-4">{title}</h1>

          <p className="text-gray-600 mb-8">{message}</p>

          <div className="flex justify-center gap-4">
            {type !== "404" && (
              <Button variant="outline" onClick={() => navigate("/")}>
                <Home className="mr-2 h-4 w-4" />
                Home
              </Button>
            )}

            <Button
              onClick={handleAction}
              className={
                type === "success" ? "bg-green-500 hover:bg-green-600" : ""
              }
            >
              {type === "500" && <RefreshCcw className="mr-2 h-4 w-4" />}
              {action}
            </Button>
          </div>

          {type === "maintenance" && (
            <div className="mt-8 text-sm text-gray-500">
              Estimated completion: 2 hours
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default StatusPage;
