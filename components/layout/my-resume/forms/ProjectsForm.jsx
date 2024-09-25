"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { addProjectsToResume } from "@/lib/actions/resume.actions";
import { useFormContext } from "@/lib/context/FormProvider";
import { Brain, Loader2, Minus, Plus } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

const ProjectsForm = ({ params }: { params: { id: string } }) => {
  const listRef = useRef<HTMLDivElement>(null);
  const { formData, handleInputChange } = useFormContext();
  const [isLoading, setIsLoading] = useState(false);
  const [projectList, setProjectList] = useState(
    formData?.projects.length > 0
      ? formData?.projects
      : [
          {
            projectName: "",
            role: "",
            techStack: "",
            startDate: "",
            endDate: "",
            description: "",
          },
        ]
  );
  const { toast } = useToast();

  useEffect(() => {
    projectList.forEach((project: any, index: number) => {
      const textarea = document.getElementById(`description-${index}`) as any;
      if (textarea) {
        textarea.value = project.description;
      }
    });
  }, [projectList]);

  const handleChange = (event: any, index: number) => {
    const newEntries = projectList.slice();
    const { name, value } = event.target;
    newEntries[index][name] = value;
    setProjectList(newEntries);

    handleInputChange({
      target: {
        name: "projects",
        value: newEntries,
      },
    });
  };

  const AddNewProject = () => {
    const newEntries = [
      ...projectList,
      {
        projectName: "",
        role: "",
        techStack: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ];
    setProjectList(newEntries);

    handleInputChange({
      target: {
        name: "projects",
        value: newEntries,
      },
    });
  };

  const RemoveProject = () => {
    const newEntries = projectList.slice(0, -1);
    setProjectList(newEntries);

    handleInputChange({
      target: {
        name: "projects",
        value: newEntries,
      },
    });
  };

  const onSave = async (e: any) => {
    e.preventDefault();

    setIsLoading(true);

    const result = await addProjectsToResume(params.id, formData.projects);

    if (result.success) {
      toast({
        title: "Information saved.",
        description: "Project details updated successfully.",
        className: "bg-white",
      });
    } else {
      toast({
        title: "Uh Oh! Something went wrong.",
        description: result?.error,
        variant: "destructive",
        className: "bg-white",
      });
    }

    setIsLoading(false);
  };

  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg border-t-primary-700 border-t-4 bg-white">
        <h2 className="text-lg font-semibold leading-none tracking-tight">
          Projects
        </h2>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Add your project details
        </p>

        {projectList.map((item: any, index: number) => (
          <div key={index}>
            <div className="grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg">
              <div className="col-span-2 space-y-2">
                <label className="text-slate-700 font-semibold">
                  Project Name:
                </label>
                <Input
                  name="projectName"
                  onChange={(e) => handleChange(e, index)}
                  defaultValue={item?.projectName}
                  className="no-focus"
                />
              </div>
              <div className="space-y-2">
                <label className="text-slate-700 font-semibold">Role:</label>
                <Input
                  name="role"
                  onChange={(e) => handleChange(e, index)}
                  defaultValue={item?.role}
                  className="no-focus"
                />
              </div>
              <div className="space-y-2">
                <label className="text-slate-700 font-semibold">
                  Tech Stack:
                </label>
                <Input
                  name="techStack"
                  onChange={(e) => handleChange(e, index)}
                  defaultValue={item?.techStack}
                  className="no-focus"
                />
              </div>
              <div className="space-y-2">
                <label className="text-slate-700 font-semibold">
                  Start Date:
                </label>
                <Input
                  type="date"
                  name="startDate"
                  onChange={(e) => handleChange(e, index)}
                  defaultValue={item?.startDate}
                  className="no-focus"
                />
              </div>
              <div className="space-y-2">
                <label className="text-slate-700 font-semibold">End Date:</label>
                <Input
                  type="date"
                  name="endDate"
                  onChange={(e) => handleChange(e, index)}
                  defaultValue={item?.endDate}
                  className="no-focus"
                />
              </div>
              <div className="col-span-2 space-y-2">
                <label className="text-slate-700 font-semibold">
                  Description:
                </label>
                <Textarea
                  id={`description-${index}`}
                  name="description"
                  onChange={(e) => handleChange(e, index)}
                  defaultValue={item?.description || ""}
                  className="no-focus"
                />
              </div>
            </div>
          </div>
        ))}
        <div className="mt-3 flex gap-2 justify-between">
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={AddNewProject}
              className="text-primary"
            >
              <Plus className="size-4 mr-2" /> Add More
            </Button>
            <Button
              variant="outline"
              onClick={RemoveProject}
              className="text-primary"
            >
              <Minus className="size-4 mr-2" /> Remove
            </Button>
          </div>
          <Button
            disabled={isLoading}
            onClick={onSave}
            className="bg-primary-700 hover:bg-primary-800 text-white"
          >
            {isLoading ? (
              <>
                <Loader2 size={20} className="animate-spin" /> &nbsp; Saving
              </>
            ) : (
              "Save"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProjectsForm;
