/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { Slider } from "@/components/ui/slider";

import { Control, useController } from "react-hook-form";
import { formatCurrency } from "@/app/utils/formatCurrency";

interface SalaryRangeSelectorProps {
  control: Control<any>;
  minSalary?: number;
  maxSalary?: number;
  step?: number;
  currency?: string;
}

export function SalaryRangeSelector({
  control,
  minSalary = 30000,
  maxSalary = 200000,
  step = 1000,
}: SalaryRangeSelectorProps) {
  const { field: fromField } = useController({
    name: "salaryFrom",
    control,
  });

  const { field: toField } = useController({
    name: "salaryTo",
    control,
  });

  const [range, setRange] = useState<[number, number]>([
    fromField.value || minSalary,
    toField.value || maxSalary / 2,
  ]);

  const handleRangeChange = (value: number[]) => {
    const newRange: [number, number] = [value[0], value[1]];
    setRange(newRange);
    fromField.onChange(newRange[0]);
    toField.onChange(newRange[1]);
  };

  // Update range when form values change externally
  useEffect(() => {
    setRange([fromField.value || minSalary, toField.value || maxSalary / 2]);
  }, [fromField.value, toField.value, minSalary, maxSalary]);

  return (
    <div className="w-full space-y-4">
      <Slider
        min={minSalary}
        max={maxSalary}
        step={step}
        value={range}
        onValueChange={handleRangeChange}
        className="py-4"
      />

      <div className="flex justify-between">
        <span className="text-sm text-muted-foreground">
          {formatCurrency(range[0])}
        </span>
        <span className="text-sm text-muted-foreground">
          {formatCurrency(range[1])}
        </span>
      </div>
    </div>
  );
}
