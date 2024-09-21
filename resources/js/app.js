/**
 * First we will load all of this project's JavaScript dependencies which
 * includes React and other helpers. It's a great starting point while
 * building robust, powerful web applications using React + Laravel.
 */



require('./bootstrap');

/**
 * Next, we will create a fresh React component instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

//beginning
import React from 'react';
 import ReactDOM from 'react-dom';
 import Container from './components/Landing/Container'
import StudentPanel from './components/StudentPanel/Container'
import AnswerSheet from './components/StudentPanel/AzmoonComps/AnswerSheet/Container';
import AdminPanel from "./components/Admin/AdminContainer";
import AdminLogin from './components/Admin/Login';
import Checkout from './components/StudentPanel/AzmoonComps/Checkout/Container'
if(document.getElementById('container'))
 ReactDOM.render(<Container />, document.getElementById('container'));
if(document.getElementById('student_panel_container'))
 ReactDOM.render(<StudentPanel /> , document.getElementById('student_panel_container'));
if(document.getElementById('azmoon-container'))
    ReactDOM.render(<AnswerSheet /> , document.getElementById('azmoon-container'));
if(document.getElementById('admin_panel_container'))
    ReactDOM.render(<AdminPanel /> , document.getElementById('admin_panel_container'));
if(document.getElementById('admin_login_container'))
    ReactDOM.render(<AdminLogin /> , document.getElementById('admin_login_container'));
if(document.getElementById('checkout-container'))
    ReactDOM.render(<Checkout /> , document.getElementById('checkout-container'));


