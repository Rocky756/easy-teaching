import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Typography, Button } from 'antd';
import { showTeacherAC } from "../../../redux/actionCreators/showTeacherAC";
import { useHistory } from 'react-router-dom';


export const MainStudent = () => {
  const { Title } = Typography;
  const dispatch = useDispatch();
  const student = JSON.parse(localStorage.getItem('student'));
  const id = student._id;
  const teachers = useSelector((state)=> state.teachers);
  const history = useHistory();

  useEffect(() => {
    console.log(id);
    console.log('Зашел в useEffect');
    const action = showTeacherAC(id);
    dispatch(action);
  }, []);

  console.log(student);
  console.log(teachers);

  return ( 
    <div className='containerTeacher'>
      <div className='cardElements'>
        <Card title={<Title level={3}>{student.firstName + ' ' + student.lastName}</Title>}
        extra={<a href="#">Редактировать</a>} 
        style={{ width: 400 }}>
          <p>Email: {student.email}</p>
          <p>Тел: {student.phone}</p>
          <p>Изучает язык: {student.languages[0]}</p>
          <p>Уровень владения языком {student.level}</p>
        </Card>
        </div>
        <div>
        <Card title={<Title level={4}>Мои преподаватели</Title>} style={{ width: 400 }}>
          <ul>
            {teachers?.teachers ? 
            teachers.teachers.map((oneTeacher) => (
                <li>Преподаватель: {oneTeacher.firstname + ' ' + oneTeacher.lastname}
                <br />О преподавателе: {oneTeacher.introduction} </li>
              ))
              : <li>Вы еще не выбрали преподавателя</li>}
          </ul>
        </Card>
      </div>
    </div>
   );
}
 

