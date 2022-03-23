import React from 'react';
import './Home.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector} from 'react-redux';
import { RootState } from '../redux/reducers';
import { removeUser } from '../redux/actions/UserProfileData';

interface UserData {
  image: string;
  name: string;
  email: string;
  phoneno: string;
}

interface Props {
  data: UserData[];
}

const Home = (props: Props) => {
const data = useSelector((state: RootState) => state.user.data);
const dispatch = useDispatch();
  return (
    <>
  <div className='box'>
    <div className='nav-bar'>
      <div className='nav-home'>
        HOME PAGE
      </div>
      
      <div>
        <Link  to="/"><button className='profile-link' onClick={() => dispatch(removeUser(data))}>Logout</button></Link>
      </div>
    </div>

    {data[0] ?
      <div className='content'>
       <div className='flex_container'> 
       <div className="flex_container1">
          <div className="flex_div1">
            <img src={`${data[0].image}`} alt='User Profile Pic'></img><br />
          </div>

          <div className="flex_div2">
            <b>Name : </b>
            {data[0].name ? <i>{data[0].name}</i> : <i>Name not entered !</i>}<br/>

            <b>E-mail : </b>
            {data[0].email ? <i>{data[0].email}</i> : <i>Email not entered !</i> }<br/>

            <b>Phone Number : </b>
            {data[0].phoneno ? <i>{data[0].phoneno}</i> : <i>Phone not entered !</i>}<br/>
          </div>
        </div>
        <div className="flex_container2">
          <p>“Hello <b>{data[0].name}</b> ,you are registered with the email id : <b>{data[0].email}</b> and phone number : <b>{data[0].phoneno}</b>”</p>
        </div>
       </div>
        


        
      </div>
        :
      <div>
        <Navigate to="/"/>
      </div>
    }
  </div>
    </>
  );
}

export default Home;
