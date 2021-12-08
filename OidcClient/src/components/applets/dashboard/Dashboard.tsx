import { Button } from 'antd';
import React from 'react';
import './Dashboard.css';

export default function Dashboard() {
  const printUser = () => {};
  const printSecret = () => {};

  return (
    <div className="Dashboard">
      <Button
        onClick={printUser}
      >
        Get User
      </Button>
      <Button
        onClick={printSecret}
      >
        Get Secret
      </Button>
    </div>
  );
}
