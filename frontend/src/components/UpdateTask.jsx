import React, { useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { updateTaskInServer } from '../slices/taskSlice';

const UpdateTask = (props) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [_id, setId] = useState(0);
  const { selectedTask } = useSelector((state) => state.tasks);

  const dispatch = useDispatch();

  useEffect(() => {
    if (Object.keys(selectedTask).length !== 0) {
      setTitle(selectedTask.title);
      setDescription(selectedTask.description);
      setId(selectedTask._id);
    }
  }, [selectedTask]);

  const updateTask = (e) => {
    props.onHide();
    e.preventDefault();
    console.log({ _id, title, description });
    dispatch(updateTaskInServer({ _id, title, description }));
    setTitle('');
    setDescription('');
  };

  return (
    <Modal
      {...props}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>
          Update Task
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
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
        </Form>
      </Modal.Body>
      {/* <Modal.Footer>
        
      </Modal.Footer> */}
      <div className='d-grid gap-2 mb-4 mx-4'>
        <Button variant='primary' type='submit' onClick={(e) => updateTask(e)}>
          Update
        </Button>
      </div>
    </Modal>
  );
};

export default UpdateTask;
