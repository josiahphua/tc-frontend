import { describe, it, expect } from 'vitest';
import { render, screen } from '../../test/utils';
import ClassTable from './ClassTable';
import { ClassLevel } from '@/types';
import '@testing-library/jest-dom/vitest';

describe('ClassTable Component', () => {
  const mockClasses = [
    {
      id: '1',
      level: ClassLevel.Primary1,
      name: 'Class 1A',
      formTeacherName: 'John Doe',
      teacherEmail: 'john@example.com',
    },
    {
      id: '2',
      level: ClassLevel.Primary2,
      name: 'Class 2B',
      formTeacherId: '2',
      teacherEmail: 'jane@example.com',
    },
  ];
  
  it('renders the table with correct headers', () => {
    render(<ClassTable classes={mockClasses} />);
    
    expect(screen.getByText('Level')).toBeInTheDocument();
    expect(screen.getByText('Class Name')).toBeInTheDocument();
    expect(screen.getByText('Form Teacher')).toBeInTheDocument();
  });
  
  it('displays class data correctly', () => {
    render(<ClassTable classes={mockClasses} />);
    
    expect(screen.getByText('Primary 1')).toBeInTheDocument();
    expect(screen.getByText('Primary 2')).toBeInTheDocument();
    
    expect(screen.getByText('Class 1A')).toBeInTheDocument();
    expect(screen.getByText('Class 2B')).toBeInTheDocument();
    
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('jane@example.com')).toBeInTheDocument();
  });
  
  it('renders an empty table when no classes are provided', () => {
    render(<ClassTable classes={[]} />);
    
    expect(screen.getByText('Level')).toBeInTheDocument();
    expect(screen.getByText('Class Name')).toBeInTheDocument();
    expect(screen.getByText('Form Teacher')).toBeInTheDocument();
    
    expect(screen.queryByText('Class 1A')).not.toBeInTheDocument();
  });
  
  it('shows not assigned when no teacher is provided', () => {
    const classWithNoTeacher = [{
      id: '3',
      level: ClassLevel.Primary3,
      name: 'Class 3C',
    }];
    
    render(<ClassTable classes={classWithNoTeacher} />);
    
    expect(screen.getByText('Not assigned')).toBeInTheDocument();
  });
});
