import { useState, useEffect } from "react";
import { api } from "@/api";
import { Teacher } from "@/types";
import { toast } from "sonner";
import DashboardLayout from "@/components/layout/DashboardLayout";
import PageHeader from "@/components/ui/PageHeader";
import EmptyState from "@/components/ui/EmptyState";
import TeacherTable from "@/components/teachers/TeacherTable";

const TeachersPage = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        // @ts-expect-error - too many overlapping classes if data is defined
        const {data} = await api.getTeachers();
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
  
  return (
    <DashboardLayout>
      <PageHeader
        title="Teachers Management"
        addUrl="/add-teacher"
        addLabel="Add Teacher"
      />
      
      {isLoading ? (
        <div className="glass-card rounded-lg p-8 flex justify-center">
          <div className="animate-pulse flex flex-col w-full">
            <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="h-8 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-8 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-8 bg-gray-200 rounded w-full mb-2"></div>
          </div>
        </div>
      ) : teachers.length === 0 ? (
        <EmptyState
          message="There are no existing teachers yet."
          addUrl="/add-teacher"
          addLabel="Add Teacher"
        />
      ) : (
        <TeacherTable teachers={teachers} />
      )}
    </DashboardLayout>
  );
};

export default TeachersPage;
