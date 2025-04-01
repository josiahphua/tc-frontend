import { Teacher, Class } from "@/types";

const API_BASE_URL = "http://localhost:3001/api";

export const api = {
  // Teacher endpoints
  getTeachers: async (): Promise<Teacher[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/teachers`);
      if (!response.ok) {
        const errorResponse = await response.json()
        throw new Error(`Failed to fetch teachers : ${errorResponse.message}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching teachers:", error);
      return [];
    }
  },
  
  addTeacher: async (teacher: Omit<Teacher, "id">): Promise<Teacher | null> => {
    try {
      const response = await fetch(`${API_BASE_URL}/teachers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(teacher),
      });

      if (!response.ok) {
        const errorResponse = await response.json()
        throw new Error(`Failed to add teacher : ${errorResponse.message}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error("Error adding teacher:", error);
      return null;
    }
  },
  
  // Class endpoints
  getClasses: async (): Promise<Class[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/classes`);
      if (!response.ok) {
        const errorResponse = await response.json()
        throw new Error(`Failed to fetch classes : ${errorResponse.message}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching classes:", error);
      return [];
    }
  },
  
  addClass: async (classData: Omit<Class, "id">): Promise<Class | null> => {
    try {
      // Prepare class data for API based on what's provided
      const apiClassData = {
        level: classData.level,
        name: classData.name,
        ...(classData.teacherEmail ? { teacherEmail: classData.teacherEmail } : {}),
        ...(classData.formTeacherId ? { formTeacherId: classData.formTeacherId } : {}),
        ...(classData.formTeacherName ? { formTeacherName: classData.formTeacherName } : {})
      };
      
      const response = await fetch(`${API_BASE_URL}/classes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(apiClassData),
      });
      
      if (!response.ok) {
        const errorResponse = await response.json()
        throw new Error(`Failed to add class : ${errorResponse.message}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error("Error adding class:", error);
      return null;
    }
  },
};
