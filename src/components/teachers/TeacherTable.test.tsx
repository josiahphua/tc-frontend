import { describe, it, expect } from 'vitest';
import { render, screen } from '../../test/utils';
import TeacherTable from './TeacherTable';
import { Subject } from '@/types';
import '@testing-library/jest-dom/vitest';

describe('TeacherTable Component', () => {
  const mockTeachers = [
    {
      id: '1',
      name: 'John Doe',
      subject: Subject.Mathematics,
      email: 'john@example.com',
      contactNumber: '12345678',
    },
    {
      id: '2',
      name: 'Jane Smith',
      subject: Subject.English,
      email: 'jane@example.com',
      contactNumber: '87654321',
    },
  ];
  
  it('renders the table with correct headers', () => {
    render(<TeacherTable teachers={mockTeachers} />);
    
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Subject')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Work Contact')).toBeInTheDocument();
  });
  
  it('displays teacher data correctly', () => {
    render(<TeacherTable teachers={mockTeachers} />);
    
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    
    expect(screen.getByText('Mathematics')).toBeInTheDocument();
    expect(screen.getByText('English')).toBeInTheDocument();
    
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
    expect(screen.getByText('jane@example.com')).toBeInTheDocument();
    
    expect(screen.getByText('12345678')).toBeInTheDocument();
    expect(screen.getByText('87654321')).toBeInTheDocument();
  });
  
  it('renders an empty table when no teachers are provided', () => {
    render(<TeacherTable teachers={[]} />);
    
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Subject')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Work Contact')).toBeInTheDocument();
    
    expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
  });
});
