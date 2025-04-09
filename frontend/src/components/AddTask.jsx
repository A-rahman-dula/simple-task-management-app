import React from 'react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useDispatch } from 'react-redux';
import { addTaskToServer } from '../slices/taskSlice';

const AddTask = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const dispatch = useDispatch();

  const addTask = (e) => {
    e.preventDefault();
    console.log({ title, description });
    dispatch(addTaskToServer({ title, description }));
    setTitle('');
    setDescription('');
  };

  return (
    <Form>
      <Form.Group className='mb-3' controlId='formTaskTitle'>
        <Form.Label>Task Title</Form.Label>
        <Form.Control
          type='text'
          placeholder='Enter Task Title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Form.Group>

      <Form.Group className='mb-3' controlId='formTaskDescription'>
        <Form.Label>Task Description</Form.Label>
        <Form.Control
          type='text'
          placeholder='Enter Task Description'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Form.Group>

      <div className='d-grid gap-2'>
        <Button variant='primary' type='submit' onClick={(e) => addTask(e)}>
          Submit
        </Button>
      </div>
    </Form>
  );
};

export default AddTask;
