  import {BrowserRouter as Router , Route , Routes} from 'react-router-dom';
  import Event_details from './components/event_details';
  import AddEvents from './components/addEvents';
  import Profile from './components/profile';
  import Ticket from './components/ticket';
  import Signup from './components/signup';
  import Events from './components/events';
  import React, { useState } from 'react'
  import Login from './components/login';
  import Dash from './components/dash';
  import Book from './components/book';
  import Home from './components/home'
  import Nav from './components/nav'
  import './App.css'

  const App = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
      <div className='App'>
        <Router>
          <Nav isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
            <Routes>
              <Route path="/" element={<Home/>} />  
              <Route path='/login' element={<Login setIsLoggedIn={setIsLoggedIn}/>} />
              <Route path='/signup' element={<Signup/>}/>
              <Route path='/dashboard' element={<Dash/>}/>
              <Route path='/add' element={<AddEvents/>}/>
              <Route path='/events' element={<Events/>}/>
              <Route path='/events/:eventId/:eventname' element={<Event_details/>}/>
              <Route path='/profile' element={<Profile/>}/>
              <Route path="/book/:eventId" element={<Book />} />
              <Route path="ticket/:eventname" element={<Ticket/>}/>
              <Route path='*' element={<Home/>}/>
            </Routes>   
        </Router>      
      </div>
    )
  }

  export default App
