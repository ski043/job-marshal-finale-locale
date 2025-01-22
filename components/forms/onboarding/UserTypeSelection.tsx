/* eslint-disable react/no-unescaped-entities */
import { Button } from "@/components/ui/button";
import { Building2, UserRound } from "lucide-react";

type UserType = "company" | "jobSeeker";

interface UserTypeSelectionProps {
  onSelect: (type: UserType) => void;
}

export default function UserTypeSelection({
  onSelect,
}: UserTypeSelectionProps) {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold ">Welcome! Let's get started</h2>
        <p className="text-muted-foreground">
          Choose how you'd like to use our platform
        </p>
      </div>

      <div className="grid gap-4">
        <Button
          onClick={() => onSelect("company")}
          variant="outline"
          className="w-full h-auto p-6 flex items-center gap-4 border-2 transition-all duration-200 hover:border-primary hover:bg-primary/5"
        >
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Building2 className="h-6 w-6 text-primary" />
          </div>
          <div className="text-left">
            <h3 className="font-semibold text-lg">Company / Organization</h3>
            <p className="text-sm text-muted-foreground">
              Post jobs and find great talent
            </p>
          </div>
        </Button>

        <Button
          onClick={() => onSelect("jobSeeker")}
          variant="outline"
          className="w-full h-auto p-6 flex items-center gap-4 border-2 transition-all duration-200 hover:border-primary hover:bg-primary/5"
        >
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
            <UserRound className="h-6 w-6 text-primary" />
          </div>
          <div className="text-left">
            <h3 className="font-semibold text-lg">Job Seeker</h3>
            <p className="text-sm text-muted-foreground">
              Find your dream job opportunity
            </p>
          </div>
        </Button>
      </div>
    </div>
  );
}
