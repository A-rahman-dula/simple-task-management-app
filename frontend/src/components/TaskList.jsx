import React, { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import UpdateTask from './UpdateTask.jsx';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import {
  deleteTaskFromServer,
  getTaskFromServer,
  removeTaskFromList,
  selectTaskFromList,
} from '../slices/taskSlice';

const TaskList = () => {
  const [modalShow, setModalShow] = React.useState(false);
  const { tasksList } = useSelector((state) => state.tasks);

  const dispatch = useDispatch();
  const updateTask = (task) => {
    console.log('Update Task');
    setModalShow(true);
    dispatch(selectTaskFromList(task));
  };

  useEffect(() => {
    dispatch(getTaskFromServer());
  }, [dispatch]);

  const deleteTask = (task) => {
    dispatch(deleteTaskFromServer(task))
      .unwrap()
      .then(() => {
        dispatch(removeTaskFromList(task));
        console.log('Deleted Task');
      });
  };

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr className='text-center'>
            <th>#</th>

            <th>Title</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasksList &&
            tasksList.map((task, index) => (
              <tr className='text-center' key={task._id}>
                <td>{index + 1}</td>

                <td>{task.title}</td>
                <td>{task.description}</td>
                <td>
                  <Button
                    variant='primary'
                    className='mx-3'
                    onClick={() => updateTask(task)}
                  >
                    <i className='bi bi-pencil-square'></i>
                  </Button>
                  <Button variant='danger' onClick={() => deleteTask(task)}>
                    <i className='bi bi-trash3-fill'></i>
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      <UpdateTask show={modalShow} onHide={() => setModalShow(false)} />
    </>
  );
};

export default TaskList;
