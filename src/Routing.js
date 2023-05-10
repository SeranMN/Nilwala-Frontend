import React from 'react'
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import Dashboard from './Components/AdminDashboard';
import EventScheduling from './Components/eventScheduling/EventScheduling';
import Projects from './Components/projects/projects';
import ProjectDes from './Components/projects/ProjectDes';
import Home from './Components/Home';
import Registration from './Components/registration/Registration';
import Login from './Components/Login';
import Addblog from "./Components/Blog/Addblog";
import Viewblogs from "./Components/Blog/Viewblogs";
import Fullviewblog from "./Components/Blog/Fullviewblog";
import Updateblog from "./Components/Blog/Updateblog";
import ViewUpcomingEvent from './Components/ViewUpcomingEvent';
import Header from './Components/Header';
import Leaders from './Components/Leaders';
import HomeBlogs from './Components/HomeBlogs';
import HomeAboutUs from './Components/HomeAboutUs';
import HomeProjects from './Components/HomeProjects';

const Routing = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/registration' exact element={<Registration />} />
                <Route path='/login' element={<Login />} />
                <Route path='/adminDashboard' exact element={<Dashboard />} />
                <Route path='/events' exact element={<EventScheduling />} />
                <Route path='/projects' exact element={<Projects />} />
                <Route path='/projectsdes/:id' element={<ProjectDes />} />
                <Route path='/fullviewblog/:id' exact element={<Fullviewblog />} />
                <Route path='/updateblog' exact element={<Updateblog />} />
                <Route element={<Header />}>
                    <Route path='/upcomingEvents/:id' exact element={<ViewUpcomingEvent />} />
                    <Route path='/' exact element={<Home />} />
                    <Route path='/homeLeaders' exact element={<Leaders />} />
                    <Route path='/homeBlogs' exact element={<HomeBlogs />} />
                    <Route path='/homeAboutUs' exact element={<HomeAboutUs />} />
                    <Route path='/homeProjects' exact element={<HomeProjects />} />
                    <Route path='/viewblog' exact element={<Viewblogs />} />
                    <Route path='/addblog' exact element={<Addblog />} />

                </Route>
            </Routes>
        </BrowserRouter>

    )
}

export default Routing
