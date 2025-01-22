"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";

import CompanyForm from "./CompanyForm";

import Image from "next/image";
import Logo from "@/public/logo.png";
import UserTypeSelection from "./UserTypeSelection";
import JobSeekerForm from "./JobSeekerForm";

type UserType = "company" | "jobSeeker" | null;

export default function OnboardingForm() {
  const [step, setStep] = useState(1);
  const [userType, setUserType] = useState<UserType>(null);

  const handleUserTypeSelect = (type: UserType) => {
    setUserType(type);
    setStep(2);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <UserTypeSelection onSelect={handleUserTypeSelect} />;
      case 2:
        return userType === "company" ? <CompanyForm /> : <JobSeekerForm />;
      default:
        return null;
    }
  };

  return (
    <>
      <div className="flex items-center gap-3 mb-10">
        <Image src={Logo} alt="JobMarshal Logo" width={50} height={50} />
        <span className="text-4xl font-bold">
          Job<span className="text-primary">Marshal</span>
        </span>
      </div>
      <Card className="w-full max-w-lg">
        <CardContent className="p-6">{renderStep()}</CardContent>
      </Card>
    </>
  );
}
