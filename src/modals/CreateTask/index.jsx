/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-closing-bracket-location */
/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../../styles/@mixins.scss';
import '../../styles/@variables.scss';
import { stopPropagation } from '@utils/hooks/usePropagination';
import { Dropdown } from '@components/Dropdown';
import { showModal } from '@store/slices/modalSlice';
import Button from '../../components/Button/index';
import Subtask from '../../components/Subtask';
import './CreateTask.scss';
import { mainApi } from '../../utils/api/mainApi';
import { addNewTask } from '../../store/slices/tasksSlice';

const CreateTask = ({ mainTitle = 'Add New Task' }) => {
  const [data, setData] = useState({
    title: '',
    description: '',
    status: '',
    boardId: '',
    columnId: '',
    subtasks: [],
    id: ''
  });

  const [column, setColumn] = useState({});
  const [subTs, setSubTs] = useState([]);
  const [subTasksNumbers, setSubTasksNumbers] = useState(1);
  const dispatch = useDispatch();
  const activeBoardId = useSelector(state => state.activeBoardId.activeBoardId);
  const boards = useSelector(state => state.boards.boards);
  const activeBoard = boards.find(board => board.id === activeBoardId);

  // Обрабатываем клик по кнопке добавление еще одной субтаски
  const handelSubTasksAddClick = e => {
    e.preventDefault();
    setSubTasksNumbers(subTasksNumbers + 1);
  };

  //  Отрисовывает неообходимое количество элементов с полями для названий subtasks
  const subtasksFieldsElements = () => {
    const content = [];
    for (let i = 1; i <= subTasksNumbers; i++) {
      content.push(<Subtask key={i} placeholder='e.g. Drink coffee & smile' id={i} setSubTs={setSubTs} subTs={subTs} />);
    }
    return content;
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setData(oldData => ({ ...oldData, [name]: value }));
  };

  const handleSubmit = event => {
    event.preventDefault();
    const newTask = {
      status: column.status,
      columnId: column.columnId,
      boardId: activeBoardId,
      title: data.title,
      description: data.description,
      subtasks: subTs
    };

    mainApi
      .createTask(newTask)
      .then(res => {
        dispatch(addNewTask(res));
      })
      .catch(err => console.log(err));

    // Закрывает попап
    dispatch(showModal());
  };

  console.log(subTs);

  return (
    <form className='task-form' onSubmit={handleSubmit}>
      <h2 className='task-form__heading'>{mainTitle}</h2>
      <label className='task-form__label-container'>
        <p className='task-form__label'>Title</p>
        <input
          className='task-form__input'
          placeholder='e.g. Take coffee break'
          type='text'
          name='title'
          onChange={handleChange}
          value={data.title}
        />
      </label>
      <label className='task-form__label-container'>
        <p className='task-form__label'>Description</p>
        <textarea
          className='task-form__input task-form__description'
          placeholder='e.g. It’s always good to take a break. This 15 minute break will recharge the batteries a little.'
          type='text'
          name='description'
          onChange={handleChange}
          value={data.description}
        />
      </label>
      <div className='task-form__subtasks-wrapper'>
        <p className='task-form__subtasks-title'>Subtasks</p>

        <div>{subtasksFieldsElements()}</div>
        <Button fn={handelSubTasksAddClick} type='button' label='+ Add New Subtask' isLarge isSecondary isFullWidth />
      </div>
      <Dropdown data={activeBoard.columns} label='Status' setColumn={setColumn} />
      <Button
        fnSumbit={handleSubmit}
        type='submit'
        label='Create task'
        isLarge
        isSecondary={false}
        isFullWidth
        isDestructive={false}
      />
    </form>
  );
};

export default CreateTask;
