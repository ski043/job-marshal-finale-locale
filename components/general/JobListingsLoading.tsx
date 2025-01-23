import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function JobListingsLoading() {
  return (
    <div className="flex flex-col gap-6">
      {[...Array(10)].map((i, index) => (
        <Card key={index} className="p-6">
          <div className="flex items-start gap-4">
            <Skeleton className="h-14 w-14 rounded" />
            <div className="space-y-3 flex-1">
              <Skeleton className="h-5 w-[300px]" />
              <Skeleton className="h-4 w-[200px]" />
              <div className="flex gap-4 mt-4">
                <Skeleton className="h-4 w-[120px]" />
                <Skeleton className="h-4 w-[120px]" />
                <Skeleton className="h-4 w-[120px]" />
              </div>
              <div className="flex justify-between items-center mt-4">
                <Skeleton className="h-4 w-[150px]" />
                <Skeleton className="h-8 w-[100px]" />
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
