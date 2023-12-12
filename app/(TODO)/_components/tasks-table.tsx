"use client";
import { fetchTasks, taskCount } from "@/providers/features/tasks";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import Clock from "react-live-clock";
import { AddTaskForm } from "./add-task-form";
import { AppDispatch } from "@/providers/store/task-store";
import { refreshTasks } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { CopyX } from "lucide-react";
import DeleteAll from "./delete-all";

const TasksTable = () => {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const tasks = useSelector(taskCount);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    refreshTasks();
    dispatch(fetchTasks());
    setIsMounted(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <Clock
        format={"dddd, MMMM Mo, YYYY, HH:mm:ss"}
        ticking
        timezone={"Brazil/East"}
        className="flex justify-center py-6"
        locale="br"
      />
      <DataTable columns={columns} data={tasks} />
      <div className="flex justify-between items-center">
        <AddTaskForm />
        <DeleteAll/>
      </div>
    </>
  );
};

export default TasksTable;
