import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";

interface EmptyStateProps {
  message: string;
  addUrl: string;
  addLabel: string;
}

const EmptyState = ({ message, addUrl, addLabel }: EmptyStateProps) => {
  return (
    <div className="empty-state glass-card rounded-lg p-8">
      <p className="text-lg text-gray-500">{message}</p>
      <Link to={addUrl}>
        <Button className="mt-4 flex items-center space-x-2">
          <Plus size={16} />
          <span>{addLabel}</span>
        </Button>
      </Link>
    </div>
  );
};

export default EmptyState;
