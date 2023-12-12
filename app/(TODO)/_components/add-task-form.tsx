"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { useDispatch, useSelector } from "react-redux";
import { addTask, taskCount } from "@/providers/features/tasks";
import { Task } from "@/types";
import { v4 } from "uuid";

const formSchema = z.object({
  task: z.string().min(2).max(50),
});

export const AddTaskForm = () => {
  const dispatch = useDispatch();
  const tasks: Task[] = useSelector(taskCount);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      task: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    const task: Task = {
      id: v4(),
      task: values.task,
      completed: false,
    };
    const exist = tasks.some((item) => task.task === item.task);
    if (exist) {
      return;
    } else {
      dispatch(addTask(task));
      localStorage.setItem("tasks", JSON.stringify([...tasks, task]));
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex py-2 gap-4">
        <FormField
          control={form.control}
          name="task"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Enter a task" {...field} className="py-2" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};