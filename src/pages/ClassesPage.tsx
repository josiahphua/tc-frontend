import { useState, useEffect } from "react";
import { api } from "@/api";
import { Class } from "@/types";
import { toast } from "sonner";
import DashboardLayout from "@/components/layout/DashboardLayout";
import PageHeader from "@/components/ui/PageHeader";
import EmptyState from "@/components/ui/EmptyState";
import ClassTable from "@/components/classes/ClassTable";

const ClassesPage = () => {
  const [classes, setClasses] = useState<Class[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        // @ts-expect-error - too many overlapping classes if data is defined
        const {data}: Class[] = await api.getClasses();
        setClasses(data);
      } catch (error) {
        console.error("Failed to fetch classes:", error);
        toast.error("Failed to load classes");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchClasses();
  }, []);
  
  return (
    <DashboardLayout>
      <PageHeader
        title="Classes Management"
        addUrl="/add-class"
        addLabel="Add Class"
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
      ) : classes.length === 0 ? (
        <EmptyState
          message="There are no existing classes yet."
          addUrl="/add-class"
          addLabel="Add Class"
        />
      ) : (
        <ClassTable classes={classes} />
      )}
    </DashboardLayout>
  );
};

export default ClassesPage;
