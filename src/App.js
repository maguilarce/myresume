import React,{useState,useEffect} from 'react';
import ReactGA from 'react-ga';
import axios from 'axios';
import './App.css';
import Header from './Components/Header';
import Footer from './Components/Footer';
import About from './Components/About';
import Resume from './Components/Resume';
import Contact from './Components/Contact';
import Testimonials from './Components/Testimonials';

function App() {

  
  ReactGA.initialize('UA-110570651-1');
  ReactGA.pageview(window.location.pathname);

  const [resumeData,setResumeData] = useState([]);

  let url ='resumeData.json';
  
  useEffect(()=>{
    setResumeData({
         loading: true,
         data: null,
         error: false
     })
    axios.get(url)
    .then(response => {
      setResumeData({
            loading: false,
            data: response.data,
            error: false
        })
    })
        .catch(() => {
          setResumeData({
                loading: false,
                data: null,
                error: true
            })
        })
 },[url]);
  

  let content = null;

  if(resumeData.error){
    content = <p>There was an error. Please, try again later</p>
}
 
 if(resumeData.loading){
     content = <p>Loading...</p>
 }

if(resumeData.data) {
    content = 
    <div className="App">
      <Header data={resumeData.data.main} />
      <About data={resumeData.data.main}/>
      <Resume data={resumeData.data.resume}/>
      <Contact data={resumeData.data.main}/>
      <Testimonials data ={resumeData.data.testimonials} />
      <Footer data={resumeData.data.main}/>
    </div>

}


  

  

  return (
   <div>
     {content}
   </div>
    
  );
}

export default App;
