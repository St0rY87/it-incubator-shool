type Task = {
  taskId: number;
  title: string;
  isDone: boolean;
};

type TaskListProps = {
  data: {
    title: string;
    tasks: Task[];
    students: string[];
  };
};

export const TaskList = ({ data }: TaskListProps) => {
  return (
    <div>
      <h1>{data.title}</h1>
      <ul>
        {data.tasks.map((el) => {
          return (
            <li>
              <span>{el.taskId}</span>
              <span>{el.title}</span>
              <span>{el.isDone}</span>
            </li>
          );
        })}
      </ul>

      <ul>
        {data.students.map((el) => {
          return <li>{el}</li>;
        })}
      </ul>
    </div>
  );
};
