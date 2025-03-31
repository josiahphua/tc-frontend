import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";

interface PageHeaderProps {
  title: string;
  addUrl: string;
  addLabel: string;
}

const PageHeader = ({ title, addUrl, addLabel }: PageHeaderProps) => {
  return (
    <div className="mb-6 flex items-center justify-between">
      <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
      <Link to={addUrl}>
        <Button className="flex items-center space-x-2">
          <Plus size={16} />
          <span>{addLabel}</span>
        </Button>
      </Link>
    </div>
  );
};

export default PageHeader;
