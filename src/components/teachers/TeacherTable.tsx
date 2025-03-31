import { Teacher } from "@/types";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface TeacherTableProps {
  teachers: Teacher[];
}

const TeacherTable = ({ teachers }: TeacherTableProps) => {
  return (
    <div className="glass-card rounded-lg overflow-hidden">
      <Table>
        <TableHeader className="table-header">
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Subject</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Contact Number</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {teachers.map((teacher) => (
            <TableRow key={teacher.id} className="table-row">
              <TableCell className="font-medium">{teacher.name}</TableCell>
              <TableCell>{teacher.subject}</TableCell>
              <TableCell>{teacher.email}</TableCell>
              <TableCell>{teacher.contactNumber}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TeacherTable;
