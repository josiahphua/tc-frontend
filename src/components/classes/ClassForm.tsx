import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ClassLevel, Teacher } from "@/types";
import { api } from "@/api";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ArrowLeft, Plus } from "lucide-react";

const classFormSchema = z.object({
  level: z.nativeEnum(ClassLevel, {
    errorMap: () => ({ message: "Please select a class level" }),
  }),
  name: z.string().min(1, "Class name is required"),
  formTeacherId: z.string().min(1, "Form teacher is required"),
});

type ClassFormValues = z.infer<typeof classFormSchema>;

const ClassForm = () => {
  const navigate = useNavigate();
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<ClassFormValues>({
    resolver: zodResolver(classFormSchema),
    defaultValues: {
      level: undefined,
      name: "",
      formTeacherId: "",
    },
  });
  
  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const data = await api.getTeachers();
        setTeachers(data);
      } catch (error) {
        console.error("Failed to fetch teachers:", error);
        toast.error("Failed to load teachers");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchTeachers();
  }, []);
  
  const onSubmit = async (data: ClassFormValues) => {
    setIsSubmitting(true);
    
    // Find the teacher name for the selected formTeacherId
    const formTeacher = teachers.find(t => t.id === data.formTeacherId);
    
    if (!formTeacher) {
      toast.error("Selected teacher not found");
      setIsSubmitting(false);
      return;
    }
    
    try {
      const classData = {
        level: data.level,
        name: data.name,
        formTeacherId: data.formTeacherId,
        formTeacherName: formTeacher.name
      };
      
      const result = await api.addClass(classData);
      
      if (result) {
        toast.success("Class added successfully");
        navigate("/classes");
      } else {
        toast.error("Failed to add class");
      }
    } catch (error) {
      toast.error("An error occurred");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="glass-card rounded-lg p-6 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-6">Add New Class</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="level"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Class Level</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a class level" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.values(ClassLevel).map((level) => (
                      <SelectItem key={level} value={level}>
                        {level}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Class Name</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Integrity" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="formTeacherId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Form Teacher</FormLabel>
                <FormControl>
                  <div className="border rounded-md">
                    {isLoading ? (
                      <div className="p-4 text-center text-gray-500">
                        Loading teachers...
                      </div>
                    ) : teachers.length === 0 ? (
                      <div className="p-4 text-center">
                        <p className="text-gray-500 mb-2">No existing teachers.</p>
                        <Link
                          to="/add-teacher"
                          className="text-primary hover:underline flex items-center justify-center gap-1"
                        >
                          <Plus size={16} />
                          Add a teacher
                        </Link>
                      </div>
                    ) : (
                      <Accordion
                        type="single"
                        collapsible
                        className="w-full"
                        value={field.value ? "teacher-select" : undefined}
                        onValueChange={(value) => {
                          if (value === "") {
                            form.setValue("formTeacherId", "");
                          }
                        }}
                      >
                        <AccordionItem value="teacher-select">
                          <AccordionTrigger className="px-4">
                            {field.value
                              ? teachers.find((t) => t.id === field.value)?.name || "Select a teacher"
                              : "Select a teacher"}
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="p-1 max-h-48 overflow-y-auto">
                              {teachers.map((teacher) => (
                                <div
                                  key={teacher.id}
                                  className={`px-4 py-2 cursor-pointer rounded hover:bg-gray-100 ${
                                    field.value === teacher.id ? "bg-primary/10 text-primary" : ""
                                  }`}
                                  onClick={() => {
                                    form.setValue("formTeacherId", teacher.id, {
                                      shouldValidate: true,
                                    });
                                  }}
                                >
                                  <div>{teacher.name}</div>
                                  <div className="text-xs text-gray-500">
                                    {teacher.subject}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="flex justify-between pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/classes")}
              className="flex items-center gap-2"
            >
              <ArrowLeft size={16} />
              Back
            </Button>
            <Button type="submit" disabled={isSubmitting || teachers.length === 0}>
              {isSubmitting ? "Adding..." : "Add Class"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ClassForm;
