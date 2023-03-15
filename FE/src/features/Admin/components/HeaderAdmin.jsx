import React from 'react';
import headerLogo from 'assets/img/header-logo.png';
import { useDispatch } from 'react-redux';
import { adminLogout } from '../adminSlice';
import { Button } from 'antd';
import { useHistory } from 'react-router-dom';

function HeaderAdmin() {
  const dispatch = useDispatch()
  const history = useHistory()
  const handleLogout = () => {
    dispatch(adminLogout())
  }
  return (
    <header className='header-admin'>
      <div className='container'>
        <div className='header-content'>
          <div className='header-img'style={{cursor:'pointer'}}>
            <img onClick={
              () => history.push('/')
            } src={headerLogo} style={{width: "18%",
            marginLeft: "-27%",
           
            marginTop:" -8px"}} alt='' />
          </div>
          <h1 className='title'>Chủ Shop</h1>
          <Button onClick={handleLogout}>Logout</Button>
        </div>
      </div>
    </header>
  );
}

export default HeaderAdmin;
