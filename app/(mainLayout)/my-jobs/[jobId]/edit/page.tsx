import { prisma } from "@/app/utils/db";
import { requireUser } from "@/app/utils/hooks";
import { EditJobForm } from "@/components/forms/EditJobForm";

import { notFound } from "next/navigation";
import React from "react";

async function getJobPost({
  jobId,
  userId,
}: {
  jobId: string;
  userId: string;
}) {
  const jobPost = await prisma.jobPost.findUnique({
    where: {
      id: jobId,
      company: {
        userId: userId,
      },
    },
    select: {
      benefits: true,
      id: true,
      jobTitle: true,
      jobDescription: true,
      salaryTo: true,
      salaryFrom: true,
      location: true,
      employmentType: true,
      listingDuration: true,
      company: {
        select: {
          about: true,
          name: true,
          location: true,
          website: true,
          xAccount: true,
          logo: true,
        },
      },
    },
  });

  if (!jobPost) {
    return notFound();
  }

  return jobPost;
}

type Params = Promise<{ jobId: string }>;

const EditJobPage = async ({ params }: { params: Params }) => {
  const { jobId } = await params;
  const user = await requireUser();
  const jobPost = await getJobPost({ jobId, userId: user.id as string });

  if (!jobPost) {
    return notFound();
  }

  return (
    <>
      <EditJobForm jobPost={jobPost} />
    </>
  );
};

export default EditJobPage;
