import React from 'react'
import MetaData from './MetaData'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
const Home = () => {
  gsap.registerPlugin(useGSAP)
  gsap.registerPlugin(ScrollTrigger)
  useGSAP(
    () => {
        gsap.from('.text1', {
          opacity:0,
          y:1000,
          duration:2,
          delay:1
        })
        gsap.from('.text2', {
          opacity:0,
          x:-1000,
          duration:2,
          delay:1
        })
        gsap.from('.text3101', {
          scrollTrigger:{
            trigger : '.homecompo1',
            scroller:'body',
            start:'top 60%',     
          },
          opacity:0,
          x:-1000,
          duration:2,
          delay:1
        })
        gsap.from('.text3111', {
          scrollTrigger:{
            trigger : '.homecompo1',
            scroller:'body',
            start:'top 60%',     
          },
          opacity:0,
          x:1000,
          duration:2,
          delay:2
        })
        gsap.from('.text3121', {
          scrollTrigger:{
            trigger : '.homecompo1',
            scroller:'body',
            start:'top 60%',     
          },
          opacity:0,
          x:-1000,
          duration:2,
          delay:3
        })
        gsap.from('.ghur1', {
          scrollTrigger:{
            trigger : '.homecompo2',
            scroller:'body',
            start:'top 60%',     
          },
          opacity:0,
          x:-1000,
          duration:2,
          delay:1
        })
        gsap.from('.ghur6', {
          scrollTrigger:{
            trigger : '.homecompo2',
            scroller:'body',
            start:'top 60%',     
          },
          opacity:0,
          x:1000,
          duration:2,
          delay:1
        })
        gsap.from('.ghur2', {
          scrollTrigger:{
            trigger : '.homecompo2',
            scroller:'body',
            start:'top 60%',     
          },
          opacity:0,
          y:-1000,
          duration:2,
          delay:1
        })
        gsap.from('.ghur3', {
          scrollTrigger:{
            trigger : '.homecompo2',
            scroller:'body',
            start:'top 60%',     
          },
          opacity:0,
          y:1000,
          duration:2,
          delay:1
        })
        gsap.from('.ghur4', {
          scrollTrigger:{
            trigger : '.homecompo2',
            scroller:'body',
            start:'top 60%',     
          },
          opacity:0,
          y:-1000,
          duration:2,
          delay:1
        })
        gsap.from('.ghur5', {
          scrollTrigger:{
            trigger : '.homecompo2',
            scroller:'body',
            start:'top 60%',     
          },
          opacity:0,
          y:1000,
          duration:2,
          delay:1
        })
        gsap.from('#ab', {
          scrollTrigger:{
            trigger : '.homecompo2',
            scroller:'body',
            start:'top 60%',     
          },
          opacity:0,
          x:-1000,
          duration:2,
          delay:1
        })
        gsap.from('#ab1', {
          scrollTrigger:{
            trigger : '.homecompo2',
            scroller:'body',
            start:'top 60%',     
          },
          opacity:0,
          x:1000,
          duration:2,
          delay:1
        })
        gsap.from('#z1', {
          scrollTrigger:{
            trigger : '.homecompo2',
            scroller:'body',
            start:'top 60%',     
          },
          x:-1000,
          y:-1000,
          duration:2,
          delay:2
        })
        gsap.from('#z2', {
          scrollTrigger:{
            trigger : '.homecompo2',
            scroller:'body',
            start:'top 60%',     
          },
          x:1000,
          y:-1000,
          duration:2,
          delay:2
        })
        gsap.from('#z3', {
          scrollTrigger:{
            trigger : '.homecompo2',
            scroller:'body',
            start:'top 60%',     
          },
          x:-1000,
          y:1000,
          duration:2,
          delay:2
        })
        gsap.from('#z4', {
          scrollTrigger:{
            trigger : '.homecompo2',
            scroller:'body',
            start:'top 60%',     
          },
          x:1000,
          y:1000,
          duration:2,
          delay:2
        })
        gsap.from('#z5', {
          scrollTrigger:{
            trigger : '.homecompo2',
            scroller:'body',
            start:'top 60%',     
          },
          x:-1000,
          y:1000,
          duration:2,
          delay:3
        })
        gsap.from('#z6', {
          scrollTrigger:{
            trigger : '.homecompo2',
            scroller:'body',
            start:'top 60%',     
          },
          x:1000,
          y:1000,
          duration:2,
          delay:3
        })
        gsap.from('#z7', {
          scrollTrigger:{
            trigger : '.homecompo2',
            scroller:'body',
            start:'top 60%',     
          },
          x:-1000,
          y:-1000,
          duration:2,
          delay:3
        })
        gsap.from('#z8', {
          scrollTrigger:{
            trigger : '.homecompo2',
            scroller:'body',
            start:'top 60%',     
          },
          x:-1000,
          y:1000,
          duration:2,
          delay:4
        })
        gsap.from('#z9', {
          scrollTrigger:{
            trigger : '.homecompo2',
            scroller:'body',
            start:'top 60%',     
          },
          x:1000,
          y:-1000,
          duration:2,
          delay:4
        })
        gsap.from('#z10', {
          scrollTrigger:{
            trigger : '.homecompo2',
            scroller:'body',
            start:'top 60%',     
          },
          x:1000,
          y:1000,
          duration:2,
          delay:4
        })
        gsap.from('#z11', {
          scrollTrigger:{
            trigger : '.homecompo2',
            scroller:'body',
            start:'top 60%',     
          },
          x:-1000,
          y:-1000,
          duration:2,
          delay:4
        })
        gsap.from('#z12', {
          scrollTrigger:{
            trigger : '.homecompo2',
            scroller:'body',
            start:'top 60%',     
          },
          x:-1000,
          y:1000,
          duration:2,
          delay:4
        })
        gsap.from('#z13', {
          scrollTrigger:{
            trigger : '.homecompo2',
            scroller:'body',
            start:'top 60%',     
          },
          x:1000,
          y:-1000,
          duration:2,
          delay:4
        })
        gsap.from('#z14', {
          scrollTrigger:{
            trigger : '.homecompo2',
            scroller:'body',
            start:'top 60%',     
          },
          x:-1000,
          y:-1000,
          duration:2,
          delay:4
        })
        gsap.from('#z15', {
          scrollTrigger:{
            trigger : '.homecompo2',
            scroller:'body',
            start:'top 60%',     
          },
          x:1000,
          y:1000,
          duration:2,
          delay:4
        })
        gsap.from('#z16', {
          scrollTrigger:{
            trigger : '.homecompo2',
            scroller:'body',
            start:'top 60%',     
          },
          x:-1000,
          y:1000,
          duration:2,
          delay:4
        })
        gsap.from('#z17', {
          scrollTrigger:{
            trigger : '.homecompo2',
            scroller:'body',
            start:'top 60%',     
          },
          x:1000,
          y:-1000,
          duration:2,
          delay:4
        })
        gsap.from('#z18', {
          scrollTrigger:{
            trigger : '.homecompo2',
            scroller:'body',
            start:'top 60%',     
          },
          x:-1000,
          y:1000,
          duration:2,
          delay:5
        })
        gsap.from('#z19', {
          scrollTrigger:{
            trigger : '.homecompo2',
            scroller:'body',
            start:'top 60%',     
          },
          x:1000,
          y:-1000,
          duration:2,
          delay:5
        })
        gsap.from('#z20', {
          scrollTrigger:{
            trigger : '.homecompo2',
            scroller:'body',
            start:'top 60%',     
          },
          x:-1000,
          y:-1000,
          duration:2,
          delay:5
        })
        gsap.from('#z21', {
          scrollTrigger:{
            trigger : '.homecompo2',
            scroller:'body',
            start:'top 60%',     
          },
          x:1000,
          y:1000,
          duration:2,
          delay:5
        })
        gsap.from('#z22', {
          scrollTrigger:{
            trigger : '.homecompo2',
            scroller:'body',
            start:'top 60%',     
          },
          x:-1000,
          y:1000,
          duration:2,
          delay:5
        })
        gsap.from('#z23', {
          scrollTrigger:{
            trigger : '.homecompo2',
            scroller:'body',
            start:'top 60%',     
          },
          x:1000,
          y:-1000,
          duration:2,
          delay:5
        })
        gsap.from('#z24', {
          scrollTrigger:{
            trigger : '.homecompo2',
            scroller:'body',
            start:'top 60%',     
          },
          x:1000,
          y:-1000,
          duration:2,
          delay:6
        })
        gsap.from('#z25', {
          scrollTrigger:{
            trigger : '.homecompo2',
            scroller:'body',
            start:'top 60%',     
          },
          x:-1000,
          y:-1000,
          duration:2,
          delay:6
        })
        gsap.from('#z26', {
          scrollTrigger:{
            trigger : '.homecompo2',
            scroller:'body',
            start:'top 60%',     
          },
          x:1000,
          y:1000,
          duration:2,
          delay:6
        })
        gsap.from('#z27', {
          scrollTrigger:{
            trigger : '.homecompo2',
            scroller:'body',
            start:'top 60%',     
          },
          x:-1000,
          y:1000,
          duration:2,
          delay:6
        })
        gsap.from('#z28', {
          scrollTrigger:{
            trigger : '.homecompo2',
            scroller:'body',
            start:'top 60%',     
          },
          x:1000,
          y:-1000,
          duration:2,
          delay:6
        })
        gsap.from('#z29', {
          scrollTrigger:{
            trigger : '.homecompo2',
            scroller:'body',
            start:'top 60%',     
          },
          x:-1000,
          y:1000,
          duration:2,
          delay:7
        })
        gsap.from('#z30', {
          scrollTrigger:{
            trigger : '.homecompo2',
            scroller:'body',
            start:'top 60%',     
          },
          x:1000,
          y:-1000,
          duration:2,
          delay:7
        })
        gsap.from('#z31', {
          scrollTrigger:{
            trigger : '.homecompo2',
            scroller:'body',
            start:'top 60%',     
          },
          x:1000,
          y:-1000,
          duration:2,
          delay:7
        })
        gsap.from('#z32', {
          scrollTrigger:{
            trigger : '.homecompo2',
            scroller:'body',
            start:'top 60%',     
          },
          x:-1000,
          y:-1000,
          duration:2,
          delay:7
        })
        gsap.from('#z33', {
          scrollTrigger:{
            trigger : '.homecompo2',
            scroller:'body',
            start:'top 60%',     
          },
          x:1000,
          y:1000,
          duration:2,
          delay:7
        })
        gsap.from('#z34', {
          scrollTrigger:{
            trigger : '.homecompo2',
            scroller:'body',
            start:'top 60%',     
          },
          x:-1000,
          y:1000,
          duration:2,
          delay:7
        })
        gsap.from('#z35', {
          scrollTrigger:{
            trigger : '.homecompo2',
            scroller:'body',
            start:'top 60%',     
          },
          x:1000,
          y:-1000,
          duration:2,
          delay:7
        })
        gsap.from('#z36', {
          scrollTrigger:{
            trigger : '.homecompo2',
            scroller:'body',
            start:'top 60%',     
          },
          x:-1000,
          y:-1000,
          duration:2,
          delay:8
        })
        gsap.from('#z37', {
          scrollTrigger:{
            trigger : '.homecompo2',
            scroller:'body',
            start:'top 60%',     
          },
          x:1000,
          y:1000,
          duration:2,
          delay:8
        })
        gsap.from('#z38', {
          scrollTrigger:{
            trigger : '.homecompo2',
            scroller:'body',
            start:'top 60%',     
          },
          x:-1000,
          y:1000,
          duration:2,
          delay:8
        })
        gsap.from('#z39', {
          scrollTrigger:{
            trigger : '.homecompo2',
            scroller:'body',
            start:'top 60%',     
          },
          x:1000,
          y:-1000,
          duration:2,
          delay:8
        })
        gsap.from('#z40', {
          scrollTrigger:{
            trigger : '.homecompo2',
            scroller:'body',
            start:'top 60%',     
          },
          x:1000,
          y:1000,
          duration:2,
          delay:9
        })
        gsap.from('#z41', {
          scrollTrigger:{
            trigger : '.homecompo2',
            scroller:'body',
            start:'top 60%',     
          },
          x:-1000,
          y:1000,
          duration:2,
          delay:9
        })
        gsap.from('#z42', {
          scrollTrigger:{
            trigger : '.homecompo2',
            scroller:'body',
            start:'top 60%',     
          },
          x:1000,
          y:-1000,
          duration:2,
          delay:9
        })
        gsap.from('#z43', {
          scrollTrigger:{
            trigger : '.homecompo2',
            scroller:'body',
            start:'top 60%',     
          },
          x:-1000,
          y:-1000,
          duration:2,
          delay:9
        })
        gsap.from('#z44', {
          scrollTrigger:{
            trigger : '.homecompo2',
            scroller:'body',
            start:'top 60%',     
          },
          x:1000,
          y:1000,
          duration:2,
          delay:9
        })
        gsap.from('#z45', {
          scrollTrigger:{
            trigger : '.homecompo2',
            scroller:'body',
            start:'top 60%',     
          },
          x:-1000,
          y:1000,
          duration:2,
          delay:9
        })
        gsap.from('#z46', {
          scrollTrigger:{
            trigger : '.homecompo2',
            scroller:'body',
            start:'top 60%',     
          },
          x:1000,
          y:-1000,
          duration:2,
          delay:9
        })
        gsap.from('.scro34 img', {
          y:-10,
          repeat:-1,
          yoyo:true,
          duration:2,
          delay:1,
        })
    }
  )
  return (
    <>
    <MetaData title='Home Page'/>
    <div className='homecompo'>
       <div className='text1'>Hi, I am Mohammad Imtiaz</div>
       <div className='text2'>I am a full stack developer</div>
       <div className='scro33'>
         <div className='scro34'>
          <div>Scroll Down</div>
          <img src='https://cdn0.iconfinder.com/data/icons/mobile-basic-vol-1/32/Arrow_Bottom-64.png' alt='#'/>
         </div>
       </div>
    </div>
    <div className='homecompo1'>
       <div className='text3'>
        <div className='text310'>
          <div className='text3101'>Self-motivated and adaptable developer with applicable developing knowledge and coding skills</div>
        </div>
        <div className='text311'>
          <div className='text3111'>Organized programmer looking for an opportunity to grow as a developer and support an ambitious technology company</div>
        </div>
        <div className='text312'>
          <div className='text3121'>Collaborative communicator with relationship building skills</div>
        </div>
       </div>
    </div>
    <div className='homecompo2'>
      <div className='ani1'><span className='ghur1'>S</span><span className='ghur2'>k</span><span className='ghur3'>i</span><span className='ghur4'>l</span><span className='ghur5'>l</span><span className='ghur6'>s</span></div>
      <div className='ani2'>
        <div className='ani3'>
          <div className='ani5'>
            <div className='ani6'><img id='ab' src='https://cdn0.iconfinder.com/data/icons/HTML5/64/HTML_Logo.png' alt='#'/></div>
            <div className='ani7'><span id='z1'>H</span><span id='z2'>T</span><span id='z3'>M</span><span id='z4'>L</span></div>
          </div>
          <div className='ani5'>
          <div className='ani6'><div className='ani6'><img id='ab' src='https://cdn1.iconfinder.com/data/icons/social-media-logos-7/64/css-3-64.png' alt='#'/></div></div>
          <div className='ani7'><span id='z5'>C</span><span id='z6'>S</span><span id='z7'>S</span></div>
          </div>
          <div className='ani5'>
          <div className='ani6'><div className='ani6'><img id='ab' src='https://cdn2.iconfinder.com/data/icons/designer-skills/128/code-programming-javascript-software-develop-command-language-64.png' alt='#'/></div></div>
          <div className='ani7'><span id='z8'>J</span><span id='z9'>A</span><span id='z10'>V</span><span id='z11'>A</span><span id='z12'>S</span><span id='z13'>C</span><span id='z14'>R</span><span id='z15'>I</span><span id='z16'>P</span><span id='z17'>T</span></div>
          </div>
          <div className='ani5'>
          <div className='ani6'><div className='ani6'><img id='ab' src='https://cdn3.iconfinder.com/data/icons/monitors-with-programming-languages/512/python-64.png' alt='#'/></div></div>
          <div className='ani7'><span id='z18'>P</span><span id='z19'>H</span><span id='z20'>Y</span><span id='z21'>T</span><span id='z22'>O</span><span id='z23'>N</span></div>
          </div>
        </div>
        <div className='ani4'>
          <div className='ani5'>
          <div className='ani6'><div className='ani6'><img id='ab1' src='https://cdn0.iconfinder.com/data/icons/logos-brands-in-colors/128/react_color-64.png' alt='#'/></div></div>
          <div className='ani7'><span id='z24'>R</span><span id='z25'>E</span><span id='z26'>A</span><span id='z27'>C</span><span id='z28'>T</span></div>
          </div>
          <div className='ani5'>
          <div className='ani6'><div className='ani6'><img id='ab1' src='https://cdn0.iconfinder.com/data/icons/warning-signs-6/64/warning_signs_sign_alert_ex-64.png' alt='#'/></div></div>
          <div className='ani7'><span id='z29'>E</span><span id='z30'>X</span><span id='z31'>P</span><span id='z32'>R</span><span id='z33'>E</span><span id='z34'>S</span><span id='z35'>S</span></div>
          </div>
          <div className='ani5'>
          <div className='ani6'><div className='ani6'><img id='ab1' src='https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/233_Node_Js_logo-64.png' alt='#'/></div></div>
          <div className='ani7'><span id='z36'>N</span><span id='z37'>O</span><span id='z38'>D</span><span id='z39'>E</span></div>
          </div>
          <div className='ani5'>
          <div className='ani6'><div className='ani6'><img id='ab1' src='https://cdn4.iconfinder.com/data/icons/logos-3/512/mongodb-2-64.png' alt='#'/></div></div>
          <div className='ani7'><span id='z40'>M</span><span id='z41'>O</span><span id='z42'>N</span><span id='z43'>G</span><span id='z44'>O</span><span id='z45'>D</span><span id='z46'>B</span></div>
          </div>
        </div>
      </div>
    </div>
    <div className='homecompo3'>
       <div className='myco1'>
        <div className='myco2'>
          <img src='https://cdn4.iconfinder.com/data/icons/aiga-symbol-signs/613/aiga_telephone_bg-64.png' alt='#'></img>
          <div>+88 01792277300</div>
        </div>
       </div>
       <div className='myco1'>
         <div className='myco2'>
           <img src='https://cdn4.iconfinder.com/data/icons/logos-brands-in-colors/48/google-gmail-64.png' alt='#'></img>
           <div>imtiaza0182373@gmail.com</div>
         </div>
       </div>
    </div>
   </>
  )
}

export default Home
