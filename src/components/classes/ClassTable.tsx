import { Class } from "@/types";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface ClassTableProps {
  classes: Class[];
}

const ClassTable = ({ classes }: ClassTableProps) => {
  return (
    <div className="glass-card rounded-lg overflow-hidden">
      <Table>
        <TableHeader className="table-header">
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Level</TableHead>
            <TableHead>Class Name</TableHead>
            <TableHead>Form Teacher</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {classes.map((cls) => (
            <TableRow key={cls.id} className="table-row">
              <TableCell>{cls.id}</TableCell>
              <TableCell>{cls.level}</TableCell>
              <TableCell className="font-medium">{cls.name}</TableCell>
              <TableCell>{cls.formTeacherName || (cls.teacherEmail ? `${cls.teacherEmail}` : 'Not assigned')}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ClassTable;
