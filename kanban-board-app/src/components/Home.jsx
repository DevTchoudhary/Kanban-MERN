import React from 'react';
import KanbanBoard from './Kanban';

const Home = () => {
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold">Welcome to the Kanban Board</h2>
      <KanbanBoard />
    </div>
  );
};

export default Home;
